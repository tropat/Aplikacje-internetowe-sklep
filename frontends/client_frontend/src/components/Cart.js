import React from 'react';

const Cart = ({ cartItems, removeFromCart, onBuy }) => {
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleBuy = () => {
    onBuy();
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${totalAmount}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default Cart;
