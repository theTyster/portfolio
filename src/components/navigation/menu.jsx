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


export default Menu;
