import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    authIsReady: true,
  },
  mutations: {
    setUser(state, payload) {
      if (payload) {
        state.user = { ...state.user, ...payload };
      } else {
        state.user = payload;
      }
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
  },
  actions: {
    async googleLogin({ commit }) {
      console.log("googleLogin action");
      store.commit("setAuthIsReady", false);
      // await api data
      const res = {
        user: {
          email: "test@gmail.com",
          name: "claire",
        },
      };
      if (res) {
        commit("setUser", res.user);
      } else {
        throw new Error("could not complete google login");
      }
      store.commit("setAuthIsReady", true);
    },
    async facebookLogin({ commit }) {
      console.log("facebookLogin action");
      store.commit("setAuthIsReady", false);
      // await api data
      const res = {
        user: {
          fbAvatar: "https://i.pravatar.cc/200?img=42",
        },
      };
      if (res) {
        commit("setUser", res.user);
      } else {
        throw new Error("could not complete facebook login");
      }
      store.commit("setAuthIsReady", true);
    },
    async logout({ commit }) {
      console.log("logout action");
      store.commit("setAuthIsReady", false);
      // await api
      commit("setUser", null);
      store.commit("setAuthIsReady", true);
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  modules: {},
});

export default store;
