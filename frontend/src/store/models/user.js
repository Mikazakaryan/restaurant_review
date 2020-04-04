import userApi from '../../apiProviders/user';
import localStorage from '../../utils/localStorage';

const defaultState = {
  user: localStorage.getObject('user') || {},
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
    async fetchUser() {},
    async login({ username, password }) {
      const user = await userApi.login({ username, password });
      localStorage.setObject('user', user);

      this.setUser(user);
    },
    async signup(props) {
      const user = await userApi.signup(props);

      this.setUser(user);
    },
    async logOut() {
      localStorage.clear();

      Object.values(dispatch).forEach(model => {
        if (model.clearState) {
          model.clearState();
        }
      });
    },
  }),
};
