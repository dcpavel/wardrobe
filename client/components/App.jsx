import React from 'react';
import { createBrowserRouter, RouteProvider} from 'react-router-dom';
import HeaderNav from './HeaderNav';
import MainContainer from './MainContainer';
import Footer from './Footer';
import '../styles/base.scss';

const App = () => {
  return (
    <div>
      <HeaderNav />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default App;