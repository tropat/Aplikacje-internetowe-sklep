import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/cart">Cart</Link></li>
      <li><Link to="/orders">Orders</Link></li>
    </ul>
  </nav>
);

export default Navbar;