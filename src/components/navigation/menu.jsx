import React from "react";
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';


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
          <menu>
            <a rel="noreferrer noopener" target="_blank" href="fruit-search/index.html">Fruit Search</a>
            <a rel="noreferrer noopener" target="_blank" href="giphy-search/index.html">Giphy Search</a>
            <a rel="noreferrer noopener" target="_blank" href="hacker-news-clone/index.html">Hacker News Clone</a>
            <a rel="noreferrer noopener" target="_blank" href="jeopardy/index.html">Jeopardy</a>
            <a rel="noreferrer noopener" target="_blank" href="meme-generator/index.html">Meme Generator</a>
            <a rel="noreferrer noopener" target="_blank" href="memory-game/index.html">Memory Game</a>
            <a rel="noreferrer noopener" target="_blank" href="duck-story/index.html">Duck Story</a>
            <a rel="noreferrer noopener" target="_blank" href="todo-app/index.html">ToDo App</a>         
          </menu>
        </nav>
      )}
    </Transition>
  );

}


export default Menu;
