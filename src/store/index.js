import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userPosition: null,
    formFields: {
      sections: {
        init: { isSuccess: false },
        basic: { isSuccess: false },
        spills: { isSuccess: false },
        waste: { isSuccess: false },
        habitat: { isSuccess: false },
        ecosystem: { isSuccess: false },
        bioQuality: { isSuccess: false },
        riverQuality: { isSuccess: false },
        ecoResult: { isSuccess: false }
      }
    }
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
