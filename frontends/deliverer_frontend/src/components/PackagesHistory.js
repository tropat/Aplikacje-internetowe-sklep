import React, { useEffect, useState } from 'react';
import { fetchPackages, updatePackageDeliverer, deletePackageById } from '../api/api.js';
import '../style/PackagesHistory.css';

const deliverer_id = 2;

const PackagesHistory = ({token, delivererId}) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      console.log(delivererId);
      const packages = await fetchPackages(token);
      setPackages(packages);
    };
    getPackages();
  }, []);

  const handleUpdatePackageDeliverer = async (id, deliverer_id) => {
    const packageToUpdate = packages.find(pkg => pkg.id === id);
  
    if (packageToUpdate.deliverer_id !== null) {
      alert('This package is already assigned to a deliverer.');
      return;
    }
  
    try {
      await updatePackageDeliverer(id, delivererId, token);
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.id === id ? { ...pkg, deliverer_id: delivererId } : pkg
        )
      );
      alert('Package delivery has been assigned to you.');
    } catch (error) {
      console.error('Error updating package deliverer:', error);
      alert('Failed to update package deliverer. Please try again later.');
    }
  };

  const handleDeletePackageById = async (id) => {
    try {
      await deletePackageById(id, token);
      alert('Package has been successfully deleted.');
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package. Please try again later.');
    }
  }; 

  return (
    <div className="packages-history-container">
      <h2>Packages History</h2>
      <ul className="packages-list">
        {packages.map((pkg) => (
          <li key={pkg.id} className="packages-item">
            <p><strong>Package ID:</strong> {pkg.id}</p>
            <p><strong>Deliverer ID:</strong> {pkg.deliverer_id}</p>
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
                <button className="button-green" onClick={() => handleUpdatePackageDeliverer(pkg.id, delivererId)}>Assign Delivery</button>
              </div>
              <div className="button-group-right">
                <button className="button-red" onClick={() => handleDeletePackageById(pkg.id)}>Delete Package</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackagesHistory;
