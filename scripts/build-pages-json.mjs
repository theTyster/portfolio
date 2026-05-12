// Build-time emitter for /api/pages.json.
//
// D5: scans content/blog/*.mdx, extracts frontmatter, emits a static feed at
// public/api/pages.json so the landing page can read it from the same origin
// (no Bearer token, no remote fetch). Wired as a `prebuild` script in
// package.json; the resulting file is also safe to commit if Ty wants the
// dev server to serve it directly, but the prebuild step always regenerates
// it before `next build`.
//
// The frontmatter parser is intentionally identical to the one in
// app/blog/page.tsx and app/blog/[slug]/page.tsx — keeping three identical
// implementations rather than introducing a shared module keeps the per-tick
// commit surface minimal. A later tick can extract a single helper once a
// fourth caller appears.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const OUT_DIR = path.join(ROOT, 'public', 'api');
const OUT_FILE = path.join(OUT_DIR, 'pages.json');

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return null;
  const end = raw.indexOf('\n---', 4);
  if (end === -1) return null;
  const body = raw.slice(4, end);
  const out = {};
  for (const line of body.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1];
    let value = match[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      if (inner === '') {
        out[key] = [];
      } else {
        out[key] = inner
          .split(',')
          .map((part) => part.trim().replace(/^["']|["']$/g, ''))
          .filter((part) => part.length > 0);
      }
      continue;
    }
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

async function main() {
  let files;
  try {
    files = await fs.readdir(CONTENT_DIR);
  } catch {
    files = [];
  }
  const pages = [];
  for (const filename of files) {
    if (!filename.toLowerCase().endsWith('.mdx')) continue;
    const raw = await fs.readFile(path.join(CONTENT_DIR, filename), 'utf8');
    const fm = parseFrontmatter(raw);
    if (!fm) continue;
    // `draft: true` hides the post from the static feed. The /blog/<slug>
    // route still resolves directly (article-audit fixtures stay reachable).
    if (fm.draft === 'true' || fm.draft === true) continue;
    const slugFromFile = filename.replace(/\.mdx$/i, '');
    const slug = typeof fm.slug === 'string' && fm.slug.length > 0 ? fm.slug : slugFromFile;
    const title = typeof fm.title === 'string' ? fm.title : slug;
    const date = typeof fm.date === 'string' ? fm.date : '';
    const description = typeof fm.description === 'string' ? fm.description : '';
    const permalink = `/blog/${slug}`;
    pages.push({ title, date, description, permalink });
  }
  // Most-recent first by ISO date string. Lexical compare on YYYY-MM-DD works.
  pages.sort((a, b) => b.date.localeCompare(a.date));

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify({ pages }, null, 2) + '\n', 'utf8');
  console.log(`[build-pages-json] wrote ${pages.length} entr${pages.length === 1 ? 'y' : 'ies'} → ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch((err) => {
  console.error('[build-pages-json] failed:', err);
  process.exit(1);
});
