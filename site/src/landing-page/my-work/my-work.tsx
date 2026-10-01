//COMPONENTS
import Showcase from "@components/showcase/showcase";
import SvgNpm from "@img/npm-svg";

//COMPONENTS TODO:
//import DuckStory       from "../duck-story/duck-story";
//import FruitSearch     from "../fruit-search/fruit-search";
//import GiphySearch     from "../giphy-search/giphy-search";
//import HackerNewsClone from "../hacker-news-clone/hacker-news-clone";
//import Jeopardy        from "../jeopardy/jeopardy";
//import MemeGenerator   from "../meme-generator/meme-generator";
//import MemoryGame      from "../memory-game/memory-game";
//import TodoApp         from "../todo-app/todo-app";

const MyWork = () => {
  const portfolioDB: PortfolioDB["Map"] = new Map([
    [
      {
        Orbital: 0,
        "COBRA Eligibility": 1,
        sharlean: 2,
        Artemis: 3,
        locator: 4,
        kimmy: 5,
        "Cherry Lane Farm Doodles": 6,
        CripToe: 7,
      },
      [
        {
          //0:featured: Orbital Shifting marketplace. Links to the self-contained
          //orbital-shifting deck served same-origin (like the kimmy tile), NOT
          //the GitHub repo — the deck carries the philosophy content the
          //anti-discovery firewall exists to protect, so it is firewalled
          //(X-Robots-Tag in _headers + robots.txt disallow on /my-work/orbital-shifting).
          id: "Orbital",
          title: "Orbital",
          link: ["/my-work/orbital-shifting/index.html", "_blank"],
          img: (
            <img
              src="/static/img/orbital-ss.svg"
              alt="An object shifting along an orbital path, with a fading trail of prior positions"
            />
          ),
        },
        {
          //1:COBRA eligibility matrix (HoggWood Health client work via FortyAU).
          //Self-contained deck served same-origin like the kimmy tile, but
          //deliberately NOT firewalled: the client's code stays private and the
          //deck itself is meant to be discoverable. See public/_headers.
          id: "COBRA Eligibility",
          title: "COBRA Eligibility",
          link: ["/my-work/cobra-eligibility/index.html", "_blank"],
          img: (
            <img
              src="/static/img/cobra-eligibility-ss.svg"
              alt="A grid in which every cell is filled, with a single narrow outlet on one edge"
            />
          ),
        },
        {
          //2:sharlean, a deterministic Lean 4 scaffolder for shared-library projects
          id: "sharlean",
          title: "sharlean",
          link: ["https://github.com/theTyster/sharlean", "_blank"],
          img: (
            <img
              src="/static/img/sharlean-ss.svg"
              alt="Three small bodies orbiting a single shared core"
            />
          ),
        },
        {
          //3:Artemis benchmark harness
          id: "Artemis",
          title: "Artemis",
          link: ["https://github.com/theTyster/artemis", "_blank"],
          img: (
            <img
              src="/static/img/artemis-ss.svg"
              alt="Spacecraft on a dashed orbital trajectory around a planet"
            />
          ),
        },
        {
          //4:locator (formerly context-focused-agents)
          id: "locator",
          title: "locator",
          link: ["https://github.com/theTyster/context-focused-locator", "_blank"],
          img: (
            <img
              src="/static/img/context-focused-locator-ss.svg"
              alt="Two overlapping circles meeting at a single focal point"
            />
          ),
        },
        {
          //5:kimmy (FortyAU internal Python CLI wrapping Kimai time-tracker; links to the self-contained deck served same-origin)
          id: "kimmy",
          title: "kimmy",
          link: ["/my-work/kimmy/index.html", "_blank"],
          img: (
            <img
              src="/static/img/kimmy-ss.svg"
              alt="Stopwatch dial with a single hand and citron pivot"
            />
          ),
        },
        {
          //6:Cherry Lane Farms (demoted from featured)
          id: "Cherry Lane Farm Doodles",
          title: "Cherry Lane Farm Doodles",
          link: ["/cherry-lane-farms"],
          img: (
            <img
              src="/static/img/cherrylane-farm-ss.png"
              alt="Cherry Lane Farm App Screenshot"
            />
          ),
        },
        {
          //7
          id: "CripToe",
          title: "CripToe.js",
          link: ["https://www.npmjs.com/package/criptoe", "_blank"],
          img: (
            <SvgNpm
              title="CripToe NPM Package Icon"
              titleId="criptoe-npm-title"
              desc="CripToe NPM Package Icon"
              descId="criptoe-npm-desc"
              aria-label="CripToe NPM Package Icon"
            />
          ),
        },
      ],
    ],
  ]);

  // Beginner and bootcamp-era projects, kept but demoted behind a collapsed group.
  const earlyWorkDB: PortfolioDB["Map"] = new Map([
    [
      {
        Jeopardy: 0,
        "Duck Story": 1,
        "Fruit Search": 2,
        "Giphy Search": 3,
        "Hacker News Clone": 4,
        "Meme Generator": 5,
        "Memory Game": 6,
        "ToDo App": 7,
      },
      [
        {
          //0
          id: "Jeopardy",
          title: "Jeopardy",
          link: ["/jeopardy", "_blank"],
          img: (
            <img
              src="/static/img/jeopardy-ss.png"
              alt="Jeopardy App Screenshot"
            />
          ),
        },
        {
          //1
          id: "Duck Story",
          title: "Duck Story",
          link: ["/my-work/duck-story-v1/index.html", "_blank"],
          img: (
            <img
              src="/static/img/duck-story-v1-ss.png"
              alt="Duck Story App Screenshot"
            />
          ),
        },
        {
          //2
          id: "Fruit Search",
          title: "Fruit Search",
          link: ["/my-work/fruit-search/index.html", "_blank"],
          img: (
            <img
              src="/static/img/fruit-search-ss.png"
              alt="Fruit Search App Screenshot"
            />
          ),
        },
        {
          //3
          id: "Giphy Search",
          title: "Giphy Search",
          link: ["/my-work/giphy-search/index.html", "_blank"],
          img: (
            <img
              src="/static/img/giphy-search-ss.png"
              alt="Giphy Search App Screenshot"
            />
          ),
        },
        {
          //4
          id: "Hacker News Clone",
          title: "Hacker News Clone",
          link: ["/my-work/hacker-news-clone/index.html", "_blank"],
          img: (
            <img
              src="/static/img/hacker-news-clone-ss.png"
              alt="Hacker News Clone App Screenshot"
            />
          ),
        },
        {
          //5
          id: "Meme Generator",
          title: "Meme Generator",
          link: ["/my-work/meme-generator/index.html", "_blank"],
          img: (
            <img
              src="/static/img/meme-generator-ss.png"
              alt="Meme Generator App Screenshot"
            />
          ),
        },
        {
          //6
          id: "Memory Game",
          title: "Memory Game",
          link: ["/my-work/memory-game/index.html", "_blank"],
          img: (
            <img
              src="/static/img/memory-game-ss.png"
              alt="Memory Game App Screenshot"
            />
          ),
        },
        {
          //7
          id: "ToDo App",
          title: "ToDo App",
          link: ["/my-work/todo-app/index.html", "_blank"],
          img: (
            <img src="/static/img/todo-app-ss.png" alt="ToDo App Screenshot" />
          ),
        },
      ],
    ],
  ]);

  return (
    <nav>
      <menu className="my-work">
        <Showcase db={portfolioDB} />
        <details className="early-work">
          <summary>Early work</summary>
          <Showcase db={earlyWorkDB} featured={false} />
        </details>
      </menu>
    </nav>
  );
};

export default MyWork;
