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
        Sagittarius: 1,
        Artemis: 2,
        "context-focused-agents": 3,
        kimmy: 4,
        "Philosophy & Methodology Essays": 5,
        "Cherry Lane Farm Doodles": 6,
        CripToe: 7,
        Jeopardy: 8,
        "Duck Story": 9,
        // ── Early Work ───────────────────────────────────────────
        "Fruit Search": 10,
        "Giphy Search": 11,
        "Hacker News Clone": 12,
        "Meme Generator": 13,
        "Memory Game": 14,
        "ToDo App": 15,
      },
      [
        {
          //0:featured: Orbital Shifting marketplace
          id: "Orbital",
          title: "Orbital",
          link: ["https://github.com/theTyster/orbital", "_blank"],
          img: (
            <img
              src="/static/img/orbital-ss.svg"
              alt="An object shifting along an orbital path, with a fading trail of prior positions"
            />
          ),
        },
        {
          //1:Sagittarius verification pipeline
          id: "Sagittarius",
          title: "Sagittarius",
          link: ["https://github.com/theTyster/sagittarius", "_blank"],
          img: (
            <img
              src="/static/img/sagittarius-ss.svg"
              alt="An arrow drawn along a dashed orbital arc toward a target"
            />
          ),
        },
        {
          //2:Artemis benchmark harness
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
          //3:context-focused-agents
          id: "context-focused-agents",
          title: "context-focused-agents",
          link: ["https://github.com/theTyster/context-focused-agents", "_blank"],
          img: (
            <img
              src="/static/img/context-focused-agents-ss.svg"
              alt="Two overlapping circles meeting at a single focal point"
            />
          ),
        },
        {
          //4:kimmy (FortyAU internal Python CLI wrapping Kimai time-tracker; links to the self-contained deck served same-origin)
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
          //5:philosophy + methodology essays (will land on the blog)
          id: "Philosophy & Methodology Essays",
          title: "Philosophy & Methodology Essays",
          link: ["/blog/"],
          img: (
            <img
              src="/static/img/philosophy-essays-ss.svg"
              alt="Stack of four prose lines with a closing accent mark"
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
        {
          //8
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
          //9
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
        // ── Early Work ─────────────────────────────────────────
        {
          //10
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
          //11
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
          //12
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
          //13
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
          //14
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
          //15
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
      </menu>
    </nav>
  );
};

export default MyWork;
