import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ cartItems, removeFromCart, onBuy, updateCartQuantity }) => (
  <div>
    <Cart cartItems={cartItems} removeFromCart={removeFromCart} onBuy={onBuy} updateCartQuantity={updateCartQuantity} />
  </div>
);

export default CartPage;
