import userApi from 'apiProviders/user';
import ratesApi from 'apiProviders/rate';
import repliesApi from 'apiProviders/reply';
import restaurantsApi from 'apiProviders/restaurants';

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

      const { restaurant } = await restaurantsApi.fetchAll();
      this.setRestaurantList(restaurant);

      const { rates } = await ratesApi.fetchAll();
      this.setRateList(rates);

      const { replies } = await repliesApi.fetchAll();
      this.setReplyList(replies);
    },

    async editUser({ id, username, role }, { dashboard: { userList } }) {
      const { users } = await userApi.editUser({ id, username, role });
      this.setUserList({ ...userList, ...users });
    },

    async deleteUser({ id }, { dashboard: { userList } }) {
      await userApi.deleteUser({ id });
      delete userList[id];
      this.setUserList({ ...userList });
    },

    async editReply({ id, text }, { dashboard: { replyList } }) {
      const { replies } = await repliesApi.editReply({ id, text });

      this.setReplyList({ ...replyList, ...replies });
    },

    async deleteReply({ id }, { dashboard: { replyList } }) {
      await repliesApi.deleteReply({ id });

      delete replyList[id];
      this.setReplyList({ ...replyList });
    },

    async editRate({ id, comment, date, rating }, { dashboard: { rateList } }) {
      const { rates } = await ratesApi.editRate({
        id,
        date,
        rating,
        comment,
      });

      this.setRateList({ ...rateList, ...rates });
    },

    async deleteRate({ id }, { dashboard: { rateList } }) {
      await ratesApi.deleteRate({
        id,
      });

      delete rateList[id];
      this.setRateList({ ...rateList });
    },

    async editRestaurant({ id, name }, { dashboard: { restaurantList } }) {
      const { restaurant } = await restaurantsApi.editRestaurant({
        id,
        name,
      });

      this.setRestaurantList({ ...restaurantList, ...restaurant });
    },

    async deleteRestaurant({ id }, { dashboard: { restaurantList } }) {
      await restaurantsApi.deleteRestaurant({
        id,
      });

      delete restaurantList[id];
      this.setRestaurantList({ ...restaurantList });
    },
  }),
};
