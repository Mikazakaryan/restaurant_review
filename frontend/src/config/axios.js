import axios from 'axios';

import { backendUrl as baseURL } from './constants';

export default axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
