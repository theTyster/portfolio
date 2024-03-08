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
          <ul>
            <a rel="noreferrer noopener" target="_blank" href="fruit-search/index.html"><li>Fruit Search</li></a>
            <a rel="noreferrer noopener" target="_blank" href="giphy-search/index.html"><li>Giphy Search</li></a>
            <a rel="noreferrer noopener" target="_blank" href="hacker-news-clone/index.html"><li>Hacker News Clone</li></a>
            <a rel="noreferrer noopener" target="_blank" href="jeopardy/index.html"><li>Jeopardy</li></a>
            <a rel="noreferrer noopener" target="_blank" href="meme-generator/index.html"><li>Meme Generator</li></a>
            <a rel="noreferrer noopener" target="_blank" href="memory-game/index.html"><li>Memory Game</li></a>
            <a rel="noreferrer noopener" target="_blank" href="duck-story/index.html"><li>Duck Story</li></a>
            <a rel="noreferrer noopener" target="_blank" href="todo-app/index.html"><li>ToDo App</li></a>         
          </ul>
        </nav>
      )}
    </Transition>
  );

}


export default Menu;
