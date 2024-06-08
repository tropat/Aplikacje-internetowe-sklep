import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/api';
import '../App.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await register({ username, password, role: 'client' });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Error registering');
        alert(errorData.error || 'Error registering');
      } else {
        const data = await response.json();
        if (data.message === 'Registration successful') {
          alert('Registration successful. Please log in.');
          navigate('/login');
        } else {
          setError('Error registering');
          alert('Error registering');
        }
      }
    } catch (error) {
      console.log('Registration error:', error);
      setError('Error registering');
      alert('Error registering');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
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
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
