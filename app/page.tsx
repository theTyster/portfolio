import React from 'react'
import { headers } from 'next/headers'
import LandingPageClient from './_components/LandingPageClient'
import type { BlogFeedResult, BlogPost } from '../site/src/landing-page/blog/blog'

// Property p_004: execution_runtime(cloudflare_workers) ∧ runtime_environment(edge)
// Property p_005: fetch_on_server(blog_page, blog_feed) — server-side data fetch
// This Server Component runs on the Cloudflare Workers edge runtime.
export const runtime = 'edge'

// D5: the blog feed is now a same-origin static asset emitted at build time
// by scripts/build-pages-json.mjs (wired as `prebuild` in package.json).
// No Bearer token, no remote origin — the file lives at /api/pages.json on
// the same domain. We still go through `fetch` (rather than reading from
// disk) because this route is `runtime = 'edge'` and the edge bundle has no
// `fs`; the same-origin static asset is served by Cloudflare Pages and the
// fetch hits the same worker.
const BLOG_FEED_PATH = '/api/pages.json'

async function getBlogFeed(): Promise<BlogFeedResult> {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  if (!host) {
    console.error(`[blog-feed] network_error: no host header; ${BLOG_FEED_PATH} not fetched`)
    return { ok: false, reason: 'network_error' }
  }
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  const url = `${proto}://${host}${BLOG_FEED_PATH}`

  let res: Response
  try {
    res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    })
  } catch (err) {
    console.error(`[blog-feed] network_error: ${url}`, err)
    return { ok: false, reason: 'network_error' }
  }

  if (!res.ok) {
    console.error(`[blog-feed] http_error: ${url} returned ${res.status}`)
    return { ok: false, reason: 'http_error', status: res.status }
  }

  try {
    const body = (await res.json()) as { pages?: BlogPost[] }
    return { ok: true, pages: body.pages ?? [] }
  } catch (err) {
    console.error(`[blog-feed] parse_error: ${url}`, err)
    return { ok: false, reason: 'parse_error' }
  }
}

export default async function HomePage() {
  // fetch_on_server(blog_page, blog_feed): data is fetched on the server/edge,
  // NOT deferred to the client. The result is serialised into the HTML response.
  const blogFeed = await getBlogFeed()

  return <LandingPageClient blogFeed={blogFeed} />
}
