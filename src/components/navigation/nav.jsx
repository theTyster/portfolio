import ReactDOM from "react-dom/client";
import React from 'react';
import gsap from 'gsap';

//Components
import NavButton from "./nav-button.jsx"

//CSS
import "../../assets/css/nav.scss";

function Navigation() {

  const [menuState, menuSet] = React.useState(false);
  const [hamTl] = React.useState(gsap.timeline()); // used to trigger the render.
  const ham = {};

  React.useEffect(() => {
    hamTl 
      .to("#ham-top", {duration: 0.4, y: 4})
      .to("#ham-bottom", {duration: 0.4, y: -4},"<")
      .reverse();
  }, [])

  const onClick = () => {
    hamTl.reversed(!hamTl.reversed()); //toggles the direction of the playhead after every render.
    menuSet(!menuState);
  }


  return(
    <NavButton ham={ ham } menuState={ menuState } onClick={ onClick } />
  );
}


const app = ReactDOM.createRoot(document.getElementById("nav"));
app.render(<Navigation />)
