import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ cartItems, removeFromCart, onBuy }) => (
  <div>
    <Cart cartItems={cartItems} removeFromCart={removeFromCart} onBuy={onBuy}/>
  </div>
);

export default CartPage;
