import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
import ErrorPage from './static/ErrorPage';
import Login, { loginAction } from './containers/Login';
import Landing from './containers/Landing';
import Signup from './containers/Signup';
import Wardrobe from './components/Wardrobe';
import User from './components/User';
import Clothing from './components/Clothing';
import HeaderNav from './containers/HeaderNav.jsx';

import store from './store';
import './styles/base.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        element: <Landing />,
        path: "/home"
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <Signup />,
        path: "/signup"
      },
      {
        element: <Wardrobe />,
        path: "/wardrobe"
      },
      {
        element: <User />,
        path: "/user/:userId"
      },
      {
        path: "/clothing",
        element: <Clothing />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  // wrap the App in the Provider Component and pass in the store
  <Provider store={store}>
    <RouterProvider router={router}>
    </RouterProvider>
  </Provider>
);