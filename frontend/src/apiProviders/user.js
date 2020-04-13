import generateAxios from 'config/axios';
import normalize from 'json-api-normalizer';

const axios = generateAxios('user');

const getUser = async () => {
  const res = await axios({
    method: 'get',
    url: '/whoami',
  });

  return Object.values(normalize(res.data).user)[0];
};

const fetchAllAsAdmin = async () => {
  const res = await axios({
    method: 'get',
    url: '/',
  });
  return { users: normalize(res.data).user };
};

const editUser = async ({ id, username, role }) => {
  const res = await axios({
    method: 'put',
    url: `/${id}`,
    data: { username, role },
  });
  return { users: normalize(res.data).user };
};

const deleteUser = ({ id }) =>
  axios({
    method: 'delete',
    url: `/${id}`,
  });

export default {
  getUser,
  editUser,
  deleteUser,
  fetchAllAsAdmin,
};
