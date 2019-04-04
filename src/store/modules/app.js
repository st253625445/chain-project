const app = {
  state: {
    chainId: ""
  },
  mutations: {
    SET_CHAINID: (state, id) => {
      state.chainId = id;
    }
  },
  actions: {
    setChainId({ commit }, id) {
      commit("SET_CHAINID", id);
    }
  }
};

export default app;
