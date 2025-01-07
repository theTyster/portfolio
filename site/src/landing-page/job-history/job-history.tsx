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
    //CLF {{{
    {
      id: 4,
      title: "Software Engineer",
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
        I am a software engineer with a background in public relations and
        advertising. Engineering dynamic, interactive, engaging, and search
        engine optimized content is my specialty.
      </Preamble>
      <Preamble>
        Everything I build is lean, fast, secure, and accessible. I am a firm
        believer in the idea that the internet should be for everyone.
      </Preamble>
      <Preamble>
        Good tests usher good software. I meticulously test everything I build
        and can use any testing suite.
      </Preamble>
      <Preamble>
        Typescript seems to be what I work with the most, but Python is a close
        second. My database experience ranges from SQLite to PostgreSQL to
        NoSQL.
      </Preamble>
      <Preamble>
        Recently, I have taken up creating my own SaaS built on Rust. (The code
        is not yet open but plans to be in the future.)
      </Preamble>
      <Preamble>
        Flipping between front-end and back-end development is something I am
        fairly comfortable with, although I tend to work on the front-end more.
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
