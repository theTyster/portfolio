import React from 'react';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';
import PropTypes from 'prop-types';

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
            <g id="ham" fill="none" stroke="#6c623a" strokeLinecap="round" strokeWidth="2">
              <path id="ham-top" d="m1 4 h14"/>
              <path id="ham-middle" d="m1 8 h14"/>
              <path id="ham-bottom" d="m1 12 h14"/>
            </g>
          </svg>
      </button>
      <h1 className="pageTitle">The Duck Story</h1>
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
      maxHeight: '560px',
    },
    entered: {
      visibility: 'visible',
      maxHeight: '560px',
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
            <a rel="noreferrer noopener" target="_blank" href="Hacker News Clone/index.html"><li>Hacker News Clone</li></a>
            <a rel="noreferrer noopener" target="_blank" href="Fruit Search Autocomplete/index.html"><li>Fruit Search</li></a>
            <a rel="noreferrer noopener" target="_blank" href="Giphy Search/index.html"><li>Giphy Search</li></a>
            <a rel="noreferrer noopener" target="_blank" href="Memory Game/index.html"><li>Memory Game</li></a>
            <a rel="noreferrer noopener" target="_blank" href="Jeopardy/index.html"><li>Jeopardy</li></a>
            <a rel="noreferrer noopener" target="_blank" href="Meme Generator/index.html"><li>Meme Generator</li></a>
            <a rel="noreferrer noopener" target="_blank" href="ToDo App/index.html"><li>ToDo App</li></a>
          </ul>
        </nav>
      )}
    </Transition>
  );

}


function Navigation() {

  const [menuState, menuSet] = React.useState(false);
  const [hamTl] = React.useState(gsap.timeline()); // used to trigger the render.
  const ham = {};

  React.useEffect(() => {
    hamTl // Every time the state is changed useEffect re-renders a new timeline and plays this.
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

export default Navigation
