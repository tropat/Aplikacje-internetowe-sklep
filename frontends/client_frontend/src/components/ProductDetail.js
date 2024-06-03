import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/api.js';
import '../style/ProductDetail.css';

const ProductDetail = ({ token, addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProductById(id, token);
      setProduct(product);
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  if (!product) return <div>Loading...</div>;

  return (
      <div className="product-detail-container">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p className="price">Price: ${product.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        {showPopup && <div className="popup">Item added to cart!</div>}
      </div>
  );
};

export default ProductDetail;
