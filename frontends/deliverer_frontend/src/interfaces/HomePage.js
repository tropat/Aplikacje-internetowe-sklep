import React from 'react';
import ProductList from '../components/ProductList';

const HomePage = ({auth}) => (
  <div>
    <ProductList auth={auth} />
  </div>
);

export default HomePage;
