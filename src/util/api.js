import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  // Your API base URL
  baseURL: 'http://localhost:8080',
});

// Add an interceptor to set the 'Authorization' header for each request
api.interceptors.request.use((config) => {
  const authToken = Cookies.get('authToken');

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default api;
