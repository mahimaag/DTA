import React  from 'react';
import { render } from 'react-dom';
import store from './app/store';
import { Provider } from 'react-redux';


/**
 * Get and set application code...
 */
import App from './app';

// Create app component
const app = document.querySelector('#root');

// Render main application
render(<Provider store={store}><App /></Provider>, app);

