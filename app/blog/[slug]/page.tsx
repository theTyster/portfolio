import React from 'react'
import type { Metadata } from 'next'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import ArticleShell from '../../_components/ArticleShell'

// Per D4: server component, renders the MDX post inside <ArticleShell />.
//
// Runtime note: D3 already documents why the blog routes override the
// layout-level `runtime = 'edge'` declaration; the edge bundle has no `fs`,
// but we need `fs` to discover slugs in `generateStaticParams` and to read
// frontmatter for `generateMetadata`. The page is forced static
// (`dynamic = 'force-static'`), so the build runs the fs reads once during
// `next build` and the resulting HTML is served from the edge as a static
// asset, preserving the spec's edge-delivery intent without requiring `fs`
// in the edge worker bundle. The D5 prebuild script will eventually move
// the fs reads out of the route entirely.
export const runtime = 'nodejs'
export const dynamic = 'force-static'
export const dynamicParams = false

type PostFrontmatter = {
  title: string
  date: string
  description?: string
  tags?: string[]
  slug: string
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

// Mirrors the parser in app/blog/page.tsx. Kept local rather than extracted
// into a shared helper to keep this commit's surface area to a single file
// (the spec is strict: "create app/blog/[slug]/page.tsx"). A future tick can
// extract `parseFrontmatter` to `content/blog/_lib.ts` once it has more than
// two callers.
function parseFrontmatter(raw: string): Record<string, unknown> | null {
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

type ResolvedPost = {
  filename: string
  frontmatter: PostFrontmatter
}

async function listPosts(): Promise<ResolvedPost[]> {
  let files: string[]
  try {
    files = await fs.readdir(CONTENT_DIR)
  } catch {
    return []
  }
  const resolved: ResolvedPost[] = []
  for (const filename of files) {
    if (!filename.toLowerCase().endsWith('.mdx')) continue
    const raw = await fs.readFile(path.join(CONTENT_DIR, filename), 'utf8')
    const fm = parseFrontmatter(raw)
    if (!fm) continue
    const slugFromFile = filename.replace(/\.mdx$/i, '')
    const slug = typeof fm.slug === 'string' && fm.slug.length > 0 ? fm.slug : slugFromFile
    const title = typeof fm.title === 'string' ? fm.title : slug
    const date = typeof fm.date === 'string' ? fm.date : ''
    const description = typeof fm.description === 'string' ? fm.description : undefined
    const tags = Array.isArray(fm.tags)
      ? (fm.tags.filter((t) => typeof t === 'string') as string[])
      : undefined
    resolved.push({
      filename,
      frontmatter: { slug, title, date, description, tags },
    })
  }
  return resolved
}

async function findPostBySlug(slug: string): Promise<ResolvedPost | null> {
  const posts = await listPosts()
  return posts.find((p) => p.frontmatter.slug === slug) ?? null
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await listPosts()
  return posts.map((p) => ({ slug: p.frontmatter.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = await findPostBySlug(slug)
  if (!post) {
    return { title: 'Post not found, Ty Davis' }
  }
  const { title, description } = post.frontmatter
  return {
    title: `${title}, Ty Davis`,
    description: description ?? undefined,
    robots: 'noindex,nofollow',
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await findPostBySlug(slug)
  if (!post) notFound()
  // Dynamic import using the resolved filename. The `/* webpackInclude */`
  // magic comment lets webpack build a chunk per .mdx file in content/blog/
  // so generateStaticParams + dynamicParams=false can pre-render the lot at
  // build time without bundling unrelated files.
  const mod = await import(
    /* webpackInclude: /\.mdx$/ */
    `../../../content/blog/${post.filename}`
  )
  const Post: React.ComponentType = mod.default
  const { title, date, description, tags, slug: postSlug } = post.frontmatter
  return (
    <ArticleShell
      title={title}
      date={date}
      description={description}
      tags={tags}
      noindex
      permalink={`/blog/${postSlug}`}
      editUrl={`https://github.com/Thetyster/portfolio/edit/main/content/blog/${post.filename}`}
    >
      <Post />
    </ArticleShell>
  )
}
