import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './interfaces/HomePage';
import ProductPage from './interfaces/ProductPage';
import CartPage from './interfaces/CartPage';
import OrdersPage from './interfaces/OrdersPage';
import LoginPage from './interfaces/LoginPage';
import RegisterPage from './interfaces/RegisterPage';
import { createOrder, fetchOrders, fetchProducts, fetchProductById } from './api/api';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [auth, setAuth] = useState(null);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const onBuy = async () => {
    try {
      const orders = await fetchOrders(auth?.accessToken);
      const maxId = orders.length > 0 ? Math.max(...orders.map(order => order.id)) : 0;
      const newOrderId = maxId + 1;

      const order = {
        user_id: newOrderId,
        products: cartItems.map(item => item.id),
        address: '123 Main Street, Warsaw, Poland'
      };

      console.log('Order:', order);

      const response = await createOrder(order, auth?.accessToken);
      console.log('Server Response:', response);

      if (response) {
        setCartItems([]);
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
