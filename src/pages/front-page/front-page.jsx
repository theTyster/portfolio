import ReactDOM from 'react-dom/client';
import React from 'react';
import './assets/css/duck-svg.scss';
import { ReactComponent as DuckSVG } from './assets/img/front-page-duck.svg';
import Text from './text.jsx';

const onClick = () => {

	const duckHeadKeyframes = {
		transform: ['rotate(0deg)', 'rotate(30deg)'], //[from, to]
	}
	const duckHeadTiming = {
		duration: 500,
		fill: 'forwards',
	}

	const duckHead = document.getElementById('head');
	duckHead.animate(duckHeadKeyframes, duckHeadTiming);

}


const duckSVG = ReactDOM.createRoot(document.querySelector('#duck-svg'));
duckSVG.render(
	<DuckSVG />);

const text = ReactDOM.createRoot(document.querySelector('#text'));
text.render(<Text onClick={ onClick } />);
