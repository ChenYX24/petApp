const state = {
  current: 0
};

const mutations = {
  setCurrent(state, index) {
    state.current = index;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};