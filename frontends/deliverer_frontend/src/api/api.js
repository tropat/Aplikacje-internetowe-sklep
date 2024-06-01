const API_URL = 'http://localhost:3321';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const fetchPackages = async () => {
  const response = await fetch(`${API_URL}/packages`);
  return response.json();
};

export const fetchPackageById = async (id) => {
  const response = await fetch(`${API_URL}/packages/${id}`);
  return response.json();
};

export const fetchPackagesByDelivererId = async (id) => {
  const response = await fetch(`${API_URL}/packages/deliverer/${id}`);
  return response.json();
};

export const createPackage = async (new_package) => {
  const response = await fetch(`${API_URL}/packages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(new_package)
  });
  return response.json();
};

export const updatePackageStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/packages/status/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({status})
  });
  return response.json();
};

export const updatePackageDeliverer = async (id, deliverer_id) => {
  const response = await fetch(`${API_URL}/packages/deliverer/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({deliverer_id})
  });
  return response.json();
};

export const deletePackageById = async (id) => {
  const response = await fetch(`${API_URL}/packages/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};
