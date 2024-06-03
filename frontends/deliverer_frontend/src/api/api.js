const API_URL = 'http://localhost:3321';

export const fetchProducts = async (token) => {
  const response = await fetch(`${API_URL}/products`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const fetchProductById = async (id, token) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const fetchPackages = async (token) => {
  const response = await fetch(`${API_URL}/packages`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const fetchPackageById = async (id, token) => {
  const response = await fetch(`${API_URL}/packages/${id}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const fetchPackagesByDelivererId = async (id, token) => {
  const response = await fetch(`${API_URL}/packages/deliverer/${id}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const createPackage = async (new_package, token) => {
  const response = await fetch(`${API_URL}/packages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(new_package)
  });
  return response.json();
};

export const updatePackageStatus = async (id, status, token) => {
  const response = await fetch(`${API_URL}/packages/status/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({status})
  });
  return response.json();
};

export const updatePackageDeliverer = async (id, deliverer_id, token) => {
  const response = await fetch(`${API_URL}/packages/deliverer/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({deliverer_id})
  });
  return response.json();
};

export const deletePackageById = async (id, token) => {
  const response = await fetch(`${API_URL}/packages/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`http://localhost:3322/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  return response.json();
};