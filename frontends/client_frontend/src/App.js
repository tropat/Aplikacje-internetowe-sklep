import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './interfaces/HomePage';
import ProductPage from './interfaces/ProductPage';
import CartPage from './interfaces/CartPage';
import OrdersPage from './interfaces/OrdersPage';
import { createOrder, fetchOrders } from './api/api';

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

  const onBuy = async () => {
    try {
      const orders = await fetchOrders();
      const maxId = orders.length > 0 ? Math.max(...orders.map(order => order.id)) : 0;
      const newOrderId = maxId + 1;

      const order = {
        user_id: newOrderId,
        products: cartItems.map(item => item.id),
        address: '123 Main Street, Warsaw, Poland'
      };

      console.log('Order:', order);

      const response = await createOrder(order);
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
