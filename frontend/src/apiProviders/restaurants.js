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

const fetchAllAsAdmin = async () => {
  const res = await axios({
    method: 'get',
    url: `/restaurant/admin`,
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
    replies: normalizedData.reply || {},
    restaurants: normalizedData.restaurant || {},
  };
};

const editReply = async ({ id, text }) => {
  const res = await axios({
    method: 'put',
    data: { id, text },
    url: `/restaurant/admin/reply`,
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
    replies: normalizedData.reply || {},
    restaurants: normalizedData.restaurant || {},
  };
};

const deleteReply = async ({ id }) => {
  const res = await axios({
    method: 'delete',
    data: { id },
    url: `/restaurant/admin/reply`,
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
    replies: normalizedData.reply || {},
    restaurants: normalizedData.restaurant || {},
  };
};

const editRate = async ({ id, comment, date, rating }) => {
  const res = await axios({
    method: 'put',
    url: `/restaurant/admin/rate`,
    data: { id, comment, date, rating },
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
    replies: normalizedData.reply || {},
    restaurants: normalizedData.restaurant || {},
  };
};

const deleteRate = async ({ id }) => {
  const res = await axios({
    method: 'delete',
    data: { id },
    url: `/restaurant/admin/rate`,
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
    replies: normalizedData.reply || {},
    restaurants: normalizedData.restaurant || {},
  };
};

const editRestaurant = async ({ id, name }) => {
  const res = await axios({
    method: 'put',
    data: { id, name },
    url: `/restaurant/admin/restaurant`,
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
    replies: normalizedData.reply || {},
    restaurants: normalizedData.restaurant || {},
  };
};

const deleteRestaurant = async ({ id }) => {
  const res = await axios({
    method: 'delete',
    data: { id },
    url: `/restaurant/admin/restaurant`,
  });

  const normalizedData = normalize(res.data);

  return {
    rates: normalizedData.rate || {},
    replies: normalizedData.reply || {},
    restaurants: normalizedData.restaurant || {},
  };
};

export default {
  reply,
  fetchAll,
  editRate,
  editReply,
  deleteRate,
  deleteReply,
  editRestaurant,
  rateRestaurant,
  fetchAllAsAdmin,
  createRestaurant,
  deleteRestaurant,
  fetchOwnedRestaurants,
};
