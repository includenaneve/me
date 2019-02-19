import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Root from '@router/router';
import * as serviceWorker from '@pwa/serviceWorker';

ReactDOM.render(
  <BrowserRouter basename="/" forceRefresh='true' getUserConfirmation=''>
    <Root/>
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorker.register();
