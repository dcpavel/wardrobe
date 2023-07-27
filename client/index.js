import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
import ErrorPage from './static/ErrorPage';
import Login, {
  action as loginAction
} from './containers/Login';
import Landing from './containers/Landing';
import Signup from './containers/Signup';
import Wardrobes, {
  loader as wardrobesLoader,
  action as wardrobesAction
} from './containers/Wardrobes';
import Wardrobe, {
  loader as wardrobeLoader,
  action as wardrobeAction
} from './components/Wardrobe';
import User from './components/User';
import Clothes, {
  loader as clothesLoader
} from './containers/Clothes';

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
        action: loginAction
      },
      {
        element: <Signup />,
        path: "/signup"
      },
      {       
        path: "/wardrobes/:userid",
        element: <Wardrobes />,
        loader: wardrobesLoader,
        action: wardrobesAction
      },
      {
        path: "/wardrobe/edit/",
        element: <Wardrobe />,
        loader: wardrobeLoader,
        action: wardrobeAction
      },
      {
        path: "/wardrobe/edit/:id",
        element: <Wardrobe />,
        loader: wardrobeLoader,
        action: wardrobeAction
      },
      {
        element: <User />,
        path: "/user/:userId"
      },
      {
        path: "/clothes/:wardrobeid",
        element: <Clothes />,
        loader: clothesLoader
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