/**
 * Car Selection Application - Entry Point
 * 
 * This is the main entry point for the React application.
 * It renders the root App component into the DOM and sets up performance monitoring.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element for React to render into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within StrictMode for additional development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance measurement initialisation
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
