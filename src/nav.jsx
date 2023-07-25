import React from 'react';
import './nav.scss'
import PropTypes from 'prop-types';

// Generates the Header and Footer.
function NavButton({ onClick, menuState }) {

  // PROPS VALIDATION
  NavButton.propTypes = {
    menuState: PropTypes.bool,
    onClick: PropTypes.func,
  }

  return (
    <>
      <button className='menuHam' onClick={ onClick }> 
          <svg width="16px" height="16px" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#6c623a" strokeLinecap="round" strokeWidth="1">
              <path d="m0 4 h16"/>
              <path d="m0 8 h16"/>
              <path d="m0 12 h16"/>
            </g>
          </svg>
      </button>
      <Menu menuState={ menuState } onClick={ onClick }/>
    </>
  );
}


function Menu({ menuState }) {

  // PROPS VALIDATION
  Menu.propTypes = {
    menuState: PropTypes.bool,
    onClick: PropTypes.func,
  }

  return (
      <nav style={{ visibility: menuState ? 'visible' : 'collapse' }}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a rel="noreferrer noopener" target="_blank" href="https://tydavisportfolio.wordpress.com">About The Author</a></li>
          <li><a rel="noreferrer noopener" target="_blank" href="https://github.com/theTyster/duck_story">The Code</a></li>
          <li><a href="page1.html">Start The Story</a></li>
        </ul>
      </nav>
  );
}

function Navigation() {

  const [menuState, menuSet] = React.useState(false);
  const onClick = () => menuState ? menuSet(false) : menuSet(true);


  return(
    <NavButton menuState={ menuState } onClick={ onClick } />
  );
}

export default Navigation
