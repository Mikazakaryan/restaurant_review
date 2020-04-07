import axios from '../config/axios';
import normalize from 'json-api-normalizer';

const login = ({ username, password }) =>
  axios({
    method: 'post',
    url: '/auth/login',
    data: { username, password },
  });

const signup = props =>
  axios({
    data: props,
    method: 'post',
    url: '/auth/signup',
  });

const getUser = async () => {
  const res = await axios({
    method: 'get',
    url: '/auth/whoami',
  });

  return Object.values(normalize(res.data).user)[0];
};

const logout = () =>
  axios({
    method: 'post',
    url: '/auth/logout',
  });

export default { logout, login, signup, getUser };
