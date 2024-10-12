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
        "Cherry Lane Farm Doodles": 0,
        CripToe: 1,
        "Fruit Search": 2,
        "Giphy Search": 3,
        "Hacker News Clone": 4,
        Jeopardy: 5,
        "Meme Generator": 6,
        "Memory Game": 7,
        "Duck Story": 8,
        "ToDo App": 9,
      },
      [
        {
          //0
          id: "Cherry Lane Farm Doodles",
          title: "Cherry Lane Farm Doodles",
          link: ["my-work/cherry-lane-farms/"],
          img: (
            <img
              src="static/img/cherrylane-farm-ss.png"
              alt="Cherry Lane Farm App Screenshot"
            />
          ),
        },
        {
          //1
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
          //2
          id: "Fruit Search",
          title: "Fruit Search",
          link: ["my-work/fruit-search/", "_blank"],
          img: (
            <img
              src="static/img/fruit-search-ss.png"
              alt="Fruit Search App Screenshot"
            />
          ),
        },
        {
          //3
          id: "Giphy Search",
          title: "Giphy Search",
          link: ["my-work/giphy-search/", "_blank"],
          img: (
            <img
              src="static/img/giphy-search-ss.png"
              alt="Giphy Search App Screenshot"
            />
          ),
        },
        {
          //4
          id: "Hacker News Clone",
          title: "Hacker News Clone",
          link: ["my-work/hacker-news-clone/", "_blank"],
          img: (
            <img
              src="static/img/hacker-news-clone-ss.png"
              alt="Hacker News Clone App Screenshot"
            />
          ),
        },
        {
          //5
          id: "Jeopardy",
          title: "Jeopardy",
          link: ["my-work/jeopardy/", "_blank"],
          img: (
            <img
              src="static/img/jeopardy-ss.png"
              alt="Jeopardy App Screenshot"
            />
          ),
        },
        {
          //6
          id: "Meme Generator",
          title: "Meme Generator",
          link: ["my-work/meme-generator/", "_blank"],
          img: (
            <img
              src="static/img/meme-generator-ss.png"
              alt="Meme Generator App Screenshot"
            />
          ),
        },
        {
          //7
          id: "Memory Game",
          title: "Memory Game",
          link: ["my-work/memory-game/", "_blank"],
          img: (
            <img
              src="static/img/memory-game-ss.png"
              alt="Memory Game App Screenshot"
            />
          ),
        },
        {
          //8
          id: "Duck Story",
          title: "Duck Story",
          link: ["my-work/duck-story-v1/", "_blank"],
          img: (
            <img
              src="static/img/duck-story-v1-ss.png"
              alt="Duck Story App Screenshot"
            />
          ),
        },
        {
          //9
          id: "ToDo App",
          title: "ToDo App",
          link: ["my-work/todo-app/", "_blank"],
          img: (
            <img src="static/img/todo-app-ss.png" alt="ToDo App Screenshot" />
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
