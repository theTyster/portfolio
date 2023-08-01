import ReactDOM from 'react-dom/client';
import React from 'react';
import './css/nav.scss';
import './css/styles.scss';
import Navigation from './utils/nav.jsx';
import Credit from './utils/credit.jsx';


const header = ReactDOM.createRoot(document.querySelector('header'));
header.render(<Navigation />)

const footer = ReactDOM.createRoot(document.querySelector('footer'));
footer.render(<Credit />)
