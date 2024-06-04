import React from 'react';
import ProductDetail from '../components/ProductDetail';

const ProductPage = ({ auth, addToCart }) => (
  <div>
    <ProductDetail token={auth?.accessToken} addToCart={addToCart} />
  </div>
);

export default ProductPage;
