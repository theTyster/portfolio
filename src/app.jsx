//DEV Libraries
import ReactDOM from "react-dom/client";
import react from "react";
//import {useState} from "react";

//COMPONENTS
import LandingPage from "./components/landing-page/landing-page.jsx";
import Navigation from "./components/navigation/nav.jsx";
import Credit from "./components/credit.jsx";
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
nav.render(<Navigation />)

const content = ReactDOM.createRoot(document.getElementById("content"));
content.render(<Content />);

const credit = ReactDOM.createRoot(document.getElementById("credit"));
credit.render(<Credit />);
