import ratesApi from 'apiProviders/rate';
import repliesApi from 'apiProviders/reply';
import restaurantsApi from 'apiProviders/restaurants';

const defaultState = {
  rates: {},
  restaurantList: null,
};

export default {
  state: { ...defaultState },
  reducers: {
    setRestaurantList: (state, restaurantList) => ({
      ...state,
      restaurantList,
    }),
    setRates: (state, rates) => ({
      ...state,
      rates,
    }),
    clearState: () => ({ ...defaultState }),
  },
  effects: dispatch => ({
    async fetchAllRestaurants() {
      const { restaurant, rate } = await restaurantsApi.fetchAll();

      this.setRates(rate);
      this.setRestaurantList(restaurant);
    },

    async rateRestaurant({ feedback, restaurantId }) {
      await ratesApi.rateRestaurant({ feedback, restaurantId });
      dispatch.restaurants.fetchAllRestaurants(false);
    },

    async createRestaurant({ name }, { restaurants: { restaurantList } }) {
      const { ownerRestaurantList } = await restaurantsApi.createRestaurant({
        name,
      });
      this.setRestaurantList({ ...restaurantList, ...ownerRestaurantList });
    },

    async onReply({ id, text }) {
      await repliesApi.reply({ id, text });
      dispatch.restaurants.fetchAllRestaurants(true);
    },
  }),
};
