const state = () => ({
  user: ""
});
const mutations = {
  setUser(state, param) {
    state.user = param;
  }
};
const actions = {
  setUser: ({ commit }, param) => {
    commit("setUser", param);
  }
};

export default { state, mutations, actions };
