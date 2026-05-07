'use client'

import dynamic from 'next/dynamic'

// ssr:false ensures the CLF body (and the jQuery dynamic import inside it)
// is NEVER pulled into the edge worker SSR bundle.
const ClfBody = dynamic(() => import('./ClfBody'), { ssr: false })

export default function ClfLoader() {
  return <ClfBody />
}
