import React from 'react';
import {useState, useEffect} from 'react';
import gsap from 'gsap';

//Components
import NavButton from "./nav-button.jsx"

//CSS
import "./nav.scss";

function Navigation() {

  const [menuState, menuSet] = useState(false);
  const [hamTl] = useState(gsap.timeline()); // used to trigger the render.

  useEffect(() => {
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
    <NavButton menuState={menuState} onClick={onClick} />
  );
}

export default Navigation;
