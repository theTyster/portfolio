'use client'

// Cherry Lane Farms sub-page.
// "use client" boundary: the formal contract treats this as a jQuery-scoped
// page; jQuery (if used) is loaded only in the browser via dynamic import.
// jQuery must NEVER enter the edge runtime bundle
// (see test_jquery_never_loaded_in_edge_runtime).

import React, { useEffect } from 'react'
import Navigation from '@components/navigation/nav'
import ClfContent from '../../site/src/landing-page/my-work/cherry-lane-farms/clf-content/clf-content'

export default function ClfBody() {
  useEffect(() => {
    // jQuery is browser-only; dynamic import keeps it out of the edge bundle.
    void import('jquery')
  }, [])

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
        <ClfContent />
      </div>
      <footer>
        <div id="credit">
          <p>Ty Davis ©️ {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  )
}
