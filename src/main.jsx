import ReactDOM from 'react-dom/client';
import React from 'react';
import './nav.css'

// Generates the Header and Footer of each page.
function Navigation() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a rel="noreferrer noopener" target="_blank" href="https://tydavisportfolio.wordpress.com">About The Author</a></li>
        <li><a rel="noreferrer noopener" target="_blank" href="https://github.com/theTyster/duck_story">The Code</a></li>
        <li><a href="page1.html">Start The Story</a></li>
      </ul>
    </nav>
  );
}

const header = ReactDOM.createRoot(document.querySelector('header'));
const footer = ReactDOM.createRoot(document.querySelector('footer'));
header.render(<Navigation />);
footer.render(<Navigation />);
