import React from 'react';
import '../style/Cart.css';

const Cart = ({ cartItems, removeFromCart, onBuy }) => {
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleBuy = () => {
    onBuy();
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
      <button className="buy-button" onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default Cart;