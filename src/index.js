/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import './css/todo_layout.css'
import './css/todo_style.css'

import ReactReduxFirebaseApp from './store/ReactReduxFirebaseApp.js'

ReactDOM.render(
  <ReactReduxFirebaseApp />, document.getElementById('root')
);