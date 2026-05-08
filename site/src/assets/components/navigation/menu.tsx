"use client";

import { usePathname } from "next/navigation";

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
  { kind: "external", href: "https://www.linkedin.com/in/tyler-d-webdev/", label: "LinkedIn" },
  { kind: "external", href: "https://github.com/thetyster", label: "Github" },
  { kind: "internal", href: "/cherry-lane-farms", label: "🐶 Cherry Lane Farms" },
  { kind: "external", href: "https://blog.thetyster.dev", label: "Blog" },
];

function Menu({ open, menuId, onClose }: MenuProps) {
  const pathname = usePathname();

  return (
    <nav
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
