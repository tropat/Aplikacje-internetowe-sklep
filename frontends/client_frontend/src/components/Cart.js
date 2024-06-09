import React, { useState } from 'react';
import '../style/Cart.css';

const Cart = ({ cartItems, removeFromCart, onBuy, updateCartQuantity }) => {
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);
  const [address, setAddress] = useState('');

  const handleQuantityChange = (id, newQuantity) => {
    updateCartQuantity(id, newQuantity);
  };

  const handleBuyClick = () => {
    if (parseFloat(totalAmount) === 0 || address.trim() === '') {
      setShowEmptyMessage(true);
    } else {
      onBuy(address);
    }
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                >
                  {[...Array(10).keys()].map(num => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
