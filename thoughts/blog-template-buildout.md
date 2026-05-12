# Blog Template Buildout — /croop loop checklist

This file is the single source of truth for a bounded `/croop` loop running
in `~/Projects/mine/portfolio/`. Each loop tick: open this file, pick the
**topmost unchecked item**, implement it, verify, commit, strike through.

---

## Refinement target

The blog-ready styling and content infrastructure in
`~/Projects/mine/portfolio/`. The infrastructure must let Ty (and Claude
acting on his behalf) drop a new MDX file into `content/blog/` and have it
render with uniform chrome, prose typography, monospace code with syntax
highlighting, and the right anti-discovery posture — **with zero per-post
styling decisions required from the author.**

## Progress signal

1. Items below get struck through (`- [ ]` → `- [x]`) as each tick lands a
   clean commit.
2. After each commit: `pnpm lint` (which runs `npx tsc --noEmit`) and
   `pnpm build` both exit 0. These are the per-tick gates.
3. Playwright audit scripts (`.explore.mjs`, `.link-audit.mjs`,
   `.header-audit.mjs`, plus a new `.article-audit.mjs`) get **created and
   committed** during the loop but **not run inside the loop** — they need
   `pnpm dev` on port 3000, which the cron-fired tick can't keep alive.
   Ty runs them manually after the loop completes.

## Constraints (every tick must respect)

1. **Pre-existing unstaged changes** belong to Ty and are intentional:
   - `next.config.js` — TS strictness tightening (removed
     `typescript.ignoreBuildErrors`). **Do not re-add.** Layer MDX config
     on top.
   - `package.json` + `pnpm-lock.yaml` — Playwright + @playwright/test
     additions. **Do not remove.** They're explicitly desired as an
     official dependency.
   - `site/src/assets/components/attention-getter-image/...`,
     `site/src/assets/utils/utils.tsx`,
     `site/src/landing-page/my-work/duck-story/*.tsx`,
     `site/src/landing-page/my-work/duck-story/utils.ts` — **unrelated to
     this loop. Do not touch. Do not stage.**

2. **Stage only files this loop modifies.** Use explicit `git add <path>`,
   never `git add -A` or `git add .`. The `next.config.js`, `package.json`,
   and `pnpm-lock.yaml` rollups in items C1/C2 are the only exception and
   are explicitly approved.

3. **One item per tick.** Do not race ahead to the next checked item if
   time allows — exit, let the cron fire the next tick. This keeps each
   commit reviewable and rollback-safe.

4. **Commit message format:** `blog-buildout: <ITEM-ID> <short summary>`.
   No "Co-Authored-By" line. No "Generated with Claude Code" line. No
   emojis. Per Ty's global instructions.

5. **If a step fails** (lint/build red, dependency conflict, scope creep
   detected): leave the item unchecked, append a `> NOTE:` line under it
   explaining what blocked, exit without committing.

6. **Don't add features beyond what the item names.** No "while I'm here"
   refactors. No speculative future-proofing. The whole point of this
   loop is uniform, templateable output — drift defeats it.

## Design decisions (already made; do not re-litigate)

- **Single domain `thetyster.dev` (apex), not subdomains.** Portfolio and
  blog will share an origin. Out-of-scope for this loop: actual DNS flip
  and Cloudflare apex binding — that's Ty + Cloudflare dashboard.
- **MDX as content format.** Build-time static generation; AI writes
  posts as `.mdx` files in `content/blog/`. JSX components are
  importable inline for the rare bespoke visual.
- **Shiki via `rehype-pretty-code` at build time** for syntax
  highlighting. Zero runtime JS shipped. Default theme:
  `github-dark-dimmed`. Light/dark variants are deferred.
- **JetBrains Mono** for code, self-hosted woff2 (no CDN, matches the
  anti-discovery posture).
- **ArticleShell wraps PortfolioShell.** Chrome stays exactly the same;
  article routes opt into prose-width main + prose typography + neutral
  background + calmer focus ring + `noindex` meta.
- **`foundation` mixin gets split** into `foundation-chrome` (shared),
  `foundation-portfolio` (current narrow card aesthetic, portfolio
  routes only), `foundation-article` (prose container, neutral, article
  routes only). Existing routes keep their look exactly.
- **Heading text update (the brand-text in PortfolioShell) is OUT of
  scope for this loop.** Ty decides the wording separately.

## Reference paths

- Mixins: `site/src/assets/css/mixins.scss`
- Variables: `site/src/assets/css/variables.scss`
- Fonts: `site/src/assets/css/fonts.scss`
- Landing-page foundation activator: `site/src/landing-page/landing-page.scss`
- Universal chrome: `app/_components/PortfolioShell.tsx`
- Existing edge-runtime examples: `app/page.tsx`, `app/cherry-lane-farms/page.tsx`
- Session handoff (read-only context, do not modify):
  `thoughts/session-handoff.md`
- Audit scripts (root, prefixed `.`): `.explore.mjs`, `.link-audit.mjs`,
  `.header-audit.mjs`

---

## Checklist

### Phase A — CSS Foundation split

- [x] **A1.** In `site/src/assets/css/mixins.scss`, split the existing
  `@mixin foundation()` body into three new mixins:
  `@mixin foundation-chrome()` (everything that should apply to ALL
  routes: `html`, `body { margin, bg-color, bg-image, transition }`,
  `div#content`, `.visually-hidden`, `.skip-link`, `header { … }`,
  `footer`, `:focus-visible`, the media queries that apply to layout
  primitives generally), `@mixin foundation-portfolio()` (the narrow
  card aesthetic: `main { max-width: 800px; bg: white; rounded; padding;
  @include center-by-margin }` + the medium/small/micro main width
  overrides, `aside`, `hr` curly-wave, `img.hero`, the h1-h5 portfolio
  scale, the bold-list/button defaults), and leave `@mixin foundation()`
  in place as a compatibility wrapper that calls both
  `@include foundation-chrome; @include foundation-portfolio` (so
  nothing breaks while migration is in flight). Verify `pnpm build` is
  green. Commit: `blog-buildout: A1 split foundation mixin into chrome+portfolio`.

- [x] **A2.** Create `@mixin foundation-article()` in the same file. Body:
  neutralize the citron card aesthetic for article routes — `main` with
  `max-width: 70ch` (prose) / opt-in `max-width: 90ch` (wide) /
  `max-width: none` (full-bleed) via a `data-article-width` attribute
  selector; `background: var(--article-bg, #fbf8f3)` on `body` when
  `body[data-route="article"]`; quieter h-scale (h1 ≈ 2rem / 2.6rem
  line-height, h2 ≈ 1.6rem, h3 ≈ 1.3rem); list reset (`font: inherit`
  for `li, ul, ol` inside `.prose`); calmer `:focus-visible` scoped to
  `.prose` (`outline: 2px solid currentColor; box-shadow: none`).
  Do not call this from anywhere yet. Commit:
  `blog-buildout: A2 add foundation-article mixin (unused, will be activated by ArticleShell)`.

- [x] **A3.** Create `site/src/assets/css/_prose.scss` (note leading
  underscore — Sass partial). Contents: a single `@mixin prose()` that
  styles prose-specific elements scoped under a `.prose` parent class.
  Include: `blockquote` (left border 4px, italic, indented, muted
  color), `code` (inline; monospace var, slight bg tint, padding
  `0.1em 0.35em`, rounded `0.2em`), `pre` (block; monospace, `padding:
  1em 1.25em`, `border-radius: var(--radius)`, `overflow-x: auto`),
  `pre code` (reset bg/padding from inline code), `figure` (margin
  block, center), `figcaption` (small, muted, centered), `table` (full
  width, border-collapse, cell padding, header row bg), `dl/dt/dd`,
  `kbd` (bordered, monospace, small), `mark`, `hr` (simple rule, not
  the curly-wave SVG), `a` (underline by default, color from variable),
  `h2/h3/h4` margin-top so successive sections breathe. Define CSS
  variables at top: `--prose-mono`, `--prose-bg-code`, `--prose-fg-muted`,
  `--prose-border`, `--prose-link`. Commit:
  `blog-buildout: A3 create _prose.scss with article element styles`.

- [x] **A4.** Add monospace defaults to the variable layer. In
  `site/src/assets/css/variables.scss`: add `$mono-font-family: "JetBrains
  Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;`
  and `$code-font: 14px/1.55 #{$mono-font-family};`. Commit:
  `blog-buildout: A4 add mono font-family variables`.

### Phase B — JetBrains Mono self-host

- [ ] **B1.** Download JetBrains Mono variable web fonts to
  `public/static/fonts/`. Required files (woff2 only — woff is dead
  weight in 2026): `JetBrainsMono[wght].woff2` (variable, regular) and
  `JetBrainsMono-Italic[wght].woff2` (variable, italic). Source URL:
  `https://github.com/JetBrains/JetBrainsMono/raw/master/fonts/variable/`
  (raw GitHub serves them). Verify file sizes are >50 KB each (sanity
  check that download succeeded; variable fonts are ~150 KB typically).
  Commit: `blog-buildout: B1 self-host JetBrains Mono variable woff2`.

- [ ] **B2.** Add `@font-face` declarations to
  `site/src/assets/css/fonts.scss` for the two JetBrains Mono variable
  fonts. Use `font-weight: 100 900;` (the variable range) for each.
  `font-display: swap`. Reference paths
  `/static/fonts/JetBrainsMono[wght].woff2` and
  `/static/fonts/JetBrainsMono-Italic[wght].woff2`. Commit:
  `blog-buildout: B2 declare JetBrains Mono @font-face`.

### Phase C — MDX + Shiki plumbing

- [ ] **C1.** Install MDX + Shiki dependencies. From the portfolio root
  (`~/Projects/mine/portfolio/`):
  `pnpm add @next/mdx@^16 @mdx-js/loader@^3 @mdx-js/react@^3 rehype-pretty-code@^0.14 shiki@^4`.
  This rolls up `package.json` and `pnpm-lock.yaml`. The pre-existing
  Playwright additions in those files get committed together — that's
  explicitly approved. Verify `pnpm lint` and `pnpm build` are green
  (the new deps don't affect the build until C2 wires them in).
  Commit: `blog-buildout: C1 add MDX + Shiki dependencies (folds in pre-existing Playwright addition)`.

- [ ] **C2.** Configure `next.config.js` for MDX with rehype-pretty-code.
  The existing TS strictness change (removed
  `typescript.ignoreBuildErrors`) stays intact — this layers on top.
  Required changes:
  (a) `const createMDX = require('@next/mdx')`;
  (b) `pageExtensions: ['ts', 'tsx', 'mdx']` in nextConfig;
  (c) call `createMDX({ extension: /\.mdx?$/, options: { rehypePlugins:
  [['rehype-pretty-code', { theme: 'github-dark-dimmed', keepBackground:
  false }]] } })(nextConfig)` as the exported config.
  Use `require()` not `import` because the file is `next.config.js`
  (CommonJS). Verify `pnpm build` is green. Commit:
  `blog-buildout: C2 wire MDX + rehype-pretty-code into next.config.js`.

- [ ] **C3.** Create `mdx-components.tsx` at the project root (Next.js
  App Router convention). Export a `useMDXComponents` function that
  returns component overrides — minimal for now: just typed identity
  passthrough so MDX renders standard HTML elements. (Component
  overrides for blockquote/code/etc. are handled by CSS in `.prose`,
  not by JSX wrapping, to keep the AI-author surface minimal.) This
  file is required by `@next/mdx@^16` to enable App Router MDX. Commit:
  `blog-buildout: C3 add mdx-components.tsx at project root`.

- [ ] **C4.** Add the Shiki theme CSS variables and prose mono-font
  wiring. In `_prose.scss` (created in A3), define `--prose-mono` to
  reference `$mono-font-family`. Add CSS for `figure[data-rehype-pretty-code-figure]`,
  `pre[data-language]`, `code[data-line-numbers]` — the elements
  rehype-pretty-code emits. Map Shiki's CSS-variable tokens
  (`--shiki-light`, `--shiki-dark`, `--shiki-light-bg`, `--shiki-dark-bg`)
  to readable defaults — for now, just set
  `pre[data-language] { color: var(--shiki-dark); background:
  var(--shiki-dark-bg, #22272e); }`. Commit:
  `blog-buildout: C4 wire Shiki theme variables into _prose.scss`.

### Phase D — ArticleShell + content scaffold

- [ ] **D1.** Create `app/_components/ArticleShell.tsx`. Client
  component, wraps `<PortfolioShell>`, accepts props:
  `{ title: string; date: string; description?: string; tags?: string[];
  noindex?: boolean; width?: 'prose' | 'wide' | 'full-bleed';
  children: React.ReactNode }`. Render: PortfolioShell wrapping a
  `<article className="prose" data-article-width={width ?? 'prose'}>`
  containing an `<header className="article-header">` with title (h1),
  date (`<time dateTime>`), tags (small chips), description (lede),
  followed by `{children}`, followed by an `<footer
  className="article-footer">` with permalink + edit-on-github link.
  Import `_prose.scss` and the (future) `foundation-article` activation
  — for now, add a `useEffect` that sets `document.body.dataset.route =
  'article'` on mount and removes it on unmount, so the article body
  background applies. `noindex` prop emits a `<meta name="robots"
  content="noindex,nofollow">` via Next's `<Head>` or a server
  component variant — pick whichever approach matches `app/` router
  conventions (probably a server-side metadata export from the parent
  page). Commit: `blog-buildout: D1 add ArticleShell wrapping PortfolioShell with prose container`.

- [ ] **D2.** Create the content directory and the template/style files.
  Make `content/blog/` (empty so far). Inside it, create two files:
  (a) `TEMPLATE.mdx` — a self-contained example post showing the
  expected frontmatter (`title`, `date`, `description`, `tags`, `slug`),
  a couple paragraphs, a blockquote, an inline `code` example, a fenced
  ```ts code block, a fenced ```lean code block, a figure with caption,
  a table, a list. This is the canonical artifact the LLM is shown
  when generating new posts.
  (b) `STYLE-GUIDE.md` — a 50-100 line guide stating: allowed components
  (none beyond standard MDX yet), frontmatter schema (typed), what to
  do (semantic HTML, accessible alt text on images, language hint on
  every fenced block, descriptive link text), what NOT to do (no
  inline styles, no `<div>` for layout — use semantic tags, no
  emojis unless the post is explicitly about them, no
  syntactically-meaningful Unicode in code blocks). Commit:
  `blog-buildout: D2 add content/blog/ with TEMPLATE.mdx and STYLE-GUIDE.md`.

- [ ] **D3.** Create `app/blog/page.tsx` (the blog index). Server
  component, `runtime = 'edge'`. Reads `content/blog/*.mdx` at build
  time (use `fs/promises` + `gray-matter` or just regex-parse the
  frontmatter ourselves — DO NOT add another dep for this; parse
  manually). Emits a sorted list of posts (most recent first) showing
  title, date, description, tags, deep-link to `/blog/<slug>`. Wraps
  in `<PortfolioShell>` (not ArticleShell — the index is not an
  article). Commit: `blog-buildout: D3 add app/blog/page.tsx index`.

- [ ] **D4.** Create `app/blog/[slug]/page.tsx` (the post page). Server
  component, `runtime = 'edge'`. Dynamically imports
  `content/blog/<slug>.mdx`, extracts frontmatter, renders inside
  `<ArticleShell {...frontmatter}>`. Must export
  `generateStaticParams()` returning the array of slugs (so paths are
  pre-built at compile time and the route is fully static). Also
  export `generateMetadata({ params })` to set per-post page title +
  description. Commit:
  `blog-buildout: D4 add app/blog/[slug]/page.tsx with generateStaticParams`.

- [ ] **D5.** Add a build-time emitted `pages.json` for cross-link
  consumption (the Blog tab on `/` currently fetches a `pages.json`
  remote feed — collapsing to one origin, it should now read from a
  static file co-located on the same site). Approach: a `scripts/
  build-pages-json.mjs` that scans `content/blog/*.mdx`, extracts
  frontmatter from each, emits `public/api/pages.json`. Wire it into
  `package.json` as a `prebuild` script. Update
  `site/src/landing-page/blog/blog.tsx` and `app/page.tsx` to read
  `/api/pages.json` (same origin, no Bearer token needed). Commit:
  `blog-buildout: D5 emit static pages.json at build, drop Bearer token requirement`.

### Phase E — Playwright audit scaffold (creation only; runs are post-loop)

- [ ] **E1.** Create `.article-audit.mjs` at the repo root. Playwright
  script that: starts at `http://localhost:3000/blog/template` (the
  TEMPLATE.mdx rendered as a real route via D4's generateStaticParams),
  takes a full-page screenshot to `/tmp/portfolio-article/template.png`,
  asserts the presence of `<article class="prose">`, the article
  header h1, the article footer permalink, a fenced code block with
  `data-language` attribute, the article body background variable
  applied. Output a JSON report at `/tmp/portfolio-article/report.json`
  with `{ ok: boolean, asserts: [{ name, pass, evidence? }], screenshots:
  [...] }`. Idempotent on re-run. Mirror the structure of `.explore.mjs`
  so it feels native. Do NOT run it in this tick — `pnpm dev` isn't
  running. Just commit the script. Commit:
  `blog-buildout: E1 add .article-audit.mjs Playwright audit script`.

- [ ] **E2.** Final compatibility sweep. Verify no regressions to
  existing routes by re-reading `.explore.mjs`, `.link-audit.mjs`,
  `.header-audit.mjs` and confirming they don't assert anything that
  the foundation split or new mixins would have broken. If anything
  needs updating (e.g., assertions about specific selectors that have
  moved), update them. Run `pnpm lint` and `pnpm build` one last time.
  Commit: `blog-buildout: E2 final compat sweep on existing audit scripts`.

---

## Out of scope for this loop (handled separately by Ty)

- Heading / brand-text rewording in PortfolioShell
- First-post content (adapt `philosophy/orbital-shifting-vs-fusion.md`
  → MDX)
- Cloudflare side: `_headers` file with `X-Robots-Tag`, WAF UA rules,
  DNS apex binding for `thetyster.dev`
- `pnpm dev` + Playwright run pass (post-loop verification)
- Final mind-map reconciliation: update
  `~/Documents/mind-map/research/blog-launch/launch-plan-2026-05-12.md`
  to reflect the drop-Bludit / drop-subdomain decisions
