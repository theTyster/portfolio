import React from "react";
import ProjectLink from "@components/project-link/project-link";
import ThemeToggle from "@components/theme-toggle/theme-toggle";
import "./shell.scss";

// Header, footer and backdrop shared by every route.
export default function PortfolioShell({
  children,
  bare = false,
}: {
  children: React.ReactNode;
  /** Render children without the reading panel (the home page lays itself out). */
  bare?: boolean;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <svg className="orbit-motif" aria-hidden="true" viewBox="0 0 800 800" fill="none">
        <g transform="rotate(-24 400 400)" stroke="var(--accent)" strokeWidth="1.2">
          <ellipse cx="400" cy="400" rx="380" ry="150" />
          <ellipse cx="400" cy="400" rx="290" ry="108" strokeDasharray="3 9" />
          <ellipse cx="400" cy="400" rx="200" ry="70" />
        </g>
        <circle cx="400" cy="400" r="34" fill="var(--amber)" fillOpacity="0.5" />
        <circle cx="712" cy="292" r="7" fill="var(--accent)" />
      </svg>
      <header className="site-header">
        <div className="bar">
          <a className="brand" href="/">
            <svg aria-hidden="true" width="34" height="22" viewBox="0 0 34 22" fill="none">
              <ellipse cx="17" cy="11" rx="15" ry="7" transform="rotate(-18 17 11)" stroke="var(--accent)" strokeWidth="1.6" />
              <circle cx="17" cy="11" r="4" fill="var(--amber)" />
              <circle cx="30" cy="6.5" r="2" fill="var(--accent)" />
            </svg>
            Ty Davis
          </a>
          <nav aria-label="Site">
            <ul>
              <li><ProjectLink id="sagittarius" /></li>
              <li><ProjectLink id="artemis" /></li>
              <li><ProjectLink id="stratify" /></li>
              <li><a href="https://blog.thetyster.dev">Blog</a></li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <div id="content">
        {bare ? (
          <div id="main-content">{children}</div>
        ) : (
          <main id="main-content" className="page">
            {children}
          </main>
        )}
      </div>
      <footer className="site-footer">
        <div className="bar">
          <span>Ty Davis, {new Date().getFullYear()}</span>
          <a href="mailto:ty@mail.thetyster.dev">ty@mail.thetyster.dev</a>
        </div>
      </footer>
    </>
  );
}
