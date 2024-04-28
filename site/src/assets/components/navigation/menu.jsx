import {React, useRef} from "react";
import {Transition} from 'react-transition-group';
import PropTypes from 'prop-types';


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
    <Transition nodeRef={nodeRef} in={menuState} timeout={tranDuration}>
      {tranState => (
        <nav ref={nodeRef} style={{...tranStyle[tranState]}}>
          <menu>
            <a rel="noreferrer noopener" target="_blank" href="my-work/fruit-search/">Fruit Search</a>
            <a rel="noreferrer noopener" target="_blank" href="my-work/giphy-search/">Giphy Search</a>
            <a rel="noreferrer noopener" target="_blank" href="my-work/hacker-news-clone/">Hacker News Clone</a>
            <a rel="noreferrer noopener" target="_blank" href="my-work/jeopardy/">Jeopardy</a>
            <a rel="noreferrer noopener" target="_blank" href="my-work/meme-generator/">Meme Generator</a>
            <a rel="noreferrer noopener" target="_blank" href="my-work/memory-game/">Memory Game</a>
            <a rel="noreferrer noopener" target="_blank" href="my-work/duck-story/">Duck Story</a>
            <a rel="noreferrer noopener" target="_blank" href="my-work/todo-app/">ToDo App</a>
          </menu>
        </nav>
      )}
    </Transition>
  );

}


export default Menu;
