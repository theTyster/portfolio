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
      <header>
        <div id="nav">
          <Navigation />
        </div>
        <a className="home-button" href="/">
          <img src="/static/img/splat-wave.svg" alt="Home" />
        </a>
        <h1 className="page-title"></h1>
      </header>
      <div id="content">
        <main>{children}</main>
      </div>
      <footer>
        <div id="credit">
          <p>Ty Davis ©️ {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  );
}
