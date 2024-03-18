import {useState, useEffect} from "react";
import PropTypes from "prop-types";

//CSS
import "../../../assets/css/tab-menu.scss";

function TabMenu({menuItems}){

  //PROPS
  TabMenu.propTypes = {
    // Remember the Object keys will become the new ID's for each object.
    menuItems: PropTypes.object.isRequired,
  }

  const menuNamesObj = menuItems.keys().next().value;
  const menuDataArr = menuItems.values().next().value;

  let [portfolioState, setPortfolioState] = useState("my-work");

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
        {menuDataArr.map(item =>(
          <button key={item.id} id={item.id}>
            <h2>{item.title}</h2>
          </button>
        ))}
      </menu>
      <div className="tab-menu">
        {menuDataArr[menuNamesObj[portfolioState]].component}
      </div>
    </>
  )
}

export default TabMenu;
