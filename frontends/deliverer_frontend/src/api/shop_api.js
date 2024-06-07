const API_URL = 'http://localhost:3320';

const handleResponse = async (response) => {
  if (response.status === 401) {
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }
  return response.json();
};

export const fetchProductById = async (id, token) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
      headers: {
      'authorization': `Bearer ${token}`
      }
  });
  return handleResponse(response);
};

export const updateOrderStatus = async (id, status, token) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: {
      'authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(status)
  });
  return handleResponse(response);
};
