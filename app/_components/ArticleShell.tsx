"use client";

import React, { useEffect } from "react";
import PortfolioShell from "./PortfolioShell";
import "./article-shell.scss";

/**
 * `ArticleShell` wraps `PortfolioShell` so article routes (e.g. `/blog/<slug>`)
 * inherit the universal header / footer chrome, then layer on the prose
 * container, neutral background, and quieter heading scale defined by
 * `foundation-article()` + `prose()`.
 *
 * Activation rules:
 *   - On mount we set `document.body.dataset.route = "article"` so the
 *     `body[data-route="article"]` selectors inside `foundation-article()`
 *     match and recolour the page. The attribute is cleared on unmount.
 *   - The `width` prop maps to a `data-article-width` attribute on the
 *     `<article>` element, which `foundation-article()` reads to widen
 *     (`wide` → 90ch) or unwrap (`full-bleed` → no max-width).
 *   - The `noindex` prop emits a `<meta name="robots" content="noindex,nofollow">`
 *     into `document.head` while the component is mounted. App-Router-native
 *     metadata exports from the parent server component (see D4's
 *     `generateMetadata`) are the preferred surface for SEO meta; this client
 *     fallback keeps the prop honoured even before D4 lands.
 */
export type ArticleShellProps = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  noindex?: boolean;
  width?: "prose" | "wide" | "full-bleed";
  permalink?: string;
  editUrl?: string;
  children: React.ReactNode;
};

export default function ArticleShell({
  title,
  date,
  description,
  tags,
  noindex,
  width,
  permalink,
  editUrl,
  children,
}: ArticleShellProps) {
  useEffect(() => {
    const previous = document.body.dataset.route;
    document.body.dataset.route = "article";
    return () => {
      if (previous === undefined) {
        delete document.body.dataset.route;
      } else {
        document.body.dataset.route = previous;
      }
    };
  }, []);

  useEffect(() => {
    if (!noindex) return;
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex,nofollow";
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, [noindex]);

  const articleWidth = width ?? "prose";
  const dateLabel = (() => {
    try {
      return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return date;
    }
  })();

  return (
    <PortfolioShell>
      <article className="prose" data-article-width={articleWidth}>
        <header className="article-header">
          <h1>{title}</h1>
          <time dateTime={date}>{dateLabel}</time>
          {tags && tags.length > 0 ? (
            <ul className="article-tags" aria-label="Tags">
              {tags.map((tag) => (
                <li key={tag} className="article-tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          {description ? (
            <p className="article-lede">{description}</p>
          ) : null}
        </header>
        {children}
        <footer className="article-footer">
          {permalink ? (
            <a href={permalink} rel="bookmark">
              Permalink
            </a>
          ) : null}
          {editUrl ? (
            <>
              {permalink ? " · " : null}
              <a href={editUrl} rel="external">
                Edit on GitHub
              </a>
            </>
          ) : null}
        </footer>
      </article>
    </PortfolioShell>
  );
}
