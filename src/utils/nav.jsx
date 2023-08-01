import React from 'react';
import { Transition } from 'react-transition-group';
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
  }

  const nodeRef = React.useRef(null);
  const tranDuration = 1000;

  const tranStyle = {
    entering: {
      visibility: 'visible',
      maxHeight: '236px',
    },
    entered: {
      visibility: 'isible',
      maxHeight: '236px',
    },
    exiting: {
      visibility: 'visible',
      maxHeight: 0,
    },
    exited: {
      visibility: 'collapse',
      maxHeight: 0,
    },
  }

  return (
    <Transition nodeRef={ nodeRef } in={ menuState } timeout={ tranDuration }>
      {tranState => (
        <nav ref={nodeRef} style={{...tranStyle[tranState]}}>
          <ul>
            <a href="/"><li>Home</li></a>
            <a rel="noreferrer noopener" target="_blank" href="https://tydavisportfolio.wordpress.com"><li>About The Author</li></a>
            <a rel="noreferrer noopener" target="_blank" href="https://github.com/theTyster/duck_story"><li>The Code</li></a>
            <a href="page1.html"><li>Start The Story</li></a>
          </ul>
        </nav>
      )}
    </Transition>
  );

}


function Navigation() {

  const [menuState, menuSet] = React.useState(false);
  const onClick = () => menuSet(!menuState);


  return(
    <NavButton menuState={ menuState } onClick={ onClick } />
  );
}

export default Navigation
