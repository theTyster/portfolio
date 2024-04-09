//DEV Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import {StrictMode} from "react";
//import {useState} from "react";

//COMPONENTS
import LandingPage from "./routes/landing-page/landing-page.jsx";
import Navigation from "./components/navigation/nav.jsx";
import Credit from "./components/credit/credit.jsx";
//import Beginning from "./duck-story/beginning.jsx";

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

const credit = ReactDOM.createRoot(document.getElementById("credit"));
credit.render(
  <StrictMode>
  <Credit />
  </StrictMode>
);
