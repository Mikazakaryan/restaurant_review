import restaurantsApi from '../../apiProviders/restaurants';

const defaultState = {
  list: {},
};

export default {
  state: { ...defaultState },
  reducers: {
    setList: (state, list) => ({
      ...state,
      list,
    }),
    clearState: () => ({ ...defaultState }),
  },
  effects: dispatch => ({
    async fetchAllRestaurants({ userKey }) {
      const { userRestaurantList } = await restaurantsApi.fetchAll({ userKey });
      this.setList(userRestaurantList);
    },

    async rateRestaurant({ userKey, feedback, restaurantId }) {
      const { userRestaurantList } = await restaurantsApi.rateRestaurant({
        feedback,
        userKey,
        restaurantId,
      });
      this.setList(userRestaurantList);
    },
  }),
};
