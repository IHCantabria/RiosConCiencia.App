import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    userPosition: null,
    activeSectionId: 0,
    formSections: {}
  },
  getters: {
    isFirstSection: state => {
      return state.activeSectionId === 0;
    },
    isLastSection: state => {
      return (
        state.activeSectionId === Object.keys(state.formSections).length - 1
      );
    },
    activeSectionName: state => {
      return Object.keys(state.formSections)[state.activeSectionId];
    }
  },
  mutations: {
    [types.LOAD_FORM_DATA](state, formData) {
      state.formSections = formData;
    },
    [types.SET_USER_POSITION](state, position) {
      state.userPosition = position;
    },
    [types.SET_ACTIVE_SECTION](state, sectionId) {
      state.activeSectionId = sectionId;
    },
    [types.SET_ACTIVE_USER](state, user) {
      state.user = user;
    }
  },
  actions: {
    setActiveUser(context, user) {
      context.commit(types.SET_ACTIVE_USER, user);
    },
    loadFormData(context, formData) {
      context.commit(types.LOAD_FORM_DATA, formData);
    },
    setActiveSection(context, sectionId) {
      context.commit(types.SET_ACTIVE_SECTION, sectionId);
    },
    setUserPosition(context, device) {
      context.commit(types.SET_USER_POSITION, device);
    }
  },
  modules: {}
});
