// alright you are working on learning about how to import and connect files so that
// vite/rollup will bundle them correctly in the dist folder.
// there seems to be something wrong with the way that you are handling the main.jsx file.
// use the vite-project folder as a guide.
//
// also eslint isn't working somehow and that should probably be addressed

// styles
import 'css/animate_rain.css';
import 'css/animate_water_flow.css';
import 'front-page.css';
import 'page1-styles.css';
import 'pizza-styles.css';
import 'styles.css';
// js
import 'eata-the-pizza.js';
import 'front-page.js';
import 'page1.js';
import 'utils.js';
// sounds
import "duck_sounds/1/funny-story.mp3";
import "duck_sounds/1/journey-to-the-sun.mp3";
import "duck_sounds/1/positive-way.mp3";
import "duck_sounds/1/spring-upbeat.mp3";
import "duck_sounds/1/that-good-feeling.mp3";
import "duck_sounds/1/upbeat-funky-retro.mp3";
import "duck_sounds/1/upbeat-summer-pop.mp3";

import ReactDOM from 'react-dom/client';
import React from 'react';

// Generates the Header and Footer of each page.
function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="https://tydavisportfolio.wordpress.com">About The Author</a></li>
        <li><a href="https:?/github.com/theTyster/duck_story">The Code</a></li>
        <li><a href="page1.html">Start The Story</a></li>
      </ul>
    </nav>
  );
}

const root = ReactDOM.createRoot(document.getElementById('header'));
root.render(<Navigation />);

// old code
//	const parts = document.querySelectorAll('header, footer');
//
//	for(const i of parts){
//		let nav = document.createElement("nav");
//		let list = document.createElement("ul");
//		let menuLinks = {
//			home: {
//				content: document.createTextNode("Home"),
//				link: "/",
//				isExternal: false
//					},
//			about: {
//				content: document.createTextNode("About The Author"),
//				link: "https://tydavisportfolio.wordpress.com",
//				isExternal: true
//				},
//			code: {
//				content: document.createTextNode("The Code"),
//				link: "https://github.com/theTyster/interactive_story",
//				isExternal: true
//				},
//			story: {
//				content: document.createTextNode("Start The Story"),
//				link: "page1.html",
//				isExternal: false
//			}
//		}
//		for(const i in menuLinks){
//			let anchor = document.createElement("a");
//			let listItem = document.createElement("li");
//			anchor.append(menuLinks[i]["content"]);
//			anchor.setAttribute("href", menuLinks[i]["link"]);
//			menuLinks[i]["isExternal"] ? anchor.setAttribute("rel", "_self") : null;
//			listItem.append(anchor);
//			list.append(listItem);
//		}
//		nav.append(list);
//		i.append(nav);
//		parts[1]
//	}
