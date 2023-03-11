/* eslint-disable no-param-reassign */
import axios from 'axios';

export const baseUrl = 'https://strapi.cleverland.by';

export const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api/auth/local`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);
