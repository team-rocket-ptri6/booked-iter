import React from 'react';
// import { render } from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);

root.render(<App />);

// render(<App />, document.getElementById('app'));

