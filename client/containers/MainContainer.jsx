import React from 'react';
import { Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

// import components
import Login from '../components/Login';
import Signup from '../components/Signup';
import Landing from '../routes/Landing';
import Wardrobe from '../components/Wardrobe';
import User from '../components/User';

const MainContainer = () => {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/login"
    },
    {
      element: <Landing />,
      path: "/"
    },
    {
      element: <Signup />,
      path: "/signup"
    },
    {
      element: <Wardrobe />,
      path: "/wardrobe/:wardrobeId"
    },
    {
      element: <User />,
      path: "/user/:userId"
    }
  ]);

  return(
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => (
            <React.Fragment>
              <Login />
            </React.Fragment>
          )}
        />
        <Route exact path="/users/:userId" component={User} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default MainContainer;