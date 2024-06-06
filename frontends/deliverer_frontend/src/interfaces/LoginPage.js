import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setError('Invalid credentials');
        } else if (response.status === 403) {
          setError('Access forbidden: insufficient role');
        } else {
          setError(errorData.error || 'Error logging in');
        }
        alert(errorData.error || 'Error logging in');
      } else {
        const data = await response.json();
        setAuth({ user_id: data.id, accessToken: data.accessToken });
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user_id', data.id);
        navigate('/');
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
    </div>
  );
};

export default LoginPage;
