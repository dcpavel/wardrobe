
import React from 'react';
import { Outlet } from 'react-router-dom';

import HeaderNav from './HeaderNav';
import Footer from './Footer';

export default function App() {
  return (
    <div>
      <HeaderNav />
      <Outlet />
      <Footer />
    </div>
  );
}