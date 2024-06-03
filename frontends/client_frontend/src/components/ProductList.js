import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/api.js';
import '../style/ProductList.css';

const ProductList = ({ token }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await fetchProducts(token);
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };
        getProducts();
    }, [token]);

    return (
        <div className="product-list-container">
            <h2>Products</h2>
                <ul className="product-list">
                    {products.map(product => (
                        <li key={product.id} className="product-item">
                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                        </li>
                    ))}
                </ul>
        </div>
    );
};

export default ProductList;
