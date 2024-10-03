//DEV Libraries
import ReactDOM from "react-dom/client";
import {StrictMode} from "react";
//import {useState} from "react";

//COMPONENTS
import LandingPage from "./landing-page/landing-page";
import Navigation from "@components/navigation/nav";
//import Beginning from "./duck-story/beginning";

const Content = () => {

//  const [storyState, setStory] = useState("firstPaint");

  return(
    <main>
      <LandingPage />
    </main>
  )
}


// RENDERS
const nav = ReactDOM.createRoot(document.getElementById("nav"));
nav.render(
  <StrictMode>
  <Navigation />
  </StrictMode>
)

const content = ReactDOM.createRoot(document.getElementById("content"));
content.render(
  <StrictMode>
  <Content />
  </StrictMode>
);
