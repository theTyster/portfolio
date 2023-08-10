import ReactDOM from 'react-dom/client';
import React from 'react';
import './css/front-page.scss';
import SvgDuck from "./front-page/duck.jsx";
import Text from './front-page/text.jsx';
import StoryPage from './front-page/storyPage.jsx';


const renderStoryPage = () => {
  document.querySelector("#start-button").disabled = true; // keep double clickers safe.
  
  //TODO: need a way to render a duck svg animation when this function runs.
  const storyPage = ReactDOM.createRoot(document.querySelector("#storyPage"));
  storyPage.render(<StoryPage />);

  setTimeout(() => {
    window.open("/page1.html", "_self");
  }, 3000);


}


const duckSVG = ReactDOM.createRoot(document.querySelector('#duck-svg'));
duckSVG.render(<SvgDuck />);

const text = ReactDOM.createRoot(document.querySelector('#text'));
text.render(<Text onClick={ renderStoryPage }/>);

