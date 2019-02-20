import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Root from '@router/router';
import * as serviceWorker from '@pwa/serviceWorker';
import './index.css'

ReactDOM.render(
  <BrowserRouter basename="/">
    <Root/>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.register();
