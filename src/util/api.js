import axios from 'axios';
import Cookies from 'js-cookie';
import { isAuthenticated } from './auth';

const api = axios.create({
  // Your API base URL
  baseURL: 'http://localhost:8080',
});

// Add an interceptor to set the 'Authorization' header for each request
api.interceptors.request.use(async (config) => {
  try {
    const result = await isAuthenticated();

    if (result) {
      const authToken = Cookies.get('authToken');
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  } catch (error) {
    console.error('Error:', error);
    return Promise.reject(error);
  }
});

export default api;
