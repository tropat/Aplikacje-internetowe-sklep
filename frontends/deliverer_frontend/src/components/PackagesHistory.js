import React, { useEffect, useState } from 'react';
import { fetchPackages, updatePackageDeliverer, deletePackageById } from '../api/api.js';
import { fetchProductById } from '../api/shop_api.js';
import '../style/PackagesHistory.css';

const PackagesHistory = ({ auth }) => {
  const [packages, setPackages] = useState([]);
  const [productPrice, setProductPrice] = useState({});

  useEffect(() => {
    const getPackages = async () => {
      try {
      const response = await fetchPackages(auth?.accessToken);
      const packages = await response.json();
      setPackages(packages);
      await fetchProductPrice(packages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    getPackages();
  }, [auth?.accessToken]);

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

  const handleUpdatePackageDeliverer = async (id) => {
    const packageToUpdate = packages.find(pkg => pkg.id === id);

    if (packageToUpdate.deliverer_id !== null) {
      alert('This package is already assigned to a deliverer.');
      return;
    }

    try {
      await updatePackageDeliverer(id, auth?.user_id, auth?.accessToken);
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.id === id ? { ...pkg, deliverer_id: auth?.user_id } : pkg
        )
      );
      alert('Package delivery has been assigned to you.');
      window.location.reload();
    } catch (error) {
      console.error('Error updating package deliverer:', error);
      alert('Failed to update package deliverer. Please try again later.');
    }
  };

  const handleDeletePackageById = async (id) => {
    try {
      await deletePackageById(id, auth?.accessToken);
      alert('Package has been successfully deleted.');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package. Please try again later.');
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

  const NoPackages = () => (
    <div className="no-packages">
      <p>There are no packages yet.</p>
    </div>
  );
  
  const PackagesList = ({ packages, productPrice, handleUpdatePackageDeliverer, handleDeletePackageById, groupProductsById, calculateTotalAmount }) => (
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
              <button className="button-green" onClick={() => handleUpdatePackageDeliverer(pkg.id)}>Assign Delivery</button>
            </div>
            <div className="button-group-right">
              <button className="button-red" onClick={() => handleDeletePackageById(pkg.id)}>Delete Package</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="packages-history-container">
      <h2>Packages History</h2>
      {packages.length === 0 ? (
        <NoPackages />
      ) : (
        <PackagesList
          packages={packages}
          productPrice={productPrice}
          handleUpdatePackageDeliverer={handleUpdatePackageDeliverer}
          handleDeletePackageById={handleDeletePackageById}
          groupProductsById={groupProductsById}
          calculateTotalAmount={calculateTotalAmount}
        />
      )}
    </div>
  );
};

export default PackagesHistory;
