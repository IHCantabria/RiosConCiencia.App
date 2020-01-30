import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import { checkNestedProperty } from "./../utils/utils";

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
    userIsLogged: state => {
      return state.user.token ? true : false;
    },
    activeSectionName: state => {
      return Object.keys(state.formSections)[state.activeSectionId];
    },
    isStateEcoReady: state => {
      return (
        checkNestedProperty(
          state.formSections.riverQuality,
          "results.qrisiIndex"
        ) &&
        checkNestedProperty(
          state.formSections.biological,
          "results.bioQualityIndex"
        )
      );
    }
  },
  mutations: {
    [types.LOAD_FORM_DATA](state, formData) {
      for (const name of Object.keys(formData)) {
        Vue.set(state.formSections, name, formData[name]);
      }
    },
    [types.SET_USER_POSITION](state, position) {
      state.userPosition = position;
    },
    [types.SET_ACTIVE_SECTION](state, sectionId) {
      state.activeSectionId = sectionId;
    },
    [types.SET_ACTIVE_USER](state, user) {
      state.user = user;
    },
    [types.UPDATE_SECTION_VALUES](state, payload) {
      Vue.set(state.formSections[payload.name], "results", {
        ...payload.values
      });
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
    },
    updateSectionValues(context, values) {
      const payload = {
        name: context.getters.activeSectionName,
        values: values
      };
      context.commit(types.UPDATE_SECTION_VALUES, payload);
    }
  },
  modules: {}
});
