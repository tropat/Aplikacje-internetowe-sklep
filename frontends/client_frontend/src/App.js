import './App.css';
import React, { useState, useEffect } from 'react';
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
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart_items');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [auth, setAuth] = useState({user_id: localStorage.getItem('user_id'), accessToken: localStorage.getItem('token')});
  
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
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
        <Navbar auth={auth} setAuth={setAuth} clearCart={clearCart} />
        <Routes>
          <Route path="/login" element={<LoginPage setAuth={setAuth} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute auth={auth}><HomePage auth={auth}/></PrivateRoute>} />
          <Route path="/products/:id" element={<ProductPage auth={auth} addToCart={addToCart} />} />
          <Route path="/cart" element={<PrivateRoute auth={auth}><CartPage cartItems={cartItems} removeFromCart={removeFromCart} onBuy={onBuy} updateCartQuantity={updateCartQuantity} /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute auth={auth}><OrdersPage auth={auth}/></PrivateRoute>} />
        </Routes>
      </Router>
  );
};

const PrivateRoute = ({ auth, children }) => {
  return auth?.user_id && auth?.accessToken ? children : <Navigate to="/login" />;
};

export default App;
