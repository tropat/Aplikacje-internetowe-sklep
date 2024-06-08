import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = ({ auth, setAuth }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                {auth?.user_id && auth?.accessToken ? (
                    <li>
                        <Link onClick={handleLogout}>Logout</Link>
                    </li>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
