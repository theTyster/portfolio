import { React, useRef } from "react";
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';

import NewTabLink from "@components/safe-link/new-tab-link"


function Menu({menuState}) {

  // PROPS VALIDATION
  Menu.propTypes = {
    menuState: PropTypes.bool,
  }

  const nodeRef = useRef(null);
  const tranDuration = 1000;

  const tranStyle = {
    entering: {
      visibility: 'visible',
      maxHeight: '345px',
    },
    entered: {
      visibility: 'visible',
      maxHeight: '345px',
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
    <Transition nodeRef={nodeRef} in={menuState} timeout={tranDuration}>
      {tranState => (
        <nav ref={nodeRef} style={{...tranStyle[tranState]}}>
          <menu>
            <a href="/">Home</a>
            <NewTabLink link="https://www.linkedin.com/in/tyler-d-webdev/">My LinkedIn</NewTabLink>
            <NewTabLink link="https://github.com/thetyster">My Github</NewTabLink>
            <NewTabLink link="/my-work/fruit-search/">Fruit Search</NewTabLink>
            <NewTabLink link="/my-work/giphy-search/">Giphy Search</NewTabLink>
            <NewTabLink link="/my-work/hacker-news-clone/">Hacker News Clone</NewTabLink>
            <NewTabLink link="/my-work/jeopardy/">Jeopardy</NewTabLink>
            <NewTabLink link="/my-work/meme-generator/">Meme Generator</NewTabLink>
            <NewTabLink link="/my-work/memory-game/">Memory Game</NewTabLink>
            <NewTabLink link="/my-work/duck-story-v1/">Duck Story</NewTabLink>
            <NewTabLink link="/my-work/todo-app/">ToDo App</NewTabLink>
          </menu>
        </nav>
      )}
    </Transition>
  );

}


export default Menu;
