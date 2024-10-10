//DEV Libraries
import ReactDOM from "react-dom/client";
import {StrictMode} from "react";

//COMPONENTS
import "./clf.scss";
import Navigation from "@components/navigation/nav";
import ClfContent from "./clf-content/clf-content";


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
    <ClfContent />
  </StrictMode>
);
