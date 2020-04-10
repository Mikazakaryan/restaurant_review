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

const fetchAllAsAdmin = async () => {
  const res = await axios({
    method: 'get',
    url: '/auth/all',
  });
  return { users: normalize(res.data).user };
};

const editUser = async ({ id, username, role }) => {
  const res = await axios({
    method: 'put',
    url: '/auth/user',
    data: { id, username, role },
  });
  return { users: normalize(res.data).user };
};

const deleteUser = async ({ id }) => {
  const res = await axios({
    data: { id },
    method: 'delete',
    url: '/auth/user',
  });
  return { users: normalize(res.data).user };
};

export default {
  login,
  logout,
  signup,
  getUser,
  editUser,
  deleteUser,
  fetchAllAsAdmin,
};
