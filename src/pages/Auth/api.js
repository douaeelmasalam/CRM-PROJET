import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL de votre backend
});

// Intercepteur pour injecter le token dans les requêtes
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs globales
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Gérer la déconnexion si le token est invalide
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;