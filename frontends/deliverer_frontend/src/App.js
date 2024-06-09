import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './interfaces/HomePage';
import ProductPage from './interfaces/ProductPage';
import PackagesPage from './interfaces/PackagesPage';
import MyPackagesPage from './interfaces/MyPackagesPage';
import LoginPage from './interfaces/LoginPage';

const App = () => {
  const [auth, setAuth] = useState({user_id: localStorage.getItem('user_id'), accessToken: localStorage.getItem('token')});

  return (
    <Router>
      <Navbar auth={auth} setAuth={setAuth}/>
      <Routes>
        <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
        <Route path="/" element={<PrivateRoute auth={auth}><HomePage auth={auth}/></PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute auth={auth}><ProductPage auth={auth} /></PrivateRoute>} />
        <Route path="/packages" element={<PrivateRoute auth={auth}><PackagesPage auth={auth} /></PrivateRoute>}/>
        <Route path="/my_packages" element={<PrivateRoute auth={auth}><MyPackagesPage auth={auth} /></PrivateRoute>}/>
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ auth, children }) => {
    return auth ? children : <Navigate to="/login" />;
};

export default App;
