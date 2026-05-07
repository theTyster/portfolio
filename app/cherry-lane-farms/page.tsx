// Server Component shell. The actual page body is loaded via
// next/dynamic({ssr:false}) inside ClfLoader so that the edge worker bundle
// for this route remains jQuery-free.
// See test_jquery_never_loaded_in_edge_runtime.

import React from 'react'
import ClfLoader from './ClfLoader'
import PortfolioShell from '../_components/PortfolioShell'

export const runtime = 'edge'

export default function CherryLaneFarmsPage() {
  return (
    <PortfolioShell>
      <ClfLoader />
    </PortfolioShell>
  )
}
