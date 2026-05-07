"use client";

import React from "react";
import PortfolioShell from "./PortfolioShell";
import LandingPage from "../../site/src/landing-page/landing-page";
import type { BlogFeedResult } from "../page";

const BLOG_HOME = "https://blog.thetyster.dev";

function RecentPosts({ blogFeed }: { blogFeed: BlogFeedResult }) {
  if (blogFeed.ok === false) {
    const note =
      blogFeed.reason === "no_token"
        ? "Blog feed unavailable in this environment."
        : "Couldn't load posts right now.";
    return (
      <section id="recent-posts" className="recent-posts">
        <h2>Recent Posts</h2>
        <p>
          {note}{" "}
          <a href={BLOG_HOME} target="_blank" rel="noreferrer noopener">
            Visit blog.thetyster.dev →
          </a>
        </p>
      </section>
    );
  }

  const posts = blogFeed.pages;
  if (posts.length === 0) {
    return (
      <section id="recent-posts" className="recent-posts">
        <h2>Recent Posts</h2>
        <p>
          No posts yet.{" "}
          <a href={BLOG_HOME} target="_blank" rel="noreferrer noopener">
            Visit blog.thetyster.dev →
          </a>
        </p>
      </section>
    );
  }

  return (
    <section id="recent-posts" className="recent-posts">
      <h2>Recent Posts</h2>
      <ul>
        {posts.slice(0, 5).map((p) => (
          <li key={p.permalink}>
            <a href={p.permalink}>
              <strong>{p.title}</strong>
            </a>
            {p.date ? <span> — {p.date}</span> : null}
            {p.description ? <p>{p.description}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function LandingPageClient({
  blogFeed,
}: {
  blogFeed: BlogFeedResult;
}) {
  return (
    <PortfolioShell>
      <LandingPage />
      <RecentPosts blogFeed={blogFeed} />
    </PortfolioShell>
  );
}
