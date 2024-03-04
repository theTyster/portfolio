import {useRef, useState} from "react";

//COMPONENTS
import JobHistory from "./job-history.jsx";
import Hobbies from "./hobbies.jsx";
import Contributions from "./contributions.jsx";
import MyWork from "./my-work.jsx";

function Showcase(){
  //REFS
  const showcaseRef = useRef();

  let [portfolioState, setPortfolioState] = useState("my-work");

  const handleClick = event =>{
    if(event.target.classList.contains("job-history"))setPortfolioState("job-history");
    if(event.target.classList.contains("my-work"))setPortfolioState("my-work");
    if(event.target.classList.contains("contributions"))setPortfolioState("contributions");
    if(event.target.classList.contains("hobbies"))setPortfolioState("hobbies");
  }

  return(
    <>
      <ul className="showcase" ref={showcaseRef}>
        <li>
          <h2 className="showcase-click job-history" onClick={handleClick}>Job History</h2>
        </li>
        <li>
          <h2 className="showcase-click my-work" onClick={handleClick}>My Work</h2>
        </li>
        <li>
          <h2 className="showcase-click contributions" onClick={handleClick}>Contributions</h2>
        </li>
        <li>
          <h2 className="showcase-click hobbies" onClick={handleClick}>Hobbies</h2>
        </li>
      </ul>
      <div>{(()=>{
        switch(portfolioState){
          case("my-work"): return (
            <MyWork />
        );
          case("job-history"): return (
            <JobHistory />
        );
          case("contributions"): return (
            <Contributions />
        );
          case("hobbies"): return (
            <Hobbies />
        );
        }
      })()}</div>
    </>
  )
}

export default Showcase;
