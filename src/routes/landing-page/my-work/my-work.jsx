import React from "react";

//COMPONENTS
import Showcase from "../../../components/showcase/showcase.jsx";

//COMPONENTS TODO:
//import DuckStory       from "../duck-story/duck-story.jsx";
//import FruitSearch     from "../fruit-search/fruit-search.jsx";
//import GiphySearch     from "../giphy-search/giphy-search.jsx";
//import HackerNewsClone from "../hacker-news-clone/hacker-news-clone.jsx";
//import Jeopardy        from "../jeopardy/jeopardy.jsx";
//import MemeGenerator   from "../meme-generator/meme-generator.jsx";
//import MemoryGame      from "../memory-game/memory-game.jsx";
//import TodoApp         from "../todo-app/todo-app.jsx";

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
          onClick: undefined,
          link: ["fruit-search/", "_blank"],
          img: ["./static/img/fruit-search-ss.png", "Fruit Search App Screenshot"],
        },
        {
          //1
          id: "Giphy Search",
          title: "Giphy Search",
          onClick: undefined,
          link: ["giphy-search/", "_blank"],
          img: ["./static/img/giphy-search-ss.png", "Giphy Search App Screenshot"],
        },
        {
          //2
          id: "Hacker News Clone",
          title: "Hacker News Clone",
          onClick: undefined,
          link: ["hacker-news-clone/", "_blank"],
          img: ["./static/img/hacker-news-clone-ss.png", "Hacker News Clone App Screenshot"],
        },
        {
          //3
          id: "Jeopardy",
          title: "Jeopardy",
          onClick: undefined,
          link: ["jeopardy/", "_blank"],
          img: ["./static/img/jeopardy-ss.png", "Jeopardy App Screenshot"],
        },
        {
          //4
          id: "Meme Generator",
          title: "Meme Generator",
          onClick: undefined,
          link: ["meme-generator/", "_blank"],
          img: ["./static/img/meme-generator-ss.png", "Meme Generator App Screenshot"],
        },
        {
          //5
          id: "Memory Game",
          title: "Memory Game",
          onClick: undefined,
          link: ["memory-game/", "_blank"],
          img: ["./static/img/memory-game-ss.png", "Memory Game App Screenshot"],
        },
        {
          //6
          id: "Duck Story",
          title: "Duck Story",
          onClick: undefined,
          link: ["duck-story/", "_blank"],
          img: ["./static/img/duck-story-ss.png", "Duck Story App Screenshot"],
        },
        {
          //7
          id: "ToDo App",
          title: "ToDo App",
          onClick: undefined,
          link: ["todo-app/", "_blank"],
          img: ["./static/img/todo-app-ss.png", "ToDo App Screenshot"],
        },
      ]
    ]])

  return(
    <nav>
      <menu className="my-work">
        <Showcase db={portfolioDB}/>
      </menu>
    </nav>
  );
}

export default MyWork;
