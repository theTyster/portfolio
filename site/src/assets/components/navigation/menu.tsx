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
  { kind: "external", href: "https://www.linkedin.com/in/tyler-d-webdev/", label: "My LinkedIn" },
  { kind: "external", href: "https://github.com/thetyster", label: "My Github" },
  { kind: "internal", href: "/cherry-lane-farms", label: "🐶 Cherry Lane Farms" },
  { kind: "internal", href: "/jeopardy", label: "Jeopardy" },
  { kind: "external", href: "/my-work/fruit-search/index.html", label: "Fruit Search" },
  { kind: "external", href: "/my-work/giphy-search/index.html", label: "Giphy Search" },
  { kind: "external", href: "/my-work/hacker-news-clone/index.html", label: "Hacker News Clone" },
  { kind: "external", href: "/my-work/meme-generator/index.html", label: "Meme Generator" },
  { kind: "external", href: "/my-work/memory-game/index.html", label: "Memory Game" },
  { kind: "external", href: "/my-work/duck-story-v1/index.html", label: "Duck Story" },
  { kind: "external", href: "/my-work/todo-app/index.html", label: "ToDo App" },
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
