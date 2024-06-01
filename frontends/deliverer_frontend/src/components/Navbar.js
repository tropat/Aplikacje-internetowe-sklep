import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/packages">All Packages</Link></li>
      <li><Link to="/my_packages">My Packages</Link></li>
    </ul>
  </nav>
);

export default Navbar;