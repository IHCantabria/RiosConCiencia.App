import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "./plugins/persistent";
import * as types from "./types";
import { checkNestedProperty } from "./../utils/utils";

Vue.use(Vuex);

const plugins = [createPersistedState({})];

export default new Vuex.Store({
  plugins: [...plugins],
  state: {
    user: {},
    userRiverSections: [],
    userPosition: null,
    activeSectionId: 0,
    formExpertSections: {},
    formPicsSections: {}
  },
  getters: {
    isMasterDataLoaded: state => {
      return Object.keys(state.formExpertSections).length !== 0;
    },
    isFirstSection: state => {
      return state.activeSectionId === 0;
    },
    isLastSection: state => formSections => {
      return state.activeSectionId === Object.keys(formSections).length - 1;
    },
    userIsLogged: state => {
      return state.user.token ? true : false;
    },
    activeSectionName: state => formSections => {
      return Object.keys(formSections)[state.activeSectionId];
    },
    isFormValid: state => formSections => {
      return (
        state[formSections].biological.isValid &&
        state[formSections].init.isValid &&
        state[formSections].basic.isValid &&
        state[formSections].habitat.isValid &&
        state[formSections].ecoSystem.isValid &&
        state[formSections].riverQuality.isValid
      );
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
    [types.SET_RIVER_SECTIONS_USER](state, userRiverSections) {
      state.userRiverSections = userRiverSections;
    },
    [types.SET_SECTION_STATE](state, payload) {
      state.formSections[payload.name].isValid = payload.isValid;
    },
    [types.UPDATE_SECTION_VALUES](state, payload) {
      Vue.set(state.formSections[payload.name], "results", {
        ...payload.values
      });
      Vue.set(state.formSections[payload.name], "isValid", payload.isValid);
    },
    [types.DELETE_SECTION_VALUES](state) {
      Object.keys(state.formSections).forEach(section => {
        Vue.set(state.formSections[section], "results", {});
        Vue.set(state.formSections[section], "isValid", false);
      });
    }
  },
  actions: {
    setActiveUser(context, user) {
      context.commit(types.SET_ACTIVE_USER, user);
    },
    loadRiverSections(context, riverSections) {
      context.commit(types.SET_RIVER_SECTIONS_USER, riverSections);
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
    setExpertSectionState(context, payload) {
      const params = {
        name: payload.name,
        isValid: payload.isValid
      };
      context.commit(types.SET_EXPERT_SECTION_STATE, params);
    },
    updateSectionValues(context, payload) {
      const params = {
        name: context.getters.activeSectionName,
        ...payload
      };
      context.commit(types.UPDATE_SECTION_VALUES, params);
    },
    updateSpecificSectionValues(context, payload) {
      context.commit(types.UPDATE_SECTION_VALUES, payload);
    },
    updateSpecificPictSectionValues(context, payload) {
      context.commit(types.UPDATE_PICT_SECTION_VALUES, payload);
    },
    clearFormResponses(context) {
      context.commit(types.SET_ACTIVE_SECTION, 0);
      context.commit(types.DELETE_SECTION_VALUES);
    },
    clearRiverSections(context) {
      context.commit(types.SET_RIVER_SECTIONS_USER, []);
    }
  },
  modules: {}
});
