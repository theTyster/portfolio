//DEV Libraries
import ReactDOM from "react-dom/client";
import {useState} from "react";

//COMPONENTS
import LandingPage from "./landing-page/landing-page.jsx";
import Beginning from "./duck-story/beginning.jsx";
const Content = () => {

  const [storyState, setStory] = useState("firstPaint");

  return(
    <main>
    <article>
      <LandingPage />
    </article>
    </main>
  )
}


// RENDERS
const component = ReactDOM.createRoot(document.getElementById("content"));
component.render(<Content />);
