import ReactDOM from 'react-dom/client';
import React from 'react';
import gsap from 'gsap';
import './css/front-page.scss';
import './css/duck-svg.scss';
import { ReactComponent as DuckSVG } from './front-page/img/duck.svg';
import Text from './front-page/text.jsx';

const onClick = async () => {
	const duckTl = gsap.timeline();
	

	await duckTl
		.to("#head", {duration: .4, ease:"back", rotate: 13, transformOrigin: "50% 50%"})
		.to("#lt_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"+=10", x:"+=2.7"},.5)
		.to("#rt_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"+=10", x:"+=4"},.5)
		.to("#lb_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"-=5", x:"-=2.5"},.5)
		.to("#rb_eyelid", {duration:.2, ease:"back",  yoyo:true, repeat:1, y:"-=5", x:"-=2.5"},.5)
		.to("#r_wing", {duration:.05, yoyo:true, repeat:3, rotate:130, transformOrigin:"50% 15%"},1)
		.to("#l_wing", {duration:.05, yoyo:true, repeat:3, rotate:50, transformOrigin:"50% 15%"},1);

	window.open("/page1.html", "_self");

}


const duckSVG = ReactDOM.createRoot(document.querySelector('#duck-svg'));
duckSVG.render(
	<DuckSVG />);

const text = ReactDOM.createRoot(document.querySelector('#text'));
text.render(<Text onClick={ onClick } />);
