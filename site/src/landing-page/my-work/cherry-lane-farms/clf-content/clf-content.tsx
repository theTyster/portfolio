// Utilities
import { setTitle, sleep } from "@utils/utils.js";

// Components
import TabMenu from "@components/tab-menu/tab-menu";
import Planning from "./planning";
import Design from "./design";
import Backend from "./backend";
import Frontend from "./frontend";

// Styles
import "./clf-content.scss";

const ClfContent = () => {
  setTitle("The Creation of Cherry Lane Farms");

  return (
    <main>
      <h2>Project Overview</h2>
      <img
        className="hero"
        src="/static/img/cherrylane-farm-ss.png"
        alt="Screen shot of the front page of The Cherry Lane Farms website."
      />
      <p>
        <a href="https://original.cherrylanefarmdoodles.com/about/development">
          Cherry Lane Farm Doodles{" "}
        </a>
        is a family-owned and operated business that breeds and raises
        Goldendoodles. This website/webapp was created to help them manage their
        business.
      </p>
      <p>I had 5 goals in mind:</p>
      <ol>
        <li>Easy to use.</li>
        <li>Only pay for the domain.</li>
        <li>Lightning fast.</li>
        <li>Maximum Accessibility.</li>
        <li>
          Full-featured. Should accommodate:
          <ul>
            <li>Marketing</li>
            <li>Sales</li>
            <li>Customer Management</li>
            <li>Product Management</li>
          </ul>
        </li>
      </ol>
      <p>
        This project turned out to be an excellent opportunity for me to express
        my full range of capability in web development. Everything from design
        to implementation was done by me.
      </p>
      <h2>When I started this project, I had never…</h2>
      <ul>
        <li>
          Built my own continuous integration and deployment pipeline
          <p>
            Test Driven Development is something I have experience with.
            However, integrating a full-fledged end-to-end testing system into
            my deployment process was a new concept and actually changed the way
            I operate as a developer.
          </p>
        </li>
        <li>
          Successfully created a custom email address for free.
          <p>
            I learned how to integrate the owner's Gmail accounts with an SMTP
            server that I connected to their domain.
          </p>
        </li>
        <li>
          Used Zoho.
          <p>
            I learned how to use Zoho as a customer relationship manager for the
            owners. My familiarity with Hubspot helped, but every CRM is a bit
            different.
          </p>
        </li>
        <li>
          Worked with a web design tool.
          <p>
            I learned to use Figma to create design components and mock-ups.
          </p>
        </li>
        <li>
          Touched Typescript; Next.js; Cloudflare Pages, D1, R2, Workers, or KV.
          <p>
            I learned how to use all of these tools for the first time as I
            built the site.
          </p>
        </li>
        <li>
          Built my own NPM package.
          <p>
            This was something that was necessary for the project in order to
            have a set of utilities that could be used across the site various
            environments that I was working with.
          </p>
        </li>
      </ul>
      <h4>Why is this is so great?</h4>
      <p>
        This project included the first backend system I have ever designed from
        beginning to end. I suppose it might not be the most complex system, but
        I am proud of the fact that I was able to learn it from scratch and
        implement it from beginning to end.
      </p>
      <p>
        In the end, the only cost to build this website was the domain. If the
        rate of images created stays constant, the only potential cost could be
        for the SMTP server if the volume of emails sent ever surpasses a few
        thousand in a single day.
      </p>
      <p>
        The site is completely serverless and hosted entirely on the edge. On
        top of that, the statically generated assets and asynchronous loading
        done by Next.JS means that this website turned out to be remarkably
        fast.
      </p>
      <h2>Four Phases in Four Months</h2>
      <TabMenu
        menuItems={
          new Map([
            [
              {
                initial: 0,
                design: 1,
                backend: 2,
                frontend: 3,
              },
              [
                {
                  //0
                  id: "initial",
                  title: "Planning",
                  component: <Planning />,
                },
                {
                  id: "design",
                  title: "Design",
                  component: <Design />,
                },
                {
                  id: "backend",
                  title: "Backend",
                  component: <Backend />,
                },
                {
                  id: "frontend",
                  title: "Frontend",
                  component: <Frontend />,
                },
              ],
            ],
          ])
        }
      />
    </main>
  );
};
export default ClfContent;
