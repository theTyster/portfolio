import {useState} from "react";
import PropTypes from "prop-types";

//CSS
import "./tab-menu.scss";

function TabMenu({menuItems}){

  //PROPS
  TabMenu.propTypes = {
    menuItems: PropTypes.object.isRequired,
    handleTabMenuClick: PropTypes.func,
  }

  const menuNamesObj = menuItems.keys().next().value;
  const menuDataArr = menuItems.values().next().value;

  const [menuState, setMenuState] = useState("initial");
  const currentSelected = menuDataArr[menuNamesObj[menuState]];

  const handleTabMenuClick = event =>
    setMenuState(
      menuDataArr[+(
        event.target.dataset.tabmenuItemId? 
        event.target.dataset.tabmenuItemId
        :
        event.target.parentNode.dataset.tabmenuItemId
      )].id);

  return(
    <div className="tabmenu">
      <menu onClick={handleTabMenuClick}> 
        {menuDataArr.map(item =>(
          <button 
            key={menuNamesObj[item.id]}
            aria-label={item.title}
            data-tabmenu-item-id={menuNamesObj[item.id]}
            className={item === currentSelected? "selected":""}
            onClick={item.buttonClick?item.buttonClick:undefined}
          >
            <h2 className={`tabmenu-item-title${item.titleClass?`-${item.titleClass}`:""}`}>
              {item.title}
            </h2>
          </button>
        ))}
      </menu>
      <div className="menu-content">
        {currentSelected.component}
      </div>
    </div>
  )
}

export default TabMenu;
