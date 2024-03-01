//DEV LIBRARIES
import react from "react";

//CSS
import "../../../assets/css/landing-page.scss";

//COMPONENTS
import Showcase from "./showcase.jsx";

function LandingPage(){

  return(
    <>
      <h1>Tyler Davis</h1>
      <img className="my-headshot" src="img/me.jpg" alt="My Face." />
      <hr />
      <p>I like to keep things, lean, fast, simple and usable. Accessibility trumps any other purpose the web could have.</p>
      <blockquote>
      <p>
        <i>&quot;Web pages are designed for people.&quot;</i>
      </p>
       <p>-Tim Berners-Lee</p>
      </blockquote>
      <h2>Some things that matter to me...</h2>
      <ul>
        <li>Accessibility</li>
        <li>Speed</li>
        <li>Transparency</li>
        <li>User Empowerment</li>
      </ul>
      <Showcase />
    </>
  )
}

export default LandingPage;
