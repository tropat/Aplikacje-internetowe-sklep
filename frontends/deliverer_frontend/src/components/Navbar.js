import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = ({ auth, setAuth }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        setAuth(null);
        navigate('/login');
    };

    return(
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/packages">All Packages</Link></li>
          <li><Link to="/my_packages">My Packages</Link></li>
            {auth ? (
                <li>
                    <Link onClick={handleLogout}>Logout</Link>
                </li>
            ) : (
                <li><Link to="/login">Login</Link></li>
            )}
        </ul>
      </nav>
    );
}

export default Navbar;