import react from "react";

//CSS
import "../../../assets/css/my-work.scss";

//UTILITY FUNCTIONS
import {makeArray} from "../../../assets/utils.js"

//COMPONENTS
//import DuckStory       from "../../../components/content/duck-story/duck-story.jsx";
//import FruitSearch     from "../../../components/content/fruit-search/fruit-search.jsx";
//import GiphySearch     from "../../../components/content/giphy-search/giphy-search.jsx";
//import HackerNewsClone from "../../../components/content/hacker-news-clone/hacker-news-clone.jsx";
//import Jeopardy        from "../../../components/content/jeopardy/jeopardy.jsx";
//import MemeGenerator   from "../../../components/content/meme-generator/meme-generator.jsx";
//import MemoryGame      from "../../../components/content/memory-game/memory-game.jsx";
//import TodoApp         from "../../../components/content/todo-app/todo-app.jsx";

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
          name: "Fruit Search",
          onClick: ()=> window.open("fruit-search/index.html"),
          img: ["./img/fruit-search-ss.png", "Fruit Search App Screenshot"],
        },
        {
          //1
          name: "Giphy Search",
          onClick: ()=> window.open("giphy-search/index.html"),
          img: ["./img/giphy-search-ss.png", "Giphy Search App Screenshot"],
        },
        {
          //2
          name: "Hacker News Clone",
          onClick: ()=> window.open("hacker-news-clone/index.html"),
          img: ["./img/hacker-news-clone-ss.png", "Hacker News Clone App Screenshot"],
        },
        {
          //3
          name: "Jeopardy",
          onClick: ()=> window.open("jeopardy/index.html"),
          img: ["./img/jeopardy-ss.png", "Jeopardy App Screenshot"],
        },
        {
          //4
          name: "Meme Generator",
          onClick: ()=> window.open("meme-generator/index.html"),
          img: ["./img/meme-generator-ss.png", "Meme Generator App Screenshot"],
        },
        {
          //5
          name: "Memory Game",
          onClick: ()=> window.open("memory-game/index.html"),
          img: ["./img/memory-game-ss.png", "Memory Game App Screenshot"],
        },
        {
          //6
          name: "Duck Story",
          onClick: ()=> window.open("duck-story/index.html"),
          img: ["./img/duck-story-ss.png", "Duck Story App Screenshot"],
        },
        {
          //7
          name: "ToDo App",
          onClick: ()=> window.open("todo-app/index.html"),
          img: ["./img/todo-app-ss.png", "ToDo App Screenshot"],
        },
      ]
    ]])

  const projectNamesObj = portfolioDB.keys().next().value;
  const projectDataArr = portfolioDB.values().next().value;

  const handleClick = event =>{
    try{
      // Get the target.
      const target = Array
        .from(event.target.parentNode.childNodes)
        .filter((e)=>e.nodeName === "H3")[0].innerText;
    }
    catch (TypeError){
      console.log(TypeError);
      return
    }

    // Use the portfolioDB Map to find the onClick function of the
    // target without having to iterate over anything. 
    // O(1)
    const projectIndex = projectNamesObj[target]
    projectDataArr[projectIndex].onClick();
  }

  return (
    <>
      <nav>
        <menu onClick={handleClick}>
          {projectDataArr.map(p => 
              (
                <button key={p.name}>
                  <h3>{p.name}</h3>
                  <img src={p.img[0]} alt={p.img[1]} />
                </button>
              )
          )}
        </menu>
      </nav>
    </>
  )
}


export default MyWork;
