import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './interfaces/HomePage';
import ProductPage from './interfaces/ProductPage';
import PackagesPage from './interfaces/PackagesPage';
import MyPackagesPage from './interfaces/MyPackagesPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/packages" element={<PackagesPage />}/>
        <Route path="/my_packages" element={<MyPackagesPage />}/>
      </Routes>
    </Router>
  );
};

export default App;
