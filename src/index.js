import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// Renders the main component onto the only body's div
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
