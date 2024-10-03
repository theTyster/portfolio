//DEV Libraries
import ReactDOM from "react-dom/client";
import {React, StrictMode} from "react";
import {setTitle} from "@utils/utils.js";

//COMPONENTS
import Navigation from "@components/navigation/nav";
import SvgLost from "@img/lost-svg";

//CSS
import "./404.scss";

const Content = () => {

  setTitle("Lost?");

  return(
    <main>
			<h2>That doesn&apos;t seem right...</h2>
			<SvgLost />
			<p>Try heading back to the home page.</p>
			<a className="button" href="/">Go Home</a>
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
