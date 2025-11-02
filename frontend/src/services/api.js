// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getToken = () => {
  const user = localStorage.getItem('bookstoreUser');
  if (user) {
    try {
      const userData = JSON.parse(user);
      return userData.token;
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name, email, password) => {
    return apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
};

// Books API
export const booksAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/books?${queryString}` : '/books';
    return apiRequest(endpoint);
  },

  getById: async (id) => {
    return apiRequest(`/books/${id}`);
  },

  getByCategory: async (category) => {
    return apiRequest(`/books/category/${category}`);
  },
};

// Cart API
export const cartAPI = {
  get: async () => {
    return apiRequest('/cart');
  },

  add: async (bookId, quantity = 1) => {
    return apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify({ bookId, quantity }),
    });
  },

  update: async (bookId, quantity) => {
    return apiRequest(`/cart/${bookId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  remove: async (bookId) => {
    return apiRequest(`/cart/${bookId}`, {
      method: 'DELETE',
    });
  },

  clear: async () => {
    return apiRequest('/cart', {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersAPI = {
  getAll: async () => {
    return apiRequest('/orders');
  },

  getById: async (id) => {
    return apiRequest(`/orders/${id}`);
  },

  create: async (shippingAddress) => {
    return apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress }),
    });
  },
};

