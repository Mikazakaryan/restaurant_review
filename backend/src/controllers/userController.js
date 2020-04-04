const axios = require('axios');

const { DB_HOST } = process.env;

const getUserByKey = ({ userKey }) => {
  return axios.get(`${DB_HOST}/user/${userKey}`);
};

module.exports = {
  getUserByKey,
};
