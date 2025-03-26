import axios from "axios";

const userId = 1;

export default {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async loadUser({ commit }) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
        );

        commit("setUser", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
