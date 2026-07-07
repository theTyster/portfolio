import React from 'react'

// All routes in this app run on the Cloudflare Workers edge runtime.
// Pages that require browser APIs (jQuery sub-pages) use "use client" locally.
export const runtime = 'edge'

export const metadata = {
  title: 'Ty Davis, Portfolio',
  description: 'Full-stack software engineer portfolio',
  // Favicon is a plain static asset in public/static, referenced explicitly.
  // It must NOT live at app/icon.png: the Next file-metadata convention would
  // generate a Node-runtime /icon.png route, which @cloudflare/next-on-pages
  // rejects (all non-static routes must be edge). A static asset generates no
  // route, so the Cloudflare Pages build stays clean.
  icons: {
    icon: [
      { url: '/static/icon.png', type: 'image/png' },
      { url: '/static/favicon.ico', sizes: 'any' },
    ],
  },
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
