import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userPosition: null
  },
  mutations: {
    [types.SET_USER_POSITION](state, position) {
      state.userPosition = position;
    }
  },
  actions: {
    setUserPosition(context, device) {
      context.commit(types.SET_USER_POSITION, device);
    }
  },
  modules: {}
});
