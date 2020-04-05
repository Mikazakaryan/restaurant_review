import axios from 'axios';
import normalize from 'json-api-normalizer';

import { backendUrl as baseUrl } from '../config/constants';

const fetchAll = async ({ userKey }) => {
  const res = await axios({
    method: 'get',
    url: `${baseUrl}/restaurant?userKey=${userKey}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const normalizedUser = normalize(res.data);

  return { userRestaurantList: normalizedUser.userRestaurantList || {} };
};

const rateRestaurant = async ({ feedback, userKey, restaurantId }) => {
  const res = await axios({
    method: 'post',
    url: `${baseUrl}/restaurant/rate/${restaurantId}`,
    data: { feedback, userKey },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const normalizedUser = normalize(res.data);

  return { userRestaurantList: normalizedUser.userRestaurantList || {} };
};

export default {
  fetchAll,
  rateRestaurant,
};
