import React from 'react';

const HeaderNav = () => {
  return(
    <header id="navHeader">
      <nav id="pages">
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </nav>
      <nav id="headLogin">
        <a href="/login">Login</a>
      </nav>
    </header>
  );
}

export default HeaderNav;