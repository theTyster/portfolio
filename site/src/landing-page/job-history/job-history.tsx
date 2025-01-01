// vim:foldmethod=marker
import { Fragment } from "react";
import utils from "./job-history.utils";

//CSS
import "./job-history.scss";

//Components
import JobAttentionGetter from "@components/attention-getter-image/attention-getter-image";
import NewTabLink from "@components/safe-link/new-tab-link";

function Preamble({ children }: { children: string }) {
  return <p className="preamble">{children}</p>;
}

const JobHistory = () => {
  const jobs = [
    //Freelance{{{
    new utils.jobHistoryContent(
      3,
      "Freelance Web Developer",
      "",
      {
        from: new Date(2020, 0),
        to: new Date(),
      },
      [
        "/static/img/freelance-webdev.jpg",
        "HTML code on a screen",
        "https://www.linkedin.com/in/tyler-d-webdev/",
      ],
      (
        <>
          <p>PR and the web go hand-in-hand these days.</p>
          <p>
            I&apos;ve found that my background in public relations helps
            tremendously as I help organizations build one of the most publicly
            facing forms of owned content a business usually has, their website.
            I have had the privelege to be a part of many new businesses first
            steps into the internet, and continue to support several of them as
            they grow. These experiences have taught me so much. Here&apos;s a
            few to start:
          </p>
        </>
      ),
      [
        "Unit and integration testing with Vitest, Jest, and Jasmine",
        "Building reusable JSX components with Sass styles",
        "Using Typescript, SQL and serverless hosting with Cloudflare Pages",
        "Bootstrapping full-stack sites on a shoestring budget",
        "Maintaining DNS and Web Application Firewalls",
        "Setting up an SMTP provider for email marketing",
        "Managing client needs and expectations",
        "Cloudflare Workers with R2, D1, and KV storage",
        "Designing and testing backend systems",
        "Static site generation with Next.js",
        "Search engine optimization (SEO)",
        "Building an online brand from the ground up.",
        <>
          Doing it all on a <i>tight</i> budget.
        </>,
        "Communicating with clients so they can get the site they want in the timeframe they want it.",
        "Teaching clients the basics of maintaining a website.",
        "Creating websites that are easy to maintain.",
        "Lots of graphic design.",
      ],
    ), //}}}
    // Springboard{{{
    new utils.jobHistoryContent(
      2,
      "Student",
      "Springboard Boot Camp",
      {
        from: new Date(2023, 9),
        to: new Date(2024, 2),
      },
      [
        "/static/img/springboard-logo.svg",
        "Springboard's Logo",
        "https://springboard.com",
      ],
      (
        <p>
          Springboard is a bootcamp I decided to team up to further my expertise
          in software development. My track focused on JavaScript, Python, and
          SQL. I started with Springboard after self-teaching for about a year.
          At Springboard I learned:
        </p>
      ),
      [
        "Advanced front end development.",
        "Advanced JavaScript.",
        "Advanced Python.",
        "SQL.",
        "Unit and Integration Testing.",
        "Back end development.",
      ],
    ), //}}}
    // Director's Choice{{{
    new utils.jobHistoryContent(
      1,
      "Director of Communications",
      "Director's Choice Tour and Travel",
      {
        from: new Date(2021, 7),
        to: new Date(2023, 0),
      },
      [
        "/static/img/directorschoice-logo.png",
        "Director's Choice Logo",
        "https://directorschoice.com",
      ],
      (
        <p>
          Working at Director&apos;s Choice changed me. I realized at
          Director&apos;s choice that I wanted to focus my career more on
          software development. While working there some of my responsibilities
          included:
        </p>
      ),
      [
        "Maintaining the front-end of the company website.",
        <>
          Ground-up development and maintenance of a{" "}
          <NewTabLink link="https://github.com/theTyster/DC-marketing-funneltron">
            sales funnel automation back end
          </NewTabLink>
          . (Python)
        </>,
        "Updating and maintaining the WordPress instance and site theme for the company website.",
        "Developing and maintaining interactive product pages.",
        "Writing HTML and CSS for marketing emails.",
        "Optimizing all digital media for Search Engine crawlers. (SEO)",
        "Integrating data in Google sheets and HubSpot with various applications. (Python)",
        "Designing and gathering visual media for marketing and public-facing events. (Adobe)",
        "Crisis prevention and management.",
        "Brand Management.",
      ],
    ), //}}}
    //RaiderComm{{{
    new utils.jobHistoryContent(
      0,
      "Account Manager and Consultant",
      "RaiderComm Public Relations",
      {
        from: new Date(2020, 2),
        to: new Date(2021, 4),
      },
      [
        "/static/img/raidercomm-logo.jpeg",
        "RaiderComm Public Relations Logo",
        "https://raidercommpr.wixsite.com/rcpr",
      ],
      (
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
      [
        <>
          Experience with lots of:
          <ul>
            <li>clients,</li>
            <li>teams,</li>
            <li>and deadlines.</li>
          </ul>
        </>,
        "How to host online events that engage stakeholder audiences effectively.",
        "How to create attractive and deliverable assets that can be used for a range of purposes.",
        "What it's like to collaborate with many fast moving companies while simultaneously a college student.",
        "How to be stressed effectively.",
        "How to manage a team.",
        "Why delegation is important",
        "Laws and governances surrounding copyright, fair-use, and how it all works on the web.",
        "Why we should build accessible services that can be used by anyone.",
      ],
    ), //}}}
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
            <utils.JobDetails
              summary={j.summary}
              list={j.responsibilities}
              classInsert={j.id}
              thumb={
                <JobAttentionGetter
                  imgClass={`jobHistory-${j.id}-logo`}
                  imgSrc={j.logo[0]}
                  imgAlt={j.logo[1]}
                  imgLink={j.logo[2] ? j.logo[2] : undefined}
                  sideText_classPrefix={`jobHistory-${j.id}`}
                  sideText={
                    <utils.AttentionGetterSideText
                      classInsert={j.id}
                      title={j.title}
                      org={j.org}
                      from={j.timeframe.from}
                      to={j.timeframe.to}
                    />
                  }
                />
              }
            />
          </article>
        </Fragment>
      ))}
    </div>
  );
};

export default JobHistory;
