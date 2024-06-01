import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/api.js';
import '../style/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProductById(id);
      setProduct(product);
    };
    getProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>
      <p className="quantity">Quantity: {product.quantity}</p>
    </div>
  );
};

export default ProductDetail;
