import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/api.js';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
    };
    getOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order #{order.id} - Total: ${order.total_amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
