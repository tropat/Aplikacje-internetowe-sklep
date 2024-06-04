import React from 'react';
import ProductList from '../components/ProductList';

const HomePage = ({ auth }) => (
    <div>
        <ProductList token={auth?.accessToken} />
    </div>
);

export default HomePage;
