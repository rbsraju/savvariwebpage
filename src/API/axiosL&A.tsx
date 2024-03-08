

import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'https://localhost:7151/api/', 
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('tokenCookie'); 

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
