import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './interfaces/HomePage';
import ProductPage from './interfaces/ProductPage';
import CartPage from './interfaces/CartPage';
import OrdersPage from './interfaces/OrdersPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const onBuy = () => {
    //todo
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={removeFromCart} onBuy={onBuy} />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
