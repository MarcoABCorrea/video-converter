import React from 'react';
import Nav from './Nav';

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
