const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (req.user) {
      console.log(req.user.username);
      commit("user/setUser", req.user.username);
    }
  }
};

export { actions };
