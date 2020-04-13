import axios from 'axios';
import Cookies from 'universal-cookie';

import { backendUrl as baseURL } from './constants';

const generateAxios = route => {
  const axiosConfig = axios.create({
    baseURL: `${baseURL}/${route}`,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });

  axiosConfig.interceptors.response.use(
    response => response,
    error => {
      const is401 = error?.response?.status === 401;

      if (is401) {
        const cookies = new Cookies();
        cookies.remove('sid');
        window.location.href = '/';
      } else {
        alert(error?.response?.data?.errorMessage);
      }

      return Promise.reject(error);
    },
  );

  return axiosConfig;
};

export default generateAxios;
