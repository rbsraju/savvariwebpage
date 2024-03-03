

import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://localhost:7000/api/Ride/', // replace with your API base URL
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('tokenCookie'); // replace with your actual cookie name

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
