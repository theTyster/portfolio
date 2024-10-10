import Details from "@components/details/details";
import Showcase from "@components/showcase/showcase";

function Planning() {
  return (
    <>
      <h3>Phase One: Planning</h3>
      <p>
        The most important part to ensuring a quality website is knowing what to
        build. After talking with the owner, it was determined that their
        primary concerns were a simple design and strong Search Engine
        Optimization.
      </p>
      <Details
        open
        heading={<h4>Questions I asked before building the site</h4>}
      >
        <ol>
          <li>
            What does the site do? What should users be able to accomplish?
          </li>
          <p>
            The site should allow people to view puppies and their parents as
            well as past litters from parents. The focus should be on informing
            people about puppies we have available. The end goal would be to
            users fill out a form to apply for a puppy or sign up to be notified
            about the next litter.
          </p>
          <li>
            What are some similar sites that you like? How about ones you don’t
            like?
            <p>
              Example sites are featured <a href="#example-sites">below</a>.
            </p>
          </li>
          <li>
            Is this a completely new site, or are giving the existing one a
            makeover?
            <p>This will be a completely new site done from scratch.</p>
          </li>
          <li>
            Are we talking a webpage or a web of pages?
            <p>
              It will likely operate more like a web app. So, a web of pages is
              closer.
            </p>
          </li>
          <li>
            Will you want to add, edit, and delete pages yourself?
            <p>
              Updating pictures and information about dogs and puppies should be
              all that is needed to keep things running.
            </p>
          </li>
          <li>
            Think you’ll want to do some blogging on there? If so, is there a
            CMS you already like?
            <p>
              No blog will be necessary. Engages with audience on social media.
            </p>
          </li>
          <li>
            Do you have a certain design in mind, or can it be some
            out-of-the-box template?
            <p>The design should be completely uniue.</p>
          </li>
          <li>
            Should visitors be able to contact you through a form? Where do you
            plan on storing form submissions? (Many more questions were included
            here.)
            <p>
              Visitors and contacts will be managed through Zoho. Owners' email
              address will be made public with the help of a scrape shield for a
              bit of protection. A privacy policy will need to be created before
              collecting any information from visitors.
            </p>
          </li>
          <li>
            Are you planning to sell these puppies through the site?
            <p>
              The site will only need to manage the acceptance of Applications.
              Owner will handle payment processing.
            </p>
          </li>
          <li>
            Do you have content and images, or will you need help with those?
            <p>
              Plenty of Images. Graphics will need to be created for the design.
            </p>
          </li>
          <li>
            Does it need to support multiple languages?
            <p>
              U.S. English will be all. This is a locally operated business.
            </p>
          </li>
          <li>
            Who will be responsible for looking after the site after it’s done?
            Will someone need to be trained, or are you looking for a contractor
            to maintain things?
            <p>
              The site should be simple enough for the owner to maintain on
              their own after completion.
            </p>
          </li>
          <li>How do you want people to find your site?
            <p>Search Engine Optimization is a major priority.</p>
          </li>
          <li>
            If you want your site to be “better, faster, and cheaper” but can
            only pick two of them, which two would you choose?
            <p>Managed to do all of these. 😉</p>
          </li>
          <li>What’s your budget?
            <p>Domain will be the only cost.</p>
          </li>
        </ol>
      </Details>
      <div id="example-sites">
        <Showcase
          db={
            new Map([
              [
                {
                  empty: 0,
                  hilltop: 1,
                  gravelle: 2,
                },
                [
                  {
                    id: "empty",
                    img: (
                      <>
                        <div style={{ textAlign: "left" }}>
                          <h3>Example Sites</h3>
                          <p>
                            These two sites were given as a pattern to work
                            from.
                          </p>
                          <p>
                            They both had a focused on whitespace, artistic
                            fonts, and simplicity, I wanted to take things a
                            little bit further.
                          </p>
                        </div>
                      </>
                    ),
                  },
                  {
                    id: "hilltop",
                    title: "Hilltop Poodles and Doodles",
                    link: [
                      "https://www.hilltopdoodlesandpoodles.com",
                      "_blank",
                    ],
                    img: (
                      <img
                        src="/static/img/hilltop-doodles-ss.png"
                        alt="Screenshot taken from hilltopdoodlesandpoodles.com"
                      />
                    ),
                  },
                  {
                    id: "gravelle",
                    title: "Gravelle Family Farm",
                    link: ["https://www.gravellefamilyfarm.com/", "_blank"],
                    img: (
                      <img
                        src="/static/img/gravelle-family-farm-ss.png"
                        alt="Screenshot taken from gravellefamilyfarm.com"
                      />
                    ),
                  },
                ],
              ],
            ])
          }
        />
      </div>
    </>
  );
}

export default Planning;
