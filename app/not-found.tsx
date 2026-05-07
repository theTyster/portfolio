import React from 'react'
import PortfolioShell from './_components/PortfolioShell'

export const runtime = 'edge'

export default function NotFound() {
  return (
    <PortfolioShell>
      <section id="not-found">
        <h1>404 — Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <p>
          <a href="/">Return to the home page →</a>
        </p>
      </section>
    </PortfolioShell>
  )
}
