"use client";

import { useEffect, useState } from "react";

//Components
import NavButton from "./nav-button";

//CSS
import "./nav.scss";

const MENU_ID = "primary-nav-menu";

function Navigation() {
  const [open, setOpen] = useState(false);

  // Close on Escape — common drawer-pattern affordance.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <NavButton
      open={open}
      onToggle={() => setOpen((o) => !o)}
      onClose={() => setOpen(false)}
      menuId={MENU_ID}
    />
  );
}

export default Navigation;
