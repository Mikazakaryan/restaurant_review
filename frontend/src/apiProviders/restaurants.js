import generateAxios from 'config/axios';
import normalize from 'json-api-normalizer';

const axios = generateAxios('restaurant');

const fetchAll = async () => {
  const res = await axios({
    method: 'get',
    url: '/',
  });

  const normalizedData = normalize(res.data);

  return {
    rate: normalizedData.rate || {},
    restaurant: normalizedData.restaurant || {},
  };
};

const createRestaurant = async ({ name }) => {
  const res = await axios({
    method: 'post',
    data: { name },
    url: '/',
  });

  const normalizedData = normalize(res.data);

  return {
    rate: normalizedData.rate || {},
    ownerRestaurantList: normalizedData.ownerRestaurantList || {},
  };
};

const editRestaurant = async ({ id, name }) => {
  const res = await axios({
    method: 'put',
    data: { name },
    url: `/${id}`,
  });

  const normalizedData = normalize(res.data);

  return {
    restaurant: normalizedData.restaurant || {},
  };
};

const deleteRestaurant = ({ id }) =>
  axios({
    method: 'delete',
    url: `/${id}`,
  });

export default {
  fetchAll,
  editRestaurant,
  createRestaurant,
  deleteRestaurant,
};
