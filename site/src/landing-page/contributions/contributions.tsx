"use client";

import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import useTheme from "@utils/use-theme";
import "./contributions.scss";

type PR = {
  id: number;
  title: string;
  html_url: string;
  state: "open" | "closed";
  created_at: string;
  repository_url: string;
  author_association: string;
  pull_request: { merged_at: string | null };
};

const SEARCH_API = "https://api.github.com/search/issues?q=author%3Athetyster+type%3Apr&per_page=100";
const SEARCH_HTML = "https://github.com/search?q=author%3Athetyster+type%3Apr&type=pullrequests";

// Calendar ramps from the panel colour to the accent, per theme.
const CALENDAR_THEME = {
  dark: ["#101a3e", "#1d4a66", "#2c7f96", "#45b3c9", "#62e3f7"],
  light: ["#e4eaf8", "#b5d3e0", "#6fa9bf", "#2f8099", "#0a6a88"],
};

/** Merged or still-open PRs to other people's repositories, grouped by repo. */
function group(prs: PR[]) {
  const keep = prs.filter((pr) => {
    const repo = pr.repository_url.split("/repos/")[1] ?? "";
    if (repo.toLowerCase().startsWith("thetyster/")) return false;
    return pr.state === "open" || pr.pull_request.merged_at;
  });
  const byRepo = new Map<string, PR[]>();
  for (const pr of keep) {
    const repo = pr.repository_url.split("/repos/")[1];
    byRepo.set(repo, [...(byRepo.get(repo) ?? []), pr]);
  }
  return [...byRepo.entries()].sort(
    (a, b) => Date.parse(b[1][0].created_at) - Date.parse(a[1][0].created_at),
  );
}

export default function Contributions() {
  const theme = useTheme();
  const [groups, setGroups] = useState<[string, PR[]][] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // A few tries with backoff; the unauthenticated API allows 60 calls an hour.
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(SEARCH_API, { headers: { Accept: "application/vnd.github+json" } });
          if (!res.ok) throw new Error(String(res.status));
          const body = (await res.json()) as { items: PR[] };
          if (!cancelled) setGroups(group(body.items));
          return;
        } catch {
          await new Promise((r) => setTimeout(r, 1500 * 2 ** attempt));
        }
      }
      if (!cancelled) setFailed(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="contributions">
      <p className="intro">
        Free and open source software is something I care about. Most of what I use falls under it, so I send fixes
        back where I can.
      </p>
      <div className="calendar">
        <GitHubCalendar
          username="thetyster"
          colorScheme={theme}
          theme={CALENDAR_THEME}
          fontSize={14}
          labels={{ totalCount: "{{count}} contributions in the last year" }}
        />
      </div>
      {groups ? (
        groups.map(([repo, prs]) => (
          <div className="repo-group" key={repo}>
            <p className="repo">{repo}</p>
            <ul>
              {prs.map((pr) => {
                const merged = Boolean(pr.pull_request.merged_at);
                return (
                  <li className="pr" key={pr.id}>
                    <a href={pr.html_url}>{pr.title}</a>
                    <span className={`st ${merged ? "merged" : "open"}`}>{merged ? "Merged" : "Open"}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      ) : failed ? (
        <p className="note">
          GitHub&apos;s API limit was reached, so the list can&apos;t load right now.{" "}
          <a href={SEARCH_HTML}>See my pull requests on GitHub</a>.
        </p>
      ) : (
        <p className="note" aria-live="polite">
          Loading pull requests from GitHub…
        </p>
      )}
    </div>
  );
}
