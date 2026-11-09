import React from 'react'

// All routes in this app run on the Cloudflare Workers edge runtime.
// Pages that require browser APIs (jQuery sub-pages) use "use client" locally.
export const runtime = 'edge'

const description =
  'Ty Davis ships reliable software with AI agents, and formal specifications and proofs check what they deliver, so people get what they actually need. Backend systems for enterprise benefits and insurance carriers.'

export const metadata = {
  metadataBase: new URL('https://portfolio.thetyster.dev'),
  title: 'Ty Davis, Portfolio',
  description,
  openGraph: {
    title: 'Ty Davis, Portfolio',
    description,
    url: '/',
    siteName: 'Ty Davis',
    images: [{ url: '/static/img/me.jpg', alt: 'Ty Davis' }],
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Ty Davis, Portfolio', description },
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

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#060a18' },
    { media: '(prefers-color-scheme: light)', color: '#f1f4fb' },
  ],
}

// Applies a theme the viewer picked earlier before first paint, so there is
// no flash of the other palette. Without a stored pick the OS setting wins.
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
