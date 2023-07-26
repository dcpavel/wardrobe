import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HeaderLogin = () => {
  const linksArr = [
    ['Home', '/'],
    ['About', '/about'],
  ];

  const links = [];
  for (const link of linksArr) {
    const [title, path] = link;
    links.push(
      <li key={title}>
        {title}
        {/* <Link to={path}>{title}</Link> */}
      </li>
    );
  }
  console.log(links);

  return(
    <ul id="headerLinks">
      {links}    
    </ul>
  );
};

export default HeaderLogin;