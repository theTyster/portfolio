import React from 'react'
import PortfolioShell from './_components/PortfolioShell'
import SvgLost from '../site/src/assets/img/lost-svg'
import './not-found.scss'

export const runtime = 'edge'

export default function NotFound() {
  return (
    <PortfolioShell>
      <section id="not-found">
        <h1>That doesn&apos;t seem right...</h1>
        <SvgLost />
        <p>Try heading back to the home page.</p>
        <a className="button" href="/">Go Home</a>
      </section>
    </PortfolioShell>
  )
}
