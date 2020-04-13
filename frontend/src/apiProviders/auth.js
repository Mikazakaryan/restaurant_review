import generateAxios from 'config/axios';

const axios = generateAxios('auth');

const login = ({ username, password }) =>
  axios({
    method: 'post',
    url: '/login',
    data: { username, password },
  });

const signup = props =>
  axios({
    data: props,
    method: 'post',
    url: '/signup',
  });

const logout = () =>
  axios({
    method: 'post',
    url: '/logout',
  });

export default {
  login,
  logout,
  signup,
};
