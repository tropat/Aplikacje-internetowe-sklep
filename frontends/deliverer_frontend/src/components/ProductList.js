import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/api.js';
import '../style/ProductList.css';

const ProductList = ({ auth }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts(auth?.accessToken);
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    getProducts();
  }, [auth?.accessToken]);

  return (
    <div className="product-list-container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <div className="product-info">
              <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              <p className="product-quantity">x{product.quantity} on stock</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
