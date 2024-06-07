import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api/api.js';
import '../style/OrderHistory.css';

const OrdersPage = ({ auth }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrders(auth?.accessToken, auth?.user_id);

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.error || 'Failed to retrieve orders');
          console.log('Error fetching orders:', errorData.error || 'Failed to retrieve orders');
        } else {
          const ordersData = await response.json();
          setOrders(ordersData.reverse());
        }
      } catch (error) {
        alert('Failed to retrieve orders');
        console.log('Error caught fetching orders:', error);
      }
    };
    getOrders();
  }, [auth?.accessToken, auth?.user_id]);

  return (
    <div>
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
    </div>
  );
};

export default OrdersPage;
