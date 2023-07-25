import ReactDOM from 'react-dom/client';
import React from 'react';
import './nav.css'


// Generates the Header and Footer.
function NavButton() {
  const [menuState, menuSet] = React.useState(false);
  const onClick = () => menuState ? menuSet(false) : menuSet(true);
  return (
    <>
      <button className='menuHam' onClick={ onClick }> 
          <svg width="16px" height="16px" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="#6c623a" strokeLinecap="round" strokeWidth="1">
              <path d="m0 4 h16"/>
              <path d="m0 8 h16"/>
              <path d="m0 12 h16"/>
            </g>
          </svg>
      </button>
      { menuState ? <Menu /> : null }
    </>
  );
}


function Menu() {
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


function Credit() {
  return (
    <p>A story by Ty ©️ {new Date().getFullYear()}</p>
  );
}


const header = ReactDOM.createRoot(document.querySelector('header'));
header.render(<NavButton />);

const footer = ReactDOM.createRoot(document.querySelector('footer'));
footer.render(<Credit />)




