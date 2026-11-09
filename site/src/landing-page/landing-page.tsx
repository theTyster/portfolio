"use client";

import { useMemo } from "react";
import "./landing-page.scss";
import Viewpoints, { type Viewpoint } from "./viewpoints/viewpoints";
import JobHistory from "./job-history/job-history";
import Blog, { type BlogFeedResult } from "./blog/blog";
import Contributions from "./contributions/contributions";
import MyWork from "./my-work/my-work";

function Hero() {
  return (
    <div className="hero">
      <h1>Ty Davis</h1>
      <p className="lede">I ship like a small team using AI agents, and specs and proofs keep it correct.</p>
      <p className="sub">
        Lean 4, TLA+, and SMT solvers check what must be true separately from what the code actually does. In
        production, that means backend systems for enterprise benefits and insurance carriers on .NET, C#, and Azure.
      </p>
      <p className="cred">
        <a href="https://www.credly.com/badges/69096ac6-b14d-47e3-8d9e-9ebf6f121acc">
          Claude Certified Architect – Professional
        </a>{" "}
        (Anthropic, 2026)
      </p>
      <div className="contact">
        <a className="btn primary" href="mailto:ty@mail.thetyster.dev">
          Email
        </a>
        <a className="btn" href="https://github.com/thetyster">
          GitHub
        </a>
        <a className="btn" href="https://www.linkedin.com/in/tyler-davis-dev">
          LinkedIn
        </a>
      </div>
    </div>
  );
}

function LandingPage({ blogFeed }: { blogFeed: BlogFeedResult }) {
  const views: Viewpoint[] = useMemo(
    () => [
      { id: "work", label: "Work", color: "var(--accent)", kind: "ring", content: <MyWork /> },
      { id: "experience", label: "Experience", color: "var(--amber)", kind: "bands", content: <JobHistory /> },
      { id: "contributions", label: "Contributions", color: "var(--good)", kind: "moon", content: <Contributions /> },
      { id: "writing", label: "Writing", color: "var(--mid)", kind: "", content: <Blog blogFeed={blogFeed} /> },
    ],
    [blogFeed],
  );

  return (
    <Viewpoints views={views} headshot={<img src="/static/img/me.jpg" alt="Ty Davis" width={136} height={136} />}>
      <Hero />
    </Viewpoints>
  );
}

export default LandingPage;
