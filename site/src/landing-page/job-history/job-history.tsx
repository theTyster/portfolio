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
            I am an Engineer II at FortyAU, a software consultancy. My primary
            client engagement has been backend feature work for enterprise
            insurance carriers.
          </p>
          <p>
            Alongside that client work, I originated{" "}
            <NewTabLink link="https://github.com/theTyster/orbital">
              Orbital Shifting
            </NewTabLink>
            , a methodology that uses Prolog and Lean 4 to keep LLM-generated
            specifications logically coherent and free of self-contradiction.
            The framework ships as a four-plugin Claude Code marketplace I
            maintain and continue to develop. Some of my responsibilities at
            FortyAU include:
          </p>
        </>
      ),
      responsibilities: [
        "Backend feature engineering for enterprise insurance systems: claims processing, document export, eligibility verification, and member communications",
        "Originator of Orbital Shifting, a formal-verification and AI-augmented SDLC methodology",
        <>
          Maintaining the{" "}
          <NewTabLink link="https://github.com/theTyster/orbital">
            orbital marketplace
          </NewTabLink>
          : four Claude Code plugins (shifting, scaffolding, trajectory, telemetry)
        </>,
        <>
          Building <a href="/artemis">Artemis</a>, a treatment-vs-control LLM
          benchmark harness for measuring whether formal scaffolding changes
          generation quality
        </>,
        "Internal AI-SDLC tooling: prompt orchestration, multi-agent verification pipelines, calibrated abstention, evidence-grounded model evaluation",
        <>
          Authoring{" "}
          <a href="/context-focused-agents">context-focused-agents</a>: a pair
          of compiled BAML agents (locator + summarizer) that replace generic
          context tools with intent-driven alternatives
        </>,
        "Encoding software specifications as Prolog facts and Lean 4 theorems; refutation-driven testing against formal invariants",
        "Engineering with TypeScript, Python, Prolog, Lean 4, and Bun",
        "Code review and PR feedback at scale",
      ],
    },
    //}}}
    //CLF {{{
    {
      id: 4,
      title: "Senior Software Engineer",
      org: "Cherry Lane Farms Dog Breeding",
      timeframe: {
        from: new Date(2024, 2),
        to: new Date(),
      },
      logo: [
        "/static/img/cherry-lane-farm-logo.png",
        "Cherry Lane Farms Logo",
        "https://cherrylanefarmdoodles.com/about/development",
      ],
      summary: (
        <>
          <p>
            I came on board at Cherry Lane to build a maintainable web app that
            would allow us to sell, track, and advertise puppies. A major goal
            of this project was minimal cost. I was able to achieve this by
            using Cloudflare Pages and Workers to host the site and serverless
            functions. In the end, the only overhead cost was the domain name.
          </p>
          <p>
            I covered just about every aspect of the project. From the front end
            to the back end, I was the only developer on the team. Some of my
            responsibilities included:
          </p>
        </>
      ),
      responsibilities: [
        "Unit and integration testing with Vitest, Jest, and Jasmine",
        "TDD with Cypress End-to-End testing",
        "CI/CD wiht GitHub Actions, Cypress, Curl, and Cloudflare Wrangler",
        "Building reusable JSX components with Sass styles",
        "Engineering with Typescript and SQL",
        "Continuous Deployment and Integration with Cloudflare Pages serverless functions",
        "Bootstrapping full-stack sites on a shoestring budget",
        "Maintaining DNS security and Web Application Firewalls",
        "Setting up an SMTP provider for email marketing",
        "Integrating Zoho CRM with Cloudflare Workers",
        "Engineering with Cloudflare Workers, R2, D1, and KV storage",
        "Designing and testing backend systems",
        "Static site generation with Next.js",
        "Search engine optimization (SEO)",
        "Consistently deploying a fully accessible user interface",
        "Developing custom NPM packages for internal use",
      ],
    },
    //}}}
    // Clear Horizons LLC {{{
    {
      id: 3,
      title: "WordPress Developer",
      org: "Clear Horizons LLC",
      timeframe: {
        from: new Date(2024, 9),
        to: new Date(),
      },
      logo: [
        "/static/img/clearhorizons.jpg",
        "Clear Horizons LLC website backdrop",
        "https://clearhorizonsllc.com",
      ],
      summary: (
        <>
          <p>
            I am currently working at Clear Horizons LLC as a part-time
            contracted WordPress Developer. My responsibilities include:
          </p>
        </>
      ),
      responsibilities: [
        "Rapid deployment of themed WordPress site",
        "Customizing themes and plugins",
        "Connecting and integrating business email addresses",
        "Setting up and maintaining DNS records and SSL certificates",
        "SEO optimization",
      ],
    },
    // }}}
    // Springboard{{{
    {
      id: 2,
      title: "Student",
      org: "Springboard Boot Camp",
      timeframe: {
        from: new Date(2023, 9),
        to: new Date(2024, 2),
      },
      logo: [
        "/static/img/springboard-logo.svg",
        "Springboard's Logo",
        "https://springboard.com",
      ],
      summary: (
        <p>
          Springboard is a bootcamp I decided to team up to further my expertise
          in software development. My track focused on JavaScript, Python, and
          SQL. I started with Springboard after self-teaching for about a year.
          At Springboard I learned:
        </p>
      ),
      responsibilities: [
        "Advanced front end development",
        "Advanced JavaScript",
        "Advanced Python",
        "SQL",
        "Unit and Integration Testing",
        "Back end development",
      ],
    }, //}}}
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
          Working at Director&apos;s Choice changed me. I realized at
          Director&apos;s choice that I wanted to focus my career more on
          software development. While working there some of my responsibilities
          included:
        </p>
      ),
      responsibilities: [
        "Maintaining the front-end of the company website",
        <>
          Ground-up development and maintenance of a{" "}
          <NewTabLink link="https://github.com/theTyster/DC-marketing-funneltron">
            sales funnel automation back end
          </NewTabLink>
           (Python)
        </>,
        "Updating and maintaining the WordPress instance and site theme for the company website",
        "Developing and maintaining interactive product pages",
        "Writing HTML and CSS for marketing emails",
        "Optimizing all digital media for Search Engine crawlers (SEO)",
        "Integrating data in Google sheets and HubSpot with various applications (Python)",
        "Designing and gathering visual media for marketing and public-facing events (Adobe)",
        "Crisis prevention and management",
        "Brand Management",
      ],
    }, //}}}
    //RaiderComm{{{
    {
      id: 0,
      title: "Account Manager and Consultant",
      org: "RaiderComm Public Relations",
      timeframe: {
        from: new Date(2020, 2),
        to: new Date(2021, 4),
      },
      logo: [
        "/static/img/raidercomm-logo.jpeg",
        "RaiderComm Public Relations Logo",
        "https://raidercommpr.wixsite.com/rcpr",
      ],
      summary: (
        <>
          <p>
            RaiderComm is a student run PR Agency that works to help local
            organizations. I had such fulfilling experiences working with these
            organizations. My favorite client was a small shaved ice stand that
            provided jobs for neuro-atypical kids.
          </p>
          <p>
            I also worked with an organization supporting parents of children
            with{" "}
            <NewTabLink link="https://en.wikipedia.org/wiki/Anoxia">
              Anoxia
            </NewTabLink>
            . We were able to prioritize this organizations search engine
            results page rank with search engine optimized content. My time at
            RaiderComm set the foundation for how I build content for websites
            today. Here&apos;s a few more things I learned from my time there:
          </p>
        </>
      ),
      responsibilities: [
        <>
          Experience with lots of:
          <ul>
            <li>clients,</li>
            <li>teams,</li>
            <li>and deadlines.</li>
          </ul>
        </>,
        "How to host online events that engage stakeholder audiences effectively",
        "How to create attractive and deliverable assets that can be used for a range of purposes",
        "What it's like to collaborate with many fast moving companies while simultaneously a college student",
        "How to be stressed effectively",
        "How to manage a team",
        "Why delegation is important",
        "Laws and governances surrounding copyright, fair-use, and how it all works on the web",
        "Why we should build accessible services that can be used by anyone",
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
        I am a software engineer working at the intersection of formal
        verification, AI-augmented development, and backend engineering. I
        created Orbital Shifting, a methodology that uses formal verification
        and logic-oriented languages (Prolog, Lean 4) to help LLMs generate
        specifications that don&apos;t contradict themselves. I structure LLM
        reasoning as a logical debate with humans and theorem provers, so the
        resulting concepts align with what humans intend rather than drifting
        on training-set defaults.
      </Preamble>
      <Preamble>
        Good specifications usher good software. I follow a test-driven
        development discipline anchored to formal specifications, generated
        through a logical reasoning pipeline with LLM assistance.
      </Preamble>
      <Preamble>
        My day-to-day stack these days is Markdown, Prolog, and Lean 4. I
        read TypeScript, Python, and SQL fluently and have working familiarity
        with several others. I work across both backend and frontend, adapting
        my theorem-proving languages and reasoning to whatever the tech stack
        calls for.
      </Preamble>
      {jobs.map((j) => (
        <Fragment key={j.id}>
          {j.id < jobs.length - 1 ? <hr /> : undefined}
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
