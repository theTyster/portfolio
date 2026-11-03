// The one list of Ty's projects. Every mention of a project anywhere on the
// site links through this registry (see <ProjectLink>), so readers can follow
// how the projects relate. `href` is the project's card on the home page;
// projects without a card point straight at their deck or repo.

export type ProjectId =
  | "sagittarius"
  | "artemis"
  | "stratify"
  | "sharlean"
  | "locator"
  | "cherry-lane-farms"
  | "criptoe"
  | "cobra"
  | "kimmy"
  | "orbital-shifting";

export type Project = {
  id: ProjectId;
  name: string;
  /** CSS colour used for the card highlight. */
  color: string;
  /** Where a mention of the project takes the reader. */
  href: string;
  /** Off-site homes, shown in the project's own card. */
  site?: { label: string; url: string };
  repo?: string;
  /** Has a card in the Work section. */
  card: boolean;
};

const card = (id: ProjectId) => `/#work/${id}`;

export const PROJECTS: Record<ProjectId, Project> = {
  sagittarius: {
    id: "sagittarius",
    name: "Sagittarius",
    color: "var(--accent)",
    href: card("sagittarius"),
    site: { label: "Read the deck", url: "https://thetyster.github.io/sagittarius/" },
    repo: "https://github.com/theTyster/sagittarius",
    card: true,
  },
  artemis: {
    id: "artemis",
    name: "Artemis",
    color: "var(--mid)",
    href: card("artemis"),
    repo: "https://github.com/theTyster/artemis",
    card: true,
  },
  stratify: {
    id: "stratify",
    name: "Stratify",
    color: "var(--good)",
    href: card("stratify"),
    site: { label: "Open the site", url: "https://thetyster.github.io/stratify/" },
    repo: "https://github.com/theTyster/stratify",
    card: true,
  },
  sharlean: {
    id: "sharlean",
    name: "sharlean",
    color: "var(--amber)",
    href: card("sharlean"),
    site: { label: "Open the site", url: "https://thetyster.github.io/sharlean/" },
    repo: "https://github.com/theTyster/sharlean",
    card: true,
  },
  locator: {
    id: "locator",
    name: "locator",
    color: "var(--accent)",
    href: card("locator"),
    repo: "https://github.com/theTyster/context-focused-locator",
    card: true,
  },
  "cherry-lane-farms": {
    id: "cherry-lane-farms",
    name: "Cherry Lane Farm Doodles",
    color: "var(--amber)",
    href: card("cherry-lane-farms"),
    site: { label: "Case study", url: "/cherry-lane-farms" },
    card: true,
  },
  criptoe: {
    id: "criptoe",
    name: "CripToe.js",
    color: "var(--accent)",
    href: card("criptoe"),
    site: { label: "npm", url: "https://www.npmjs.com/package/criptoe" },
    card: true,
  },
  cobra: {
    id: "cobra",
    name: "COBRA eligibility deck",
    color: "var(--accent)",
    href: "/my-work/cobra-eligibility/index.html",
    card: false,
  },
  kimmy: {
    id: "kimmy",
    name: "kimmy",
    color: "var(--accent)",
    href: "/my-work/kimmy/index.html",
    card: false,
  },
  "orbital-shifting": {
    id: "orbital-shifting",
    name: "Orbital Shifting",
    color: "var(--accent)",
    // Superseded by Sagittarius; its history is told in the deck.
    href: "https://thetyster.github.io/sagittarius/full.html",
    card: false,
  },
};
