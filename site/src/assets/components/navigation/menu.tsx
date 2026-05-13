"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import NewTabLink from "@components/safe-link/new-tab-link";

type MenuProps = {
  open: boolean;
  menuId: string;
  onClose: () => void;
};

type Item =
  | { kind: "internal"; href: string; label: string }
  | { kind: "external"; href: string; label: string };

const ITEMS: Item[] = [
  { kind: "internal", href: "/", label: "Home" },
  { kind: "internal", href: "/blog", label: "Blog" },
  { kind: "internal", href: "/cherry-lane-farms", label: "Cherry Lane Farms" },
  { kind: "external", href: "https://github.com/theTyster/orbital", label: "Orbital" },
];

function Menu({ open, menuId, onClose }: MenuProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  useGSAP(
    () => {
      const drawer = drawerRef.current;
      if (!drawer) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Skip animation on initial mount; CSS holds the closed state.
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (prefersReducedMotion) {
        gsap.set(drawer, {
          autoAlpha: open ? 1 : 0,
          maxHeight: open ? "70vh" : 0,
          y: 0,
          scale: 1,
        });
        return;
      }

      if (open) {
        const tl = gsap.timeline();
        tl.fromTo(
          drawer,
          {
            autoAlpha: 0,
            y: -20,
            scale: 0.96,
            maxHeight: 0,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            maxHeight: "70vh",
            duration: 0.55,
            ease: "power3.out",
          },
        ).fromTo(
          drawer.querySelectorAll("li"),
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.06,
          },
          "-=0.35",
        );
      } else {
        gsap.to(drawer, {
          autoAlpha: 0,
          y: -8,
          scale: 0.97,
          maxHeight: 0,
          duration: 0.28,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [open], scope: drawerRef },
  );

  return (
    <nav
      ref={drawerRef}
      id={menuId}
      className="nav-drawer"
      data-open={open}
      aria-hidden={!open}
    >
      <ul className="nav-list" role="list">
        {ITEMS.map((item) => {
          const isCurrent =
            item.kind === "internal" && pathname === item.href;
          if (item.kind === "external") {
            return (
              <li key={item.href}>
                <NewTabLink link={item.href}>{item.label}</NewTabLink>
              </li>
            );
          }
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                onClick={onClose}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Menu;
