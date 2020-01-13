import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userPosition: null,
    activeSectionId: 0,
    formSections: {
      init: { id: 0, isSuccess: false, data: {} },
      basic: { id: 1, isSuccess: false, data: {} },
      spills: { id: 2, isSuccess: false, data: {} },
      waste: { id: 3, isSuccess: false, data: {} },
      habitat: { id: 4, isSuccess: false, data: {} },
      ecosystem: { id: 5, isSuccess: false, data: {} },
      bioQuality: { id: 6, isSuccess: false, data: {} },
      riverQuality: { id: 7, isSuccess: false, data: {} },
      ecoResult: { id: 8, isSuccess: false, data: {} }
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
