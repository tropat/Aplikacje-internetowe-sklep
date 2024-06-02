import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/api.js';
import '../style/OrderHistory.css';

const OrderHistory = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await fetchOrders(token);
      setOrders(orders.reverse());
    };
    getOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      <ul className="order-list">
        {orders.map(order => (
          <li key={order.id} className="order-item">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Total Amount:</strong> ${order.total_amount}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Date and Time:</strong> {new Date(order.datetime).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.order_status}</p>
            <p><strong>Products:</strong></p>
            <ul className="product-list">
              {order.products.map(product => (
                <li key={product.id} className="product-item">
                  {product.name} - {product.description}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
