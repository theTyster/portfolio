import React from 'react'
import PortfolioShell from './_components/PortfolioShell'
import './not-found.scss'

export const runtime = 'edge'

export default function NotFound() {
  return (
    <PortfolioShell>
      <section id="not-found">
        <svg aria-hidden="true" viewBox="0 0 320 200" fill="none">
          <g transform="rotate(-14 160 100)">
            <ellipse cx="160" cy="100" rx="140" ry="54" stroke="var(--line)" strokeWidth="1.4" strokeDasharray="3 7" />
            <ellipse cx="160" cy="100" rx="96" ry="36" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.4" />
          </g>
          <circle cx="160" cy="100" r="18" fill="var(--amber)" />
          <circle cx="292" cy="30" r="7" fill="var(--mid)" />
          <path d="M282 38 C 262 58, 248 64, 236 70" stroke="var(--mid)" strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="2 5" />
        </svg>
        <h1>Lost in orbit</h1>
        <p>This page drifted off course, or never existed.</p>
        <a className="btn primary" href="/">Back to the home page</a>
      </section>
    </PortfolioShell>
  )
}
