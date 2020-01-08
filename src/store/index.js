import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userPosition: null,
    activeSectionId: 0,
    formSections: {
      init: { id: 0, isSuccess: false },
      basic: { id: 1, isSuccess: false },
      spills: { id: 2, isSuccess: false },
      waste: { id: 3, isSuccess: false },
      habitat: { id: 4, isSuccess: false },
      ecosystem: { id: 5, isSuccess: false },
      bioQuality: { id: 6, isSuccess: false },
      riverQuality: { id: 7, isSuccess: false },
      ecoResult: { id: 8, isSuccess: false }
    }
  },
  getters: {
    isFirstSection: state => {
      return state.activeSectionId === 0;
    },
    isLastSection: state => {
      return (
        state.activeSectionId === Object.keys(state.formSections).length - 1
      );
    }
  },
  mutations: {
    [types.SET_USER_POSITION](state, position) {
      state.userPosition = position;
    },
    [types.SET_ACTIVE_SECTION](state, sectionId) {
      state.activeSectionId = sectionId;
    }
  },
  actions: {
    setActiveSection(context, sectionId) {
      context.commit(types.SET_ACTIVE_SECTION, sectionId);
    },
    setUserPosition(context, device) {
      context.commit(types.SET_USER_POSITION, device);
    }
  },
  modules: {}
});
