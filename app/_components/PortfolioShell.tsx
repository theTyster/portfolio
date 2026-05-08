"use client";

import React from "react";
import Navigation from "@components/navigation/nav";
import "../../site/src/landing-page/landing-page.scss";

export default function PortfolioShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header>
        <div className="header-bar">
          <Navigation />
          <a className="brand" href="/" aria-label="Ty Davis — home">
            <img
              className="brand-logo"
              src="/static/img/splat-wave.svg"
              alt=""
              aria-hidden="true"
            />
            <span className="brand-text">
              <span className="brand-name">Ty Davis</span>
              <span className="brand-role">web developer</span>
            </span>
          </a>
        </div>
      </header>
      <div id="content">
        <main id="main-content">{children}</main>
      </div>
      <footer>
        <div id="credit">
          <p>Ty Davis ©️ {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
