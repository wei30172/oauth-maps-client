import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      if (payload) {
        state.user = { ...state.user, ...payload };
      } else {
        state.user = payload;
      }
    },
  },
  actions: {},
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  modules: {},
});

export default store;
