import React from 'react'
import LandingPageClient from './_components/LandingPageClient'
import type { BlogFeedResult, BlogPost } from '../site/src/landing-page/blog/blog'

// Property p_004: execution_runtime(cloudflare_workers) ∧ runtime_environment(edge)
// Property p_005: fetch_on_server(blog_page, blog_feed): server-side data fetch
// This Server Component runs on the Cloudflare Workers edge runtime.
export const runtime = 'edge'

// The blog feed is fetched at request time from the Bludit CMS at
// blog.thetyster.dev, so posts can be authored and published there without
// redeploying the portfolio. The API token is injected as a Cloudflare
// Workers secret (BLOG_API_TOKEN) — never a NEXT_PUBLIC_ var.
//
// Bludit's REST API authenticates via a `?token=` query parameter (NOT an
// Authorization: Bearer header — Bludit ignores the header), and returns
// { status, message, numberOfItems, data: [...] } — posts live under `data`,
// not `pages`. `numberOfItems` in a request is the requested page size; we
// ask for a large page so all published posts come back in one call.
const BLOG_FEED_ORIGIN = 'https://blog.thetyster.dev/api/pages'

// Raw Bludit page item — a subset of the fields Bludit returns, only what we map.
type BluditPage = {
  title?: string
  description?: string
  date?: string
  dateUTC?: string
  dateRaw?: string
  permalink?: string
  type?: string
}

// Map Bludit's page object onto the BlogPost shape the landing page renders.
function toBlogPost(p: BluditPage): BlogPost {
  // Prefer a machine-parseable timestamp for <time dateTime>; fall back to the
  // human string. Upgrade http→https so links stay on the secure origin.
  const date = p.dateUTC ?? p.dateRaw ?? p.date ?? ''
  const permalink = (p.permalink ?? '').replace(/^http:\/\//, 'https://')
  return {
    title: p.title ?? '(untitled)',
    date,
    description: p.description ?? '',
    permalink,
  }
}

async function getBlogFeed(): Promise<BlogFeedResult> {
  const token = process.env.BLOG_API_TOKEN
  if (!token) {
    console.error(`[blog-feed] no_token: BLOG_API_TOKEN unset; ${BLOG_FEED_ORIGIN} not fetched`)
    return { ok: false, reason: 'no_token' }
  }

  // Token goes in the query string. Build via URL so the token is encoded and
  // never string-concatenated. NB: never log `url` — it contains the secret.
  const url = new URL(BLOG_FEED_ORIGIN)
  url.searchParams.set('token', token)
  url.searchParams.set('numberOfItems', '100')

  let res: Response
  try {
    res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    })
  } catch (err) {
    console.error(`[blog-feed] network_error: ${BLOG_FEED_ORIGIN}`, err)
    return { ok: false, reason: 'network_error' }
  }

  if (!res.ok) {
    console.error(`[blog-feed] http_error: ${BLOG_FEED_ORIGIN} returned ${res.status}`)
    return { ok: false, reason: 'http_error', status: res.status }
  }

  try {
    const body = (await res.json()) as { data?: BluditPage[] }
    const pages = (body.data ?? [])
      // Only surface published posts (Bludit can return drafts/static/etc.).
      .filter((p) => p.type === undefined || p.type === 'published')
      .map(toBlogPost)
    return { ok: true, pages }
  } catch (err) {
    console.error(`[blog-feed] parse_error: ${BLOG_FEED_ORIGIN}`, err)
    return { ok: false, reason: 'parse_error' }
  }
}

export default async function HomePage() {
  // fetch_on_server(blog_page, blog_feed): data is fetched on the server/edge,
  // NOT deferred to the client. The result is serialised into the HTML response.
  const blogFeed = await getBlogFeed()

  return <LandingPageClient blogFeed={blogFeed} />
}
