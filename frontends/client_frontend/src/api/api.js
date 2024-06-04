const API_URL = 'http://localhost:3320';

const handleResponse = async (response) => {
  if (response.status === 401) {
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  return response.json();
};

export const fetchProducts = async (token) => {
  const response = await fetch(`${API_URL}/products`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
};

export const fetchProductById = async (id, token) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
};

export const fetchOrders = async (token, user_id) => {
  const response = await fetch(`${API_URL}/user/${user_id}`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
};

export const createOrder = async (order, token) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(order)
  });

  return handleResponse(response);
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

export const register = async (credentials) => {
  const response = await fetch(`http://localhost:3322/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  return handleResponse(response);
};