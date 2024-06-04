import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';
import '../App.css';

const LoginPage = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await login({ username, password });
      if (response.accessToken) {
        setAuth({user_id: response.id, accessToken: response.accessToken });
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user_id', response.id);
        navigate('/');
      } else {
        setError('Invalid credentials');
        alert('Invalid credentials');
      }
    } catch (error) {
      setError('Error logging in');
    }
    setLoading(false);
  };

  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

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
        <button type="submit" disabled={loading}> {loading ? 'Logging in...' : 'Login'} </button>
        {error && <p className="error">{error}</p>}
      </form>
      <br />
      <Link to="/register">Don't have an account? Register here</Link>
    </div>
  );
};

export default LoginPage;
