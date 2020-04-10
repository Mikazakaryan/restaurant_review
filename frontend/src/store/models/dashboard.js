import userApi from '../../apiProviders/user';
import restaurantsApi from '../../apiProviders/restaurants';

const defaultState = {
  userList: {},
  rateList: {},
  replyList: {},
  restaurantList: {},
};

export default {
  state: { ...defaultState },
  reducers: {
    setUserList: (state, userList) => ({
      ...state,
      userList,
    }),
    setRateList: (state, rateList) => ({
      ...state,
      rateList,
    }),
    setReplyList: (state, replyList) => ({
      ...state,
      replyList,
    }),
    setRestaurantList: (state, restaurantList) => ({
      ...state,
      restaurantList,
    }),
    clearState: () => ({ ...defaultState }),
  },
  effects: dispatch => ({
    async fetchAllAsAdmin() {
      const { users } = await userApi.fetchAllAsAdmin();
      this.setUserList(users);
      const {
        rates,
        replies,
        restaurants,
      } = await restaurantsApi.fetchAllAsAdmin();
      this.setRateList(rates);
      this.setReplyList(replies);
      this.setRestaurantList(restaurants);
    },

    async editUser({ id, username, role }) {
      const { users } = await userApi.editUser({ id, username, role });
      this.setUserList(users);
    },

    async deleteUser({ id }) {
      const { users } = await userApi.deleteUser({ id });
      this.setUserList(users);
    },
  }),
};