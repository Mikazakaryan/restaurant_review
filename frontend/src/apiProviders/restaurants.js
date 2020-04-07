import axios from '../config/axios';
import normalize from 'json-api-normalizer';

const fetchAll = async () => {
  const res = await axios({
    method: 'get',
    url: '/restaurant',
  });

  const normalizedUser = normalize(res.data);

  return {
    rate: normalizedUser.rate || {},
    userRestaurantList: normalizedUser.userRestaurantList || {},
  };
};

const rateRestaurant = async ({ feedback, userKey, restaurantId }) => {
  const res = await axios({
    method: 'post',
    url: `/restaurant/rate/${restaurantId}`,
    data: { feedback, userKey },
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
