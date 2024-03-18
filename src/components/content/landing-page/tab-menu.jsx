import {useState, useEffect} from "react";

//COMPONENTS
import JobHistory from "./job-history.jsx";
import Hobbies from "./hobbies.jsx";
import Contributions from "./contributions.jsx";
import MyWork from "./my-work.jsx";

//CSS
import "../../../assets/css/tab-menu.scss";

function TabMenu(){

  let [portfolioState, setPortfolioState] = useState("my-work");

  const menu = {
    ["job-history"]: <JobHistory />,
    ["my-work"]: <MyWork />,
    ["contributions"]: <Contributions />,
    ["hobbies"]: <Hobbies />,
  }

  const handleClick = event => {
    // If the target has an id, return that, otherwise return the parents id.
    // if neither have an id, then return undefined.
    if(!(event.target.id ? 
        setPortfolioState(event.target.id):
        setPortfolioState(event.target.parentNode.id))
    )
          return undefined;
  }
  
  useEffect(()=>{
    const currentSelected = document.getElementById(portfolioState);
    const previousSelected = document.querySelector(".selected");

    if(previousSelected) previousSelected.classList.remove("selected");

    currentSelected.classList.add("selected");

  }, [portfolioState])

  // Note: Click handler depends on only buttons having id's.
  return(
    <>
      <menu onClick={handleClick}>
        <button id="job-history">
          <h2>Job History</h2>
        </button>
        <button id="my-work">
          <h2>My Work</h2>
        </button>
        <button id="contributions">
          <h2>Contributions</h2>
        </button>
        <button id="hobbies">
          <h2>Hobbies</h2>
        </button>
      </menu>
      <div className="tab-menu">
        {menu[portfolioState]}
      </div>
    </>
  )
}

export default TabMenu;
