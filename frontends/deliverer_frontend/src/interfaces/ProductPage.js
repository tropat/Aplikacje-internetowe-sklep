import React from 'react';
import ProductDetail from '../components/ProductDetail';

const ProductPage = ({auth}) => (
  <div>
    <ProductDetail auth={auth}/>
  </div>
);

export default ProductPage;
