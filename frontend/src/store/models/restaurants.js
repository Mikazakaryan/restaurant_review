import restaurantsApi from '../../apiProviders/restaurants';

const defaultState = {
  rates: {},
  userList: {},
  ownerList: {},
};

export default {
  state: { ...defaultState },
  reducers: {
    setUserList: (state, userList) => ({
      ...state,
      userList,
    }),
    setRates: (state, rates) => ({
      ...state,
      rates,
    }),
    setOwnerList: (state, ownerList) => ({ ...state, ownerList }),
    clearState: () => ({ ...defaultState }),
  },
  effects: dispatch => ({
    async fetchAllRestaurants() {
      const { userRestaurantList, rate } = await restaurantsApi.fetchAll();
      this.setRates(rate);
      this.setUserList(userRestaurantList);
    },

    async rateRestaurant({ feedback, restaurantId }) {
      const { userRestaurantList, rate } = await restaurantsApi.rateRestaurant({
        feedback,
        restaurantId,
      });
      this.setRates(rate);
      this.setUserList(userRestaurantList);
    },

    async fetchOwnedRestaurants() {
      const {
        rate,
        ownerRestaurantList,
      } = await restaurantsApi.fetchOwnedRestaurants();
      this.setRates(rate);
      this.setOwnerList(ownerRestaurantList);
    },

    async createRestaurant({ name }) {
      const {
        rate,
        ownerRestaurantList,
      } = await restaurantsApi.createRestaurant({ name });
      this.setRates(rate);
      this.setOwnerList(ownerRestaurantList);
    },

    async onReply({ id, text }) {
      const { rate, ownerRestaurantList } = await restaurantsApi.reply({
        id,
        text,
      });
      this.setRates(rate);
      this.setOwnerList(ownerRestaurantList);
    },
  }),
};
