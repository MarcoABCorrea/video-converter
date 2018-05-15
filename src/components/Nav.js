import React from 'react';
import { Link } from 'react-router';

const Nav = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">Video Converter</Link>
        <Link to="/upload">Upload</Link>
      </div>
    </div>
  </nav>
);

export default Nav;
