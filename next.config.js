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
    remarkPlugins: [
      // Strip YAML frontmatter from the rendered output and expose it as
      // named exports on the MDX module. Without `remark-frontmatter` the
      // `---` block renders as `<hr/>` + `<h2>`; with just `remark-frontmatter`
      // it gets stripped but the values are lost. `remark-mdx-frontmatter`
      // adds the `export const frontmatter = {...}` MDX export so pages can
      // read the values via `import { frontmatter } from '…mdx'`.
      ['remark-frontmatter', ['yaml']],
      ['remark-mdx-frontmatter', { name: 'frontmatter' }],
    ],
    rehypePlugins: [
      ['rehype-pretty-code', { theme: 'github-dark-dimmed', keepBackground: false }],
    ],
  },
})

module.exports = withMDX(nextConfig)
