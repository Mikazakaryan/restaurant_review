import generateAxios from 'config/axios';
import normalize from 'json-api-normalizer';

const axios = generateAxios('rate');

const fetchAll = async () => {
  const res = await axios({
    method: 'get',
    url: '/',
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
  };
};

const rateRestaurant = async ({ feedback, restaurantId }) => {
  const res = await axios({
    method: 'post',
    url: '/',
    data: { ...feedback, restaurantKey: restaurantId },
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
  };
};

const editRate = async ({ id, comment, date, rating }) => {
  const res = await axios({
    method: 'put',
    url: `/${id}`,
    data: { comment, date, rating },
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
  };
};

const deleteRate = ({ id }) =>
  axios({
    method: 'delete',
    url: `/${id}`,
  });

export default {
  fetchAll,
  editRate,
  deleteRate,
  rateRestaurant,
};
