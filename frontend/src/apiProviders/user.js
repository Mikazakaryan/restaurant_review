import axios from 'axios';
import normalize from 'json-api-normalizer';

import { backendUrl as baseUrl } from '../config/constants';

const login = async ({ username, password }) => {
  const res = await axios({
    method: 'post',
    url: `${baseUrl}/user/login`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      username,
      password,
    },
  });

  const normalizedUser = normalize(res.data);

  return {
    user: normalizedUser.user,
  };
};

const signup = async props => {
  const res = await axios({
    method: 'post',
    url: `${baseUrl}/user/signup`,
    data: props,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const normalizedUser = normalize(res.data);

  return {
    user: normalizedUser.user,
  };
};

export default {
  login,
  signup,
};
