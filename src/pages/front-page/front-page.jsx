import ReactDOM from 'react-dom/client';
import React from 'react';
import { ReactComponent as DuckSVG } from './assets/img/front-page-duck.svg';
import Text from './text.jsx';
import { Transition }from 'react-transition-group';

const tranStyles = {
	transform: 'rotate(30deg)', // the haed.
	flap: 'the wings'

}

const tranDuration = 7000;

const handleClick = () => {

}

const nodeRef = useRef(null);

const duckSVG = ReactDOM.createRoot(document.querySelector('#duck-svg'));
duckSVG.render(
	<DuckSVG nodeRef={nodeRef} in={ handleClick }/>);

const text = ReactDOM.createRoot(document.querySelector('#text'));
text.render(<Text />);
