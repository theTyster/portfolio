const createMDX = require('@next/mdx')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // @cloudflare/next-on-pages transforms the .next output for Cloudflare Pages.
  // Run: npx @cloudflare/next-on-pages before wrangler pages deploy.
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [
      ['rehype-pretty-code', { theme: 'github-dark-dimmed', keepBackground: false }],
    ],
  },
})

module.exports = withMDX(nextConfig)
