const defaultState = {
  users: {},
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
    async logOut() {
      Object.values(dispatch).forEach(model => {
        if (model.clearState) {
          model.clearState();
        }
      });
    },
  }),
};
