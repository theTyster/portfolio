import ReactDOM from 'react-dom/client';
import React from 'react';
import './assets/css/nav.scss';
import Navigation from './nav.jsx';
import Credit from './credit.jsx';


const header = ReactDOM.createRoot(document.querySelector('header'));
header.render(<Navigation />)

const footer = ReactDOM.createRoot(document.querySelector('footer'));
footer.render(<Credit />)
