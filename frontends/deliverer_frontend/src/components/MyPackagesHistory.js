import React, { useEffect, useState } from 'react';
import { fetchPackagesByDelivererId, updatePackageStatus, updatePackageDeliverer } from '../api/api.js';
import '../style/PackagesHistory.css';

const deliverer_id = 2;

const MyPackagesHistory = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackagesByDelivererId = async (id) => {
      const packages = await fetchPackagesByDelivererId(id);
      setPackages(packages);
    };
    getPackagesByDelivererId(deliverer_id);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updatePackageStatus(id, newStatus);
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
      await updatePackageDeliverer(id, null);
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

  return (
    <div className="packages-history-container">
      <h2>My Packages History</h2>
      <ul className="packages-list">
        {packages.map((pkg) => (
          <li key={pkg.id} className="packages-item">
            <p><strong>Package ID:</strong> {pkg.id}</p>
            <p><strong>Address:</strong> {pkg.address}</p>
            <p><strong>Status:</strong> {pkg.delivery_status}</p>
            <p><strong>Products:</strong></p>
            <ul className="product-list">
              {pkg.products.map((product) => (
                <li key={product.id} className="product-item">
                  {product.name}
                </li>
              ))}
            </ul>
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
    </div>
  );
};

export default MyPackagesHistory;
