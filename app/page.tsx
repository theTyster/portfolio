import React from 'react'
import LandingPageClient from './_components/LandingPageClient'

// Property p_004: execution_runtime(cloudflare_workers) ∧ runtime_environment(edge)
// Property p_005: fetch_on_server(blog_page, blog_feed) — server-side data fetch
// This Server Component runs on the Cloudflare Workers edge runtime.
export const runtime = 'edge'

const BLOG_FEED_URL = 'https://blog.thetyster.dev/api/pages'

type BlogPost = {
  title: string
  date: string
  description: string
  permalink: string
}

type BlogFeedResponse = {
  pages?: BlogPost[]
}

async function getBlogFeed(): Promise<BlogFeedResponse | null> {
  try {
    const token = process.env.BLOG_API_TOKEN
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    }
    // Token is injected from Cloudflare Workers secret — never a NEXT_PUBLIC_ var.
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const res = await fetch(BLOG_FEED_URL, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json() as Promise<BlogFeedResponse>
  } catch {
    return null
  }
}

export default async function HomePage() {
  // fetch_on_server(blog_page, blog_feed): data is fetched on the server/edge,
  // NOT deferred to the client. The result is serialised into the HTML response.
  const blogFeed = await getBlogFeed()

  return <LandingPageClient blogFeed={blogFeed} />
}
