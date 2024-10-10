import { useState } from "react";
import ZoomableImage from "@components/zoomable-image/zoomable-image";

import NewTabLink from "@components/safe-link/new-tab-link";
import AttentionGetterImage from "@components/attention-getter-image/attention-getter-image";
import Showcase from "@components/showcase/showcase";
function Design() {
  const [showcased, setshowcased] = useState("section-1");
  const currentlyShowcasedWidth = 400;
  const designShowcaseDb: PortfolioDB['Map'] = new Map([
    [
      {
        showcased: 0,
        "clf-section-2": 1,
        "clf-section-3": 2,
        "clf-404": 3,
        "clf-section-1": 4,
      },
      [
        {
          id: "showcased",
          img: (
            <>
              <ZoomableImage
                initialWidth={currentlyShowcasedWidth}
                img={{
                  className: "showcase_zoomable-image",
                  src: `/static/img/CLF-${showcased}.png`,
                  alt: "Mock-up of Cherry Lane Farms",
                }}
              />
            </>
          ),
        },
        {
          id: "clf-section-2",
          title: "Wood Section",
          onClick: () => setshowcased("section-2"),
          img: (
            <img
              src="/static/img/CLF-section-2.png"
              alt="Mock-up of Cherry Lane Farms"
            />
          ),
        },
        {
          id: "clf-section-3",
          title: "Tan Section",
          onClick: () => setshowcased("section-3"),
          img: (
            <img
              src="/static/img/CLF-section-3.png"
              alt="Mock-up of Cherry Lane Farms"
            />
          ),
        },
        {
          id: "clf-404",
          title: "404 Page",
          onClick: () => setshowcased("404"),
          img: (
            <img
              src="/static/img/CLF-404.png"
              alt="Mock-up of Cherry Lane Farms"
            />
          ),
        },
        {
          id: "clf-section-1",
          title: "Topmost Section",
          onClick: () => setshowcased("section-1"),
          img: (
            <img
              src="/static/img/CLF-section-1.png"
              alt="Mock-up of Cherry Lane Farms"
            />
          ),
        },
      ],
    ],
  ]);
  return (
    <>
      <h3>Phase Two: Design</h3>
      <AttentionGetterImage
        sideText={
          <i>
            <p>
              The color scheme I created is characterized by a uniform luminance
              and contrast ratio across the entire pallete.
            </p>
          </i>
        }
        sideText_classPrefix={"clf-figma"}
        imgClass={"clf-figma-color-theme"}
        imgSrc="/static/img/CLF-color-theme.png"
        imgAlt={"Color pallete for Cherry Lane Farms"}
      />
      <p>
        Figma is one of the foremost tools for web design. It has a focus on
        collaboration very similar to{" "}
        <NewTabLink link="https://apps.nextcloud.com/apps/whiteboard">
          Nextcloud's new Whiteboard app
        </NewTabLink>
        . I used Figma to create a mock-up of the site. Allowing me a space to
        collaborate with the owner on the UX and UI of the site before anything
        was hardcoded.
      </p>
      <Showcase db={designShowcaseDb} />
      <p>
        This process included building out all components and other visual
        graphics that would be used in the site early on. There was definitely a
        learning curve with Figma, but taking the time to plan the design of the
        site before building it saved me a lot of time reworking things later
        on.
      </p>
      <h4>If I could go back</h4>
      <p>
        I think I wouldn't have spent so much effort with the little details,
        like filling the mock-up with up-to-date content. Although this provided
        a very clear picture for the client, the extra time it took to gather
        and create some of these timely visual elements of the site did not help
        when I didn't end up using them.
      </p>
      <p>
        As great as Figma is, some design aspects are still better done as code
        is being written. In fact, I found that parts of Figma's interface were
        more cumbersome than straight code would have been in design. For
        example, Figma&apos;s "auto-layout" tools are very similar to how
        flex-box and grid displays work in CSS. Despite this, they are
        definitely not easier to mock. I found myself wanting to simply use my
        browser Dev Tools to write out what I wanted instead of trying to
        wrestle with Figma's 'auto-layout'. To its credit, Figma's variable
        system did translate very easily into Sass variables.
      </p>
    </>
  );
}

export default Design;
