"use client";

import React, { useEffect, useState } from "react";
import Menu from "@components/navigation/menu";
import "@components/navigation/nav.scss";
import "../../site/src/landing-page/landing-page.scss";

const NAV_MENU_ID = "primary-nav-menu";

export default function PortfolioShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header>
        <div className="header-bar">
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={NAV_MENU_ID}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="bar bar-top" aria-hidden="true" />
            <span className="bar bar-mid" aria-hidden="true" />
            <span className="bar bar-bot" aria-hidden="true" />
          </button>
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
        <Menu
          open={open}
          menuId={NAV_MENU_ID}
          onClose={() => setOpen(false)}
        />
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
