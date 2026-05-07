// Server Component shell. The actual jQuery-using game body is loaded via
// next/dynamic({ssr:false}) inside JeopardyLoader so that the edge worker
// bundle for this route remains jQuery-free.
// See test_jquery_never_loaded_in_edge_runtime.

import React from 'react'
import JeopardyLoader from './JeopardyLoader'

export const runtime = 'edge'

export default function JeopardyPage() {
  return <JeopardyLoader />
}
