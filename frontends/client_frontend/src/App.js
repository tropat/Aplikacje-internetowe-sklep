import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { createOrder } from './api/api';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [auth, setAuth] = useState({user_id: localStorage.getItem('user_id'), accessToken: localStorage.getItem('token')});

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const onBuy = async (address) => {
    try {
      if (!address.trim()) {
        alert('Please enter your address.');
        return;
      }

      const order = {
        user_id: auth?.user_id,
        products: cartItems.map(item => item.id),
        address: address,
      };

      const response = await createOrder(order, auth?.accessToken);

      if (response.ok) {
        setCartItems([]);
        console.log(response);
        alert('The order was successful!');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error.message);
      alert(`Error placing order: ${error.message}`);
    }
  };

  return (
      <Router>
        <Navbar auth={auth} setAuth={setAuth} />
        <Routes>
          <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute auth={auth}><HomePage auth={auth}/></PrivateRoute>} />
          <Route path="/products/:id" element={<ProductPage auth={auth} addToCart={addToCart} />} />
          <Route path="/cart" element={<PrivateRoute auth={auth}><CartPage cartItems={cartItems} removeFromCart={removeFromCart} onBuy={onBuy} /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute auth={auth}><OrdersPage auth={auth}/></PrivateRoute>} />
        </Routes>
      </Router>
  );
};

const PrivateRoute = ({ auth, children }) => {
  return auth ? children : <Navigate to="/login" />;
};

export default App;
