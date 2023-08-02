import ReactDOM from 'react-dom/client';
import React from 'react';
import gsap from 'gsap';
import './css/front-page.scss';
import './css/duck-svg.scss';
import { ReactComponent as DuckSVG } from './front-page/img/duck.svg';
import Text from './front-page/text.jsx';

const onClick = () => {

	gsap.to("#head", {rotate: 13, transformOrigin: "50% 50%"});
	gsap.to("#r_wing", {rotate: 130, transformOrigin: "50% 15%"});

}


const duckSVG = ReactDOM.createRoot(document.querySelector('#duck-svg'));
duckSVG.render(
	<DuckSVG />);

const text = ReactDOM.createRoot(document.querySelector('#text'));
text.render(<Text onClick={ onClick } />);
