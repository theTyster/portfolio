import type { ReactNode } from "react";
import ProjectLink from "@components/project-link/project-link";
import "./job-history.scss";

type Job = {
  id: string;
  title: string;
  org: string;
  /** Month index is 0-based, as in Date. `to` omitted means current. */
  from: [number, number];
  to?: [number, number];
  tone: string;
  summary: ReactNode;
  client?: { title: string; when: string; items: ReactNode[] };
  items: ReactNode[];
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const fmt = ([y, m]: [number, number]) => `${MONTHS[m]} ${y}`;
const span = (j: Job) => `${fmt(j.from)} to ${j.to ? fmt(j.to) : "now"}`;

const JOBS: Job[] = [
  {
    id: "fortyau",
    title: "Engineer II",
    org: "FortyAU, a software consultancy",
    from: [2025, 2],
    tone: "var(--amber)",
    summary: (
      <p>
        Backend feature work for enterprise insurance carriers: claims processing, document export, eligibility
        verification, and member communications.
      </p>
    ),
    client: {
      title: "Client: HoggWood Health (COBRA platform)",
      when: "January 2026 to now",
      items: [
        <>
          Designed the COBRA eligibility matrix and algorithm, the platform&apos;s core business logic, which every user
          flows through. Requirements are stated in Lean 4, state transitions are model-checked in TLA+, and
          constraints are explored with Z3 and cvc5. Read the <ProjectLink id="cobra" />.
        </>,
        "Made the eligibility model total over malformed input, so a record with identity data we cannot independently verify still reaches a defined, justified outcome instead of being orphaned, lost, or misattributed. A separate Lean model of the implementation as built satisfies the requirements model, and the production code conforms to it within a stated boundary.",
        "Built an HTML-to-PDF invoice generation pipeline with Playwright (headless Chromium) and Handlebars templating: Azure Blob archival with an audit footer and three-variant dispatch (physical mail via LOB, SendGrid email attachment, canonical archive); 24 new tests, with the Chromium runtime Dockerized.",
        "Diagnosed and fixed an intermittent production logout by analyzing HAR captures and decoded JWTs; added a MultiFactor claim to the refresh token plus a conditional security guard, with unit coverage.",
        "Production incident triage and root-cause analysis across Cloudflare WAF 403s, a frontend refresh/retry storm, and an EF Core migration column-collision that crashed the UAT environment.",
        "Backend feature engineering on a .NET 6 / C# benefits-administration platform (ASP.NET Web API, React frontend, Azure DevOps, Azure App Service).",
        "Code review and PR feedback at scale; release-pipeline and build-health maintenance.",
      ],
    },
    items: [
      "Designed the AI development life cycle the client work above runs on: a Lean requirements model kept separate from a model of the implementation as built, with tests written before production code.",
      <>
        Built <ProjectLink id="artemis" />, a treatment-vs-control LLM benchmark harness measuring whether formal
        scaffolding changes generation quality on real client tickets.
      </>,
      <>
        Created <ProjectLink id="orbital-shifting" />, an earlier methodology shipped as a four-plugin Claude Code
        marketplace and since replaced by <ProjectLink id="sagittarius" />, and authored{" "}
        <ProjectLink id="locator" />: compiled BAML agents (locator + summarizer) for intent-driven, token-efficient
        context retrieval.
      </>,
      <>
        Built <ProjectLink id="kimmy" />, an internal Python CLI for the Kimai time tracker.
      </>,
    ],
  },
  {
    id: "contract",
    title: "Independent Software Engineer (Contract)",
    org: "Cherry Lane Farms and Clear Horizons LLC",
    from: [2024, 2],
    to: [2026, 2],
    tone: "var(--mid)",
    summary: (
      <p>
        I came on board at <ProjectLink id="cherry-lane-farms">Cherry Lane</ProjectLink> to build a maintainable web
        app to sell, track, and advertise puppies at minimal cost, and I was the only developer on the team. I also
        built and maintained a WordPress site for Clear Horizons LLC.
      </p>
    ),
    items: [
      "Built a full-stack Next.js / React / TypeScript application on Cloudflare Pages and Workers: image storage and optimization (R2), relational data (D1), NoSQL caching (KV), and URL encryption.",
      "Integrated Zoho CRM with Cloudflare Workers; shipped through CI/CD with GitHub Actions and Wrangler.",
      "Test-driven development with Vitest, Jest, and Cypress; designed and tested the backend systems.",
      "Reached a 98 Lighthouse score with nearly zero hosting cost: the only overhead was the domain name.",
      "Deployed and maintained a themed WordPress site for Clear Horizons, including custom themes and plugins, business email, DNS records, and SSL certificates.",
    ],
  },
  {
    id: "directors-choice",
    title: "Director of Communications",
    org: "Director's Choice Tour and Travel",
    from: [2021, 7],
    to: [2023, 0],
    tone: "var(--good)",
    summary: <p>My first software work, alongside a communications role.</p>,
    items: [
      <>
        Ground-up development and maintenance of a{" "}
        <a href="https://github.com/theTyster/DC-marketing-funneltron">sales funnel automation back end</a> (Python).
      </>,
      "Integrating data in Google Sheets and HubSpot with various applications (Python).",
      "Maintaining the company website: front end, WordPress instance and theme, and interactive product pages.",
    ],
  },
];

export default function JobHistory() {
  return (
    <ol className="dates">
      {JOBS.map((j) => (
        <li key={j.id} className={j.to ? undefined : "now"} style={{ "--tone": j.tone } as React.CSSProperties}>
          <p className="when">{span(j)}</p>
          <h3 className="role">{j.title}</h3>
          <p className="org">{j.org}</p>
          <div className="summary">{j.summary}</div>
          {j.client ? (
            <section className="client">
              <h4>{j.client.title}</h4>
              <p className="client-when">{j.client.when}</p>
              <ul className="bul">
                {j.client.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {j.client ? <h4 className="client-after">Engineering methodology and internal tooling</h4> : null}
          <ul className="bul">
            {j.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
