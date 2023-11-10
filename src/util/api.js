import axios from 'axios';
import Cookies from 'js-cookie';
import { isAuthenticated } from './auth';

const api = axios.create({
  // Your API base URL
  baseURL: 'http://localhost:8080',
});

// Add an interceptor to set the 'Authorization' header for each request
api.interceptors.request.use((config) => {
  isAuthenticated()
    .then((result) => {
      if (result) {
        const authToken = Cookies.get('authToken');
        config.headers.Authorization = `Bearer ${authToken}`;
      } else {
        return config;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    return config;
});

export default api;
