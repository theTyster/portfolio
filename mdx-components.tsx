import type { ComponentType } from 'react'

/**
 * Minimal local mirror of the `MDXComponents` shape from `mdx/types`.
 * Avoids adding `@types/mdx` as a direct dep just for one passthrough
 * signature. The `@next/mdx` v16 App Router convention requires this
 * file to export `useMDXComponents` at the project root.
 */
type MDXComponents = {
  [tag: string]: ComponentType<Record<string, unknown>> | undefined
  wrapper?: ComponentType<Record<string, unknown>>
}

/**
 * Required by @next/mdx (App Router convention).
 *
 * Typed identity passthrough: returns any caller-supplied component
 * overrides unchanged so MDX renders standard HTML elements (h1, h2,
 * blockquote, pre, code, etc.) as-is. Styling for those elements is
 * handled by the `.prose` CSS scope (see site/src/assets/css/_prose.scss
 * from item A3) — keeping the AI-author surface minimal: drop in an .mdx
 * file, get uniform chrome and prose typography for free, no JSX
 * component wrapping required per post.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
