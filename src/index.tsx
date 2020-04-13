import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/app.scss';

const start = (): void => {
  ReactDOM.render(<App />, document.getElementById('mount'));
};

start();
