"use client";

import React from "react";
import Navigation from "@components/navigation/nav";
import LandingPage from "../../site/src/landing-page/landing-page";

type BlogPost = {
  title: string;
  date: string;
  description: string;
  permalink: string;
};

type BlogFeedResponse = {
  pages?: BlogPost[];
};

function RecentPosts({ blogFeed }: { blogFeed: BlogFeedResponse | null }) {
  const posts = blogFeed?.pages ?? [];
  if (posts.length === 0) return null;
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
  blogFeed: BlogFeedResponse | null;
}) {
  return (
    <>
      <header>
        <div id="nav">
          <Navigation />
        </div>
        <a className="home-button" href="/">
          <img src="/static/img/splat-wave.svg" alt="Home" />
        </a>
        <h1 className="page-title"></h1>
      </header>
      <div id="content">
        <main>
          <LandingPage />
          <RecentPosts blogFeed={blogFeed} />
        </main>
      </div>
      <footer>
        <div id="credit">
          <p>Ty Davis ©️ {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
