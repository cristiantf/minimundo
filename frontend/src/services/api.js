import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor: agregar token JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('minimundo_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: manejar errores de respuesta
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
