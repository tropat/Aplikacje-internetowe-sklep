import React, { useEffect, useState } from 'react';
import { fetchOrders, fetchProductById } from '../api/api.js';
import { Link } from 'react-router-dom';
import '../style/OrderHistory.css';

const OrdersPage = ({ auth }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productPrices, setProductPrices] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrders(auth?.accessToken, auth?.user_id);
        if (!response.ok) {
          const errorData = await response.json();
          console.log('Error fetching orders:', errorData.error || 'Failed to retrieve orders');
        } else {
          const ordersData = await response.json();
          setOrders(ordersData.reverse());
          await fetchProductPrices(ordersData);
        }
      } catch (error) {
        console.log('Error caught fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [auth?.accessToken, auth?.user_id]);

  const fetchProductPrices = async (orders) => {
    const prices = {};
    for (const order of orders) {
      for (const product of order.products) {
        const productId = product.id;
        if (!prices[productId]) {
          try {
            const response = await fetchProductById(productId, auth?.accessToken);
            if (!response.ok) {
              const errorData = await response.json();
              console.log('Error fetching products:', errorData.error || 'Failed to retrieve products');
            } else {
              const productDetails = response.json();
              prices[productId] = productDetails.price;
            }
          } catch (error) {
            console.log('Error caught fetching orders:', error);
          }
        }
      }
    }
    setProductPrices(prices);
  };

  const groupProductsById = (products) => {
    const productCounts = products.reduce((acc, product) => {
      if (acc[product.id]) {
        acc[product.id].quantity += 1;
      } else {
        acc[product.id] = { ...product, quantity: 1 };
      }
      return acc;
    }, {});

    return Object.values(productCounts);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="order-history-container">
        <h2>Order History</h2>
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You don't have any orders yet.</p>
            <Link to="/" className="link-to-products">Look for products you might like</Link>
          </div>
        ) : (
          <ul className="order-list">
            {orders.map(order => (
              <li key={order.id} className="order-item">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Total Amount:</strong> ${order.total_amount}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Date and Time:</strong> {new Date(order.datetime).toLocaleString()}</p>
                <p><strong>Status:</strong> {order.order_status}</p>
                <p><strong>Products:</strong></p>
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupProductsById(order.products).map(product => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>${(productPrices[product.id] || 0).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
