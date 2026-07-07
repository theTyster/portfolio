import React from 'react'
import LandingPageClient from './_components/LandingPageClient'
import type { BlogFeedResult, BlogPost } from '../site/src/landing-page/blog/blog'

// Property p_004: execution_runtime(cloudflare_workers) ∧ runtime_environment(edge)
// Property p_005: fetch_on_server(blog_page, blog_feed): server-side data fetch
// This Server Component runs on the Cloudflare Workers edge runtime.
export const runtime = 'edge'

// The blog feed is fetched at request time from the Bludit CMS at
// blog.thetyster.dev, so posts can be authored and published there without
// redeploying the portfolio. The Bearer token is injected as a Cloudflare
// Workers secret (BLOG_API_TOKEN) — never a NEXT_PUBLIC_ var.
const BLOG_FEED_URL = 'https://blog.thetyster.dev/api/pages'

async function getBlogFeed(): Promise<BlogFeedResult> {
  const token = process.env.BLOG_API_TOKEN
  if (!token) {
    console.error(`[blog-feed] no_token: BLOG_API_TOKEN unset; ${BLOG_FEED_URL} not fetched`)
    return { ok: false, reason: 'no_token' }
  }

  let res: Response
  try {
    // Token is injected from Cloudflare Workers secret — never a NEXT_PUBLIC_ var.
    res = await fetch(BLOG_FEED_URL, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    })
  } catch (err) {
    console.error(`[blog-feed] network_error: ${BLOG_FEED_URL}`, err)
    return { ok: false, reason: 'network_error' }
  }

  if (!res.ok) {
    console.error(`[blog-feed] http_error: ${BLOG_FEED_URL} returned ${res.status}`)
    return { ok: false, reason: 'http_error', status: res.status }
  }

  try {
    const body = (await res.json()) as { pages?: BlogPost[] }
    return { ok: true, pages: body.pages ?? [] }
  } catch (err) {
    console.error(`[blog-feed] parse_error: ${BLOG_FEED_URL}`, err)
    return { ok: false, reason: 'parse_error' }
  }
}

export default async function HomePage() {
  // fetch_on_server(blog_page, blog_feed): data is fetched on the server/edge,
  // NOT deferred to the client. The result is serialised into the HTML response.
  const blogFeed = await getBlogFeed()

  return <LandingPageClient blogFeed={blogFeed} />
}
