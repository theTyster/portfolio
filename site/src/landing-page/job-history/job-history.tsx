// vim:foldmethod=marker
import { Fragment } from "react";
import JobEntry from "./job-history.utils";

//CSS
import "./job-history.scss";

//Components
import NewTabLink from "@components/safe-link/new-tab-link";

function Preamble({ children }: { children: string }) {
  return <p className="preamble">{children}</p>;
}

const JobHistory = () => {
  const jobs = [
    //FortyAU {{{
    {
      id: 5,
      title: "Engineer II",
      org: "FortyAU",
      timeframe: {
        from: new Date(2025, 2),
        to: new Date(),
      },
      logo: [
        "/static/img/fortyau-logo.svg",
        "FortyAU Logo",
        "https://fortyau.com",
      ],
      summary: (
        <>
          <p>
            I am an Engineer II at FortyAU, a software consultancy. I do backend
            feature work for enterprise insurance carriers: claims processing,
            document export, eligibility verification, and member
            communications.
          </p>
          <section className="jobHistory-5-client-engagement">
            <h5 className="jobHistory-5-client-title">
              Client: HoggWood Health (COBRA platform)
            </h5>
            <p className="jobHistory-5-client-timeframe">
              January 2026 &ndash; Present &middot; via FortyAU
            </p>
            <ul>
              <li className="jobHistory-5-responsibilities">
                Designed the COBRA eligibility matrix and algorithm, the
                platform&apos;s core business logic, which every user flows
                through. Requirements are stated in Lean 4, state transitions
                are model-checked in TLA+, and constraints are explored with Z3
                and cvc5.{" "}
                <a
                  href="/my-work/cobra-eligibility/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the deck
                </a>
                .
              </li>
              <li className="jobHistory-5-responsibilities">
                Made the eligibility model total over malformed input, so a
                record with identity data we cannot independently verify still
                reaches a defined, justified outcome instead of being orphaned,
                lost, or misattributed. A separate Lean model of the
                implementation as built satisfies the requirements model, and the
                production code conforms to it within a stated boundary
              </li>
              <li className="jobHistory-5-responsibilities">
                Built an HTML-to-PDF invoice generation pipeline with Playwright
                (headless Chromium) and Handlebars templating: Azure Blob
                archival with an audit footer and three-variant dispatch
                (physical mail via LOB, SendGrid email attachment, canonical
                archive); 24 new tests, with the Chromium runtime Dockerized
              </li>
              <li className="jobHistory-5-responsibilities">
                Diagnosed and fixed an intermittent production logout by
                analyzing HAR captures and decoded JWTs; added a MultiFactor
                claim to the refresh token plus a conditional security guard,
                with unit coverage
              </li>
              <li className="jobHistory-5-responsibilities">
                Production incident triage and root-cause analysis across
                Cloudflare WAF 403s, a frontend refresh/retry storm, and an EF
                Core migration column-collision that crashed the UAT environment
              </li>
              <li className="jobHistory-5-responsibilities">
                Backend feature engineering on a .NET 6 / C#
                benefits-administration platform (ASP.NET Web API, React
                frontend, Azure DevOps, Azure App Service)
              </li>
              <li className="jobHistory-5-responsibilities">
                Code review and PR feedback at scale; release-pipeline and
                build-health maintenance
              </li>
            </ul>
          </section>
          <h5 className="jobHistory-5-client-title">
            Engineering methodology &amp; internal tooling
          </h5>
        </>
      ),
      responsibilities: [
        "Designed the AI development life cycle the client work above runs on: a Lean requirements model kept separate from a model of the implementation as built, with tests written before production code",
        <>
          Built <a href="/artemis">Artemis</a>, a treatment-vs-control LLM
          benchmark harness measuring whether formal scaffolding changes
          generation quality on real client tickets
        </>,
        <>
          Created{" "}
          <NewTabLink link="https://github.com/theTyster/orbital">
            Orbital Shifting
          </NewTabLink>
          , an earlier methodology shipped as a four-plugin Claude Code
          marketplace, and authored{" "}
          <NewTabLink link="https://github.com/theTyster/context-focused-locator">
            context-focused-locator
          </NewTabLink>
          : compiled BAML agents (locator + summarizer) for intent-driven,
          token-efficient context retrieval
        </>,
      ],
    },
    //}}}
    //Contract {{{
    {
      id: 4,
      title: "Independent Software Engineer (Contract)",
      org: "Cherry Lane Farms and Clear Horizons LLC",
      timeframe: {
        from: new Date(2024, 2),
        to: new Date(2026, 2),
      },
      logo: [
        "/static/img/cherry-lane-farm-logo.png",
        "Cherry Lane Farms Logo",
        "https://cherrylanefarmdoodles.com/about/development",
      ],
      summary: (
        <p>
          I came on board at Cherry Lane to build a maintainable web app to
          sell, track, and advertise puppies at minimal cost, and I was the only
          developer on the team. I also built and maintained a WordPress site for
          Clear Horizons LLC. Some of my responsibilities included:
        </p>
      ),
      responsibilities: [
        "Built a full-stack Next.js / React / TypeScript application on Cloudflare Pages and Workers: image storage and optimization (R2), relational data (D1), NoSQL caching (KV), and URL encryption",
        "Integrated Zoho CRM with Cloudflare Workers; shipped through CI/CD with GitHub Actions and Wrangler",
        "Test-driven development with Vitest, Jest, and Cypress; designed and tested the backend systems",
        "Reached a 98 Lighthouse score with nearly zero hosting cost: the only overhead was the domain name",
        "Deployed and maintained a themed WordPress site for Clear Horizons, including custom themes and plugins, business email, DNS records, and SSL certificates",
      ],
    },
    //}}}
    // Director's Choice{{{
    {
      id: 1,
      title: "Director of Communications",
      org: "Director's Choice Tour and Travel",
      timeframe: {
        from: new Date(2021, 7),
        to: new Date(2023, 0),
      },
      logo: [
        "/static/img/directorschoice-logo.png",
        "Director's Choice Logo",
        "https://directorschoice.com",
      ],
      summary: (
        <p>
          My first software work, alongside a communications role. Some of my
          responsibilities included:
        </p>
      ),
      responsibilities: [
        <>
          Ground-up development and maintenance of a{" "}
          <NewTabLink link="https://github.com/theTyster/DC-marketing-funneltron">
            sales funnel automation back end
          </NewTabLink>{" "}
          (Python)
        </>,
        "Integrating data in Google Sheets and HubSpot with various applications (Python)",
        "Maintaining the company website: front end, WordPress instance and theme, and interactive product pages",
      ],
    }, //}}}
  ];

  return (
    <div className="jobHistory">
      <img
        className="hero"
        src="/static/img/freelance-webdev.jpg"
        alt="HTML code on a screen"
      />
      <Preamble>
        I am a software engineer building backend systems for enterprise
        benefits and insurance carriers on .NET, C#, and Azure. I diagnose
        production incidents to their root cause, and I own core business logic
        that every user of a platform flows through.
      </Preamble>
      <Preamble>
        What sets my work apart is how I use AI-assisted development. I designed
        and practice my own AI development life cycle, which uses Lean 4, TLA+,
        and SMT solvers (Z3, cvc5) to keep AI-assisted code accountable to its
        specifications. Its core move is to separate the model of what must be
        true from the model of what the code actually does. Satisfaction and
        conformance are then two different obligations, so a correctness claim
        never outruns the evidence behind it.
      </Preamble>
      {jobs.map((j, i) => (
        <Fragment key={j.id}>
          {i > 0 ? <hr /> : undefined}
          <article>
            <JobEntry
              id={j.id}
              title={j.title}
              org={j.org}
              timeframe={j.timeframe}
              logo={j.logo}
              summary={j.summary}
              responsibilities={j.responsibilities}
            />
          </article>
        </Fragment>
      ))}
    </div>
  );
};

export default JobHistory;
