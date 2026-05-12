import React from 'react'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import PortfolioShell from '../_components/PortfolioShell'
import './blog-index.scss'

// Per D3: server component, reads content/blog/*.mdx at build time.
// Frontmatter is parsed manually (no gray-matter dep) so the bundle surface
// stays minimal.
//
// Runtime note: this segment overrides the layout-level `runtime = 'edge'`
// declaration because the edge bundle has no `fs`. The page is forced static
// (`dynamic = 'force-static'`), so the fs read happens once during build
// (Node) and the resulting HTML is served from the edge as a static asset —
// preserving the spec's edge-delivery intent without requiring `fs` in the
// edge worker bundle. The eventual D5 build-script approach will move this
// off `fs` entirely and let the page return to `runtime = 'edge'`.
export const runtime = 'nodejs'
export const dynamic = 'force-static'

type BlogIndexEntry = {
  slug: string
  title: string
  date: string
  description?: string
  tags?: string[]
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

function parseFrontmatter(raw: string): Record<string, unknown> | null {
  // Frontmatter must start at byte 0 with `---\n` and close with `\n---\n`
  // (or `\n---` at EOF). Anything else => no frontmatter.
  if (!raw.startsWith('---\n')) return null
  const end = raw.indexOf('\n---', 4)
  if (end === -1) return null
  const body = raw.slice(4, end)
  const out: Record<string, unknown> = {}
  for (const line of body.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!match) continue
    const key = match[1]
    let value: string = match[2].trim()
    // Array literal: ["a", "b"] or [a, b]
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim()
      if (inner === '') {
        out[key] = []
      } else {
        out[key] = inner
          .split(',')
          .map((part) => part.trim().replace(/^["']|["']$/g, ''))
          .filter((part) => part.length > 0)
      }
      continue
    }
    // Quoted scalar
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
  }
  return out
}

async function loadPosts(): Promise<BlogIndexEntry[]> {
  let files: string[]
  try {
    files = await fs.readdir(CONTENT_DIR)
  } catch {
    return []
  }
  const mdxFiles = files.filter((name) => name.toLowerCase().endsWith('.mdx'))
  const entries: BlogIndexEntry[] = []
  for (const filename of mdxFiles) {
    const raw = await fs.readFile(path.join(CONTENT_DIR, filename), 'utf8')
    const fm = parseFrontmatter(raw)
    if (!fm) continue
    // Frontmatter `draft: true` hides the post from the index. The /blog/<slug>
    // route still resolves (so the article-audit fixture stays reachable), but
    // it is unlisted.
    if (fm.draft === 'true' || fm.draft === true) continue
    const slugFromFile = filename.replace(/\.mdx$/i, '')
    const slug = typeof fm.slug === 'string' && fm.slug.length > 0 ? fm.slug : slugFromFile
    const title = typeof fm.title === 'string' ? fm.title : slug
    const date = typeof fm.date === 'string' ? fm.date : ''
    const description = typeof fm.description === 'string' ? fm.description : undefined
    const tags = Array.isArray(fm.tags) ? (fm.tags.filter((t) => typeof t === 'string') as string[]) : undefined
    entries.push({ slug, title, date, description, tags })
  }
  // Most-recent first by ISO date string. Lexical compare on YYYY-MM-DD works.
  entries.sort((a, b) => b.date.localeCompare(a.date))
  return entries
}

function formatDate(date: string): string {
  if (!date) return ''
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default async function BlogIndexPage() {
  const posts = await loadPosts()
  return (
    <PortfolioShell>
      <section className="blog-index">
        <h1>Blog</h1>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="blog-index-list">
            {posts.map((post) => (
              <li key={post.slug} className="blog-index-post">
                <a href={`/blog/${post.slug}`}>
                  <h2>{post.title}</h2>
                </a>
                {post.date ? (
                  <time dateTime={post.date} className="blog-index-date">
                    {formatDate(post.date)}
                  </time>
                ) : null}
                {post.description ? (
                  <p className="blog-index-description">{post.description}</p>
                ) : null}
                {post.tags && post.tags.length > 0 ? (
                  <ul className="blog-index-tags" aria-label="Tags">
                    {post.tags.map((tag) => (
                      <li key={tag} className="blog-index-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </PortfolioShell>
  )
}
