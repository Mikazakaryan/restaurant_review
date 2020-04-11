import axios from 'axios';
import get from 'lodash/get';
import Cookies from 'universal-cookie';

import { backendUrl as baseURL } from './constants';

const axiosConfig = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

axiosConfig.interceptors.response.use(
  response => response,
  error => {
    const is401 = get(error, ['response', 'status']) === 401;

    if (is401) {
      const cookies = new Cookies();
      cookies.remove('sid');
      window.location.href = '/';
    } else {
      alert(get(error, ['response', 'data', 'errorMessage']));
    }

    return Promise.reject(error);
  },
);

export default axiosConfig;
