import axios from '../config/axios';
import normalize from 'json-api-normalizer';

const fetchAll = async () => {
  const res = await axios({
    method: 'get',
    url: '/restaurant/allForUser',
  });

  const normalizedUser = normalize(res.data);

  return {
    rate: normalizedUser.rate || {},
    userRestaurantList: normalizedUser.userRestaurantList || {},
  };
};

const rateRestaurant = async ({ feedback, restaurantId }) => {
  const res = await axios({
    method: 'post',
    url: `/restaurant/rate`,
    data: { ...feedback, restaurantKey: restaurantId },
  });

  const normalizedUser = normalize(res.data);

  return {
    rate: normalizedUser.rate || {},
    userRestaurantList: normalizedUser.userRestaurantList || {},
  };
};

export default {
  fetchAll,
  rateRestaurant,
};
