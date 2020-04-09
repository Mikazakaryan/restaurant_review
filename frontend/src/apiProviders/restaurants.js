import axios from '../config/axios';
import normalize from 'json-api-normalizer';

const fetchAll = async () => {
  const res = await axios({
    method: 'get',
    url: '/restaurant/user',
  });

  const normalizedData = normalize(res.data);

  return {
    rate: normalizedData.rate || {},
    userRestaurantList: normalizedData.userRestaurantList || {},
  };
};

const rateRestaurant = async ({ feedback, restaurantId }) => {
  const res = await axios({
    method: 'post',
    url: `/restaurant/user/rate`,
    data: { ...feedback, restaurantKey: restaurantId },
  });

  const normalizedData = normalize(res.data);

  return {
    rate: normalizedData.rate || {},
    userRestaurantList: normalizedData.userRestaurantList || {},
  };
};

const fetchOwnedRestaurants = async () => {
  const res = await axios({
    method: 'get',
    url: `/restaurant/owner`,
  });

  const normalizedData = normalize(res.data);

  return {
    rate: normalizedData.rate || {},
    ownerRestaurantList: normalizedData.ownerRestaurantList || {},
  };
};

const createRestaurant = async ({ name }) => {
  const res = await axios({
    method: 'post',
    data: { name },
    url: `/restaurant/owner/create`,
  });

  const normalizedData = normalize(res.data);

  return {
    rate: normalizedData.rate || {},
    ownerRestaurantList: normalizedData.ownerRestaurantList || {},
  };
};

const reply = async ({ id, text }) => {
  const res = await axios({
    method: 'post',
    data: { id, text },
    url: `/restaurant/owner/reply`,
  });

  const normalizedData = normalize(res.data);

  return {
    rate: normalizedData.rate || {},
    ownerRestaurantList: normalizedData.ownerRestaurantList || {},
  };
};

export default {
  reply,
  fetchAll,
  rateRestaurant,
  createRestaurant,
  fetchOwnedRestaurants,
};
