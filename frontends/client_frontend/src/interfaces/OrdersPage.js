import React from 'react';
import OrderHistory from '../components/OrderHistory';

const OrdersPage = ({ auth }) => (
  <div>
    <OrderHistory token={auth?.accessToken} />
  </div>
);

export default OrdersPage;
