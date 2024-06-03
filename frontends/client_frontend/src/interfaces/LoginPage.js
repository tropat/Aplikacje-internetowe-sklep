import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';
import '../App.css';

const LoginPage = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            if (response.accessToken) {
                setAuth({ username, accessToken: response.accessToken });
                navigate('/');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('Error logging in');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <br />
            <Link to="/register">Don't have an account? Register here</Link>
        </div>
    );
};

export default LoginPage;
