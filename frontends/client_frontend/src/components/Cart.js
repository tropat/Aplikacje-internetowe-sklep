import React, { useState } from 'react';
import '../style/Cart.css';

const Cart = ({ cartItems, removeFromCart, onBuy }) => {
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [address, setAddress] = useState('');
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleBuyClick = () => {
    if (parseFloat(totalAmount) === 0 || address.trim() === '') {
      setShowEmptyMessage(true);
    } else {
      onBuy(address);
    }
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="total-amount">Total: ${totalAmount}</p>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter your address"
        className="address-input"
        required
      />
      {showEmptyMessage && <p className="empty-cart-message">Cart is empty or address is missing</p>}
      <button className="buy-button" onClick={handleBuyClick}>Buy</button>
    </div>
  );
};

export default Cart;
