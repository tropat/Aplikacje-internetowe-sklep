import React, { useEffect, useState } from 'react';
import { fetchPackagesByDelivererId, updatePackageStatus, updatePackageDeliverer } from '../api/api.js';
import { fetchProductById } from '../api/shop_api.js';
import { Link } from 'react-router-dom';
import '../style/PackagesHistory.css';

const MyPackagesHistory = ({ auth }) => {
  const [packages, setPackages] = useState([]);
  const [productPrice, setProductPrice] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPackagesByDelivererId = async () => {
      try {
        const response = await fetchPackagesByDelivererId(auth?.user_id, auth?.accessToken);
        const packages = await response.json();
        setPackages(packages);
        await fetchProductPrice(packages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    getPackagesByDelivererId();
  }, [auth?.user_id, auth?.accessToken]);

  const fetchProductPrice = async (packages) => {
    const price = {};
    for (const pkg of packages) {
      for (const product of pkg.products) {
        if (!price[product.id]) {
          const productDetails = await fetchProductById(product.id, auth?.accessToken);
          price[product.id] = productDetails.price;
        }
      }
    }
    setProductPrice(price);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updatePackageStatus(id, newStatus, auth?.accessToken);
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.id === id ? { ...pkg, delivery_status: newStatus } : pkg
        )
      );
    } catch (error) {
      console.error('Error updating package status:', error);
    }
  };

  const handlePackageCancel = async (id) => {
    try {
      await updatePackageDeliverer(id, null, auth?.accessToken);
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.id === id ? { ...pkg, deliverer_id: null } : pkg
        )
      );
      alert('Package delivery has been successfully canceled.');
      window.location.reload();
    } catch (error) {
      console.error('Error updating package deliverer:', error);
      alert('Failed to cancel package delivery. Please try again later.');
    }
  };

  const groupProductsById = (products) => {
    const productCounts = products.reduce((acc, product) => {
      if (acc[product.id]) {
        acc[product.id].quantity += 1;
      } else {
        acc[product.id] = { ...product, quantity: 1 };
      }
      return acc;
    }, {});

    return Object.values(productCounts);
  };

  const calculateTotalAmount = (products) => {
    return products.reduce((total, product) => {
      const price = productPrice[product.id] || 0;
      return total + price * product.quantity;
    }, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const NoPackages = () => (
    <div className="no-packages">
      <p>You don't have any packages assigned to you yet.</p>
      <Link to="/packages" className="link-to-packages">Look for packages</Link>
    </div>
  );
  
  const PackagesList = ({ packages, productPrice, groupProductsById, calculateTotalAmount, handleStatusChange, handlePackageCancel }) => (
    <ul className="packages-list">
      {Array.isArray(packages) && packages.map((pkg) => (
        <li key={pkg.id} className="packages-item">
          <p><strong>Package ID:</strong> {pkg.id}</p>
          <p><strong>Deliverer ID:</strong> {pkg.deliverer_id}</p>
          <p><strong>Address:</strong> {pkg.address}</p>
          <p><strong>Status:</strong> {pkg.delivery_status}</p>
          <p><strong>Products:</strong></p>
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {groupProductsById(pkg.products).map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>${(productPrice[product.id] || 0).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="2"><strong>Total amount</strong></td>
                <td><strong>${calculateTotalAmount(groupProductsById(pkg.products)).toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
          <div className="button-group">
            <div className="button-group-left">
              <button className="button-green" onClick={() => handleStatusChange(pkg.id, 'pending')}>Mark as Pending</button>
              <button className="button-green" onClick={() => handleStatusChange(pkg.id, 'shipped')}>Mark as Shipped</button>
              <button className="button-green" onClick={() => handleStatusChange(pkg.id, 'delivered')}>Mark as Delivered</button>
            </div>
            <div className="button-group-right">
              <button className="button-red" onClick={() => handlePackageCancel(pkg.id)}>Cancel Delivery</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="packages-history-container">
      <h2>My Packages History</h2>
      {packages.length === 0 ? (
        <NoPackages />
      ) : (
        <PackagesList
          packages={packages}
          productPrice={productPrice}
          groupProductsById={groupProductsById}
          calculateTotalAmount={calculateTotalAmount}
          handleStatusChange={handleStatusChange}
          handlePackageCancel={handlePackageCancel}
        />
      )}
    </div>
  );
};

export default MyPackagesHistory;
