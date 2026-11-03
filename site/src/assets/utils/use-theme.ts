"use client";

import { useEffect, useState } from "react";

/** The palette in use: the viewer's pick (data-theme on <html>) or the OS setting. */
export default function useTheme(): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const read = () => {
      const set = document.documentElement.dataset.theme;
      setTheme(set === "light" || set === "dark" ? set : mq.matches ? "light" : "dark");
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    mq.addEventListener("change", read);
    return () => {
      obs.disconnect();
      mq.removeEventListener("change", read);
    };
  }, []);
  return theme;
}
