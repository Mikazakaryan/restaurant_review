import Cookies from 'universal-cookie';

import userApi from '../../apiProviders/user';

const defaultState = {
  user: {},
};

export default {
  state: { ...defaultState },
  reducers: {
    setUser: (state, user) => ({
      ...state,
      user,
    }),
    clearState: () => ({ ...defaultState }),
  },
  effects: dispatch => ({
    async fetchUser() {
      const userRes = await userApi.getUser();
      this.setUser(userRes);
    },

    async login({ username, password }) {
      try {
        await userApi.login({ username, password });
        await dispatch.user.fetchUser();
      } catch (error) {
        console.log(error);
      }
    },

    async signup(props) {
      try {
        await userApi.signup(props);
        await dispatch.user.fetchUser();
      } catch (error) {
        console.log(error);
      }
    },

    async logOut() {
      await userApi.logout();
      const cookies = new Cookies();
      cookies.remove('sid');
      window.location.href = '/';
      Object.values(dispatch).forEach(model => {
        if (model.clearState) {
          model.clearState();
        }
      });
    },
  }),
};
