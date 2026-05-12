# Blog post style guide — thetyster.dev

This file is the contract between a post author (Ty, or Claude acting on
his behalf) and the site's article rendering. Follow it and the post
renders correctly with zero per-post styling decisions. Violate it and
the post either looks broken or leaks visual drift into the template.

## Frontmatter schema

Every post starts with YAML frontmatter delimited by `---` fences. All
fields are typed; types are not enforced at runtime, but the build will
look wrong if they're wrong.

```yaml
title: string          # required; appears as <h1> and in the index
date: string           # required; ISO-8601 (YYYY-MM-DD), used for sorting
description: string    # optional; shown as the lede + meta description
tags: string[]         # optional; short, lowercase, hyphen-separated
slug: string           # required; matches the filename, used in the URL
```

## What to do

- Use **semantic HTML**: `<article>`, `<section>`, `<aside>`, `<figure>`,
  `<table>`. The shell already provides `<article>`; everything below the
  lede paragraph is the article body.
- Provide **descriptive alt text** on every `<img>`. Decorative images
  still get `alt=""` (empty, not missing).
- Add a **language hint** to every fenced code block. `ts`, `tsx`,
  `lean`, `bash`, `prolog`, `json`, `md` — pick the closest match.
  Without it, Shiki can't tokenize and the block falls back to plain
  text.
- Write **descriptive link text**. `[the orbital-shifting essay](/...)`,
  not `[click here](/...)`. Screen readers and skim-readers both win.
- Keep paragraphs **short to medium**. The prose container is 70ch; long
  paragraphs become walls of text at that width.
- Use **headings hierarchically**. `h1` is the title (auto-emitted by
  ArticleShell). Post body starts at `h2`. Don't skip levels.

## What NOT to do

- **No inline styles.** `style="..."` is a code smell. If something needs
  custom styling, the answer is to extend `_prose.scss`, not to patch
  the post.
- **No `<div>` for layout.** Use semantic elements. The prose CSS
  doesn't know how to style arbitrary divs and won't try.
- **No emojis** unless the post is explicitly about emojis or Unicode
  rendering. Emojis fight the typography and the anti-discovery posture
  (they're a strong "indexed me" signal in social previews).
- **No syntactically-meaningful Unicode in code blocks.** Smart quotes,
  em-dashes, non-breaking spaces — all of these silently break the
  parser when copy-pasted out. Stick to ASCII inside fenced blocks.
- **No external CDN assets.** Images live in `public/static/`. Fonts are
  self-hosted. No `https://cdn.something/...` references.
- **No `<script>` tags.** This is a static-built site with zero runtime
  JS in the article path. A `<script>` either does nothing (SSR strips
  it) or breaks hydration. Either way: don't.
- **No `<a target="_blank">` without `rel="noopener noreferrer"`.** And
  even then, default to same-tab — it's the user's job to decide where
  links open.

## Components allowed inline

For now: **none beyond standard MDX**. The whole point of this template
is that posts are pure content, and the shell handles all visual
concerns. If a post genuinely needs a one-off interactive component,
the answer is to extend ArticleShell with a new opt-in prop, not to
import a component into the MDX file.

## When to break these rules

Don't. If you think you need to, the right move is to extend the shell
or the prose CSS and bring the change back into the template — so the
next post benefits from the same affordance without re-deciding.
