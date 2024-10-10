//COMPONENTS
import Showcase from "@components/showcase/showcase";

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

  const portfolioDB = new Map(
    [[
      {
        "Fruit Search": 0,
        "Giphy Search": 1,
        "Hacker News Clone": 2,
        "Jeopardy": 3,
        "Meme Generator": 4,
        "Memory Game": 5,
        "Duck Story": 6,
        "ToDo App": 7,
      },
      [
        {
          //0
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
          //2
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
          //3
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
          //4
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
          //5
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
          //6
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
          //7
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
          //8
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
