import PropTypes from 'prop-types';

//Components
import Menu from "./menu";

function NavButton({onClick, menuState}) {

  // PROPS VALIDATION
  NavButton.propTypes = {
    menuState: PropTypes.bool,
    onClick: PropTypes.func,
  }

  return (
    <>
      <button type="button" aria-label="Hamburger Menu" className='menuHam' onClick={onClick}> 
          <svg width="16px" height="16px" role="img" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <title id="hamburger_menu">Hamburger Menu</title>
            <g id="ham" fill="none" stroke="#6c623a" strokeLinecap="round" strokeWidth="2">
              <path id="ham-top" d="m1 4 h14"/>
              <path id="ham-middle" d="m1 8 h14"/>
              <path id="ham-bottom" d="m1 12 h14"/>
            </g>
          </svg>
      </button>
      <Menu menuState={menuState}/>
    </>
  );
}

export default NavButton;
