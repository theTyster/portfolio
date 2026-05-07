"use client";

import React from "react";
import PortfolioShell from "./PortfolioShell";
import LandingPage from "../../site/src/landing-page/landing-page";
import type { BlogFeedResult } from "../../site/src/landing-page/blog/blog";

export default function LandingPageClient({
  blogFeed,
}: {
  blogFeed: BlogFeedResult;
}) {
  return (
    <PortfolioShell>
      <LandingPage blogFeed={blogFeed} />
    </PortfolioShell>
  );
}
