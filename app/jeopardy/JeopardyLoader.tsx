'use client'

import dynamic from 'next/dynamic'

// ssr:false ensures the Jeopardy game module (and the jQuery dynamic import
// inside it) is NEVER pulled into the edge worker SSR bundle.
const JeopardyGame = dynamic(() => import('./JeopardyGame'), { ssr: false })

export default function JeopardyLoader() {
  return <JeopardyGame />
}
