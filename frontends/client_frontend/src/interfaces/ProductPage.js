import React from 'react';
import ProductDetail from '../components/ProductDetail';

const ProductPage = ({ addToCart }) => (
  <div>
    <ProductDetail addToCart={addToCart} />
  </div>
);

export default ProductPage;
