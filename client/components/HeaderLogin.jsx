import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderLogin = () => {
  return(
    <span id="headerLogin">
      <Link to="/login">Login</Link>
    </span>
  );
};

export default HeaderLogin;