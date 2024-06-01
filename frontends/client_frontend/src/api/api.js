const API_URL = 'http://localhost:3320';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const fetchOrders = async () => {
  const response = await fetch(`${API_URL}/orders`);
  return response.json();
};

export const createOrder = async (order) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });

  return response.json();
};