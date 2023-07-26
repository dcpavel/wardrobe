import React from 'react';
import HeaderLogin from '../components/HeaderLogin';
import HeaderLinks from '../components/HeaderLinks';

const HeaderNav = () => {
  return(
    <header>
      <HeaderLinks></HeaderLinks>
      <div id="headerLogo">
      </div>
      <HeaderLogin></HeaderLogin>
    </header>
  );
}

export default HeaderNav;