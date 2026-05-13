import React from 'react'

// All routes in this app run on the Cloudflare Workers edge runtime.
// Pages that require browser APIs (jQuery sub-pages) use "use client" locally.
export const runtime = 'edge'

export const metadata = {
  title: 'Ty Davis, Portfolio',
  description: 'Full-stack software engineer portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
