import React from 'react';
import ProductDetail from '../components/ProductDetail';

const ProductPage = ({auth}) => (
  <div>
    <ProductDetail token={auth.accessToken}/>
  </div>
);

export default ProductPage;
