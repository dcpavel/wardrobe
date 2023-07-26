import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
  // wrap the App in the Provider Component and pass in the store
  <Provider store={store}>
    <App />
  </Provider>
);