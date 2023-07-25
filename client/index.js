import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import styles from './styles/app.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)