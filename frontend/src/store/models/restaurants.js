import restaurantsApi from '../../apiProviders/restaurants';

const defaultState = {
  list: {},
  rates: {},
};

export default {
  state: { ...defaultState },
  reducers: {
    setList: (state, list) => ({
      ...state,
      list,
    }),
    setRates: (state, rates) => ({
      ...state,
      rates,
    }),
    clearState: () => ({ ...defaultState }),
  },
  effects: dispatch => ({
    async fetchAllRestaurants() {
      const { userRestaurantList, rate } = await restaurantsApi.fetchAll();
      this.setRates(rate);
      this.setList(userRestaurantList);
    },

    async rateRestaurant({ feedback, restaurantId }) {
      const { userRestaurantList, rate } = await restaurantsApi.rateRestaurant({
        feedback,
        restaurantId,
      });
      this.setRates(rate);
      this.setList(userRestaurantList);
    },
  }),
};
