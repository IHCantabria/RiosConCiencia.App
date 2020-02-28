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
    activeFormId: 0, // formExpert == 0, formPicts == 1
    formExpertSections: {},
    formPictsSections: {}
  },
  getters: {
    isExpertDataLoaded: state => {
      return Object.keys(state.formExpertSections).length !== 0;
    },
    isPictsDataLoaded: state => {
      return Object.keys(state.formPictsSections).length !== 0;
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
    activeSectionName: state => {
      return state.activeFormId == 0
        ? Object.keys(state.formExpertSections)[state.activeSectionId]
        : Object.keys(state.formPictsSections)[state.activeSectionId];
    },
    isFormExpertValid: state => {
      return (
        state.formExpertSections.biological.isValid &&
        state.formExpertSections.init.isValid &&
        state.formExpertSections.basic.isValid &&
        state.formExpertSections.habitat.isValid &&
        state.formExpertSections.ecoSystem.isValid &&
        state.formExpertSections.riverQuality.isValid
      );
    },
    isFormPictsValid: state => {
      return (
        state.formPictsSections.flow.isValid &&
        state.formPictsSections.init.isValid
      );
    },
    isStateEcoReady: state => {
      return (
        checkNestedProperty(
          state.formExpertSections.riverQuality,
          "results.qrisiIndex"
        ) &&
        checkNestedProperty(
          state.formExpertSections.biological,
          "results.bioQualityIndex"
        )
      );
    }
  },
  mutations: {
    [types.LOAD_EXPERT_FORM_DATA](state, formData) {
      for (const name of Object.keys(formData)) {
        Vue.set(state.formExpertSections, name, formData[name]);
      }
    },
    [types.LOAD_PICTS_FORM_DATA](state, formData) {
      for (const name of Object.keys(formData)) {
        Vue.set(state.formPictsSections, name, formData[name]);
      }
    },
    [types.SET_USER_POSITION](state, position) {
      state.userPosition = position;
    },
    [types.SET_ACTIVE_SECTION](state, sectionId) {
      state.activeSectionId = sectionId;
    },
    [types.SET_ACTIVE_FORM](state, formId) {
      state.activeFormId = formId;
    },
    [types.SET_ACTIVE_USER](state, user) {
      state.user = user;
    },
    [types.SET_RIVER_SECTIONS_USER](state, userRiverSections) {
      state.userRiverSections = userRiverSections;
    },
    [types.SET_EXPERT_SECTION_STATE](state, payload) {
      state.formExpertSections[payload.name].isValid = payload.isValid;
    },
    [types.SET_PICTS_SECTION_STATE](state, payload) {
      state.formPictsSections[payload.name].isValid = payload.isValid;
    },
    [types.UPDATE_EXPERT_SECTION_VALUES](state, payload) {
      Vue.set(state.formExpertSections[payload.name], "results", {
        ...payload.values
      });
      Vue.set(
        state.formExpertSections[payload.name],
        "isValid",
        payload.isValid
      );
    },
    [types.UPDATE_PICTS_SECTION_VALUES](state, payload) {
      Vue.set(state.formPictsSections[payload.name], "results", {
        ...payload.values
      });
      Vue.set(
        state.formPictsSections[payload.name],
        "isValid",
        payload.isValid
      );
    },
    [types.DELETE_EXPERT_SECTION_VALUES](state) {
      Object.keys(state.formExpertSections).forEach(section => {
        Vue.set(state.formExpertSections[section], "results", {});
        Vue.set(state.formExpertSections[section], "isValid", false);
      });
    },
    [types.DELETE_PICTS_SECTION_VALUES](state) {
      Object.keys(state.formPictsSections).forEach(section => {
        Vue.set(state.formPictsSections[section], "results", {});
        Vue.set(state.formPictsSections[section], "isValid", false);
      });
    }
  },
  actions: {
    setActiveUser(context, user) {
      context.commit(types.SET_ACTIVE_USER, user);
    },
    setActiveForm(context, formId) {
      context.commit(types.SET_ACTIVE_FORM, formId);
    },
    loadRiverSections(context, riverSections) {
      context.commit(types.SET_RIVER_SECTIONS_USER, riverSections);
    },
    loadExpertFormData(context, formData) {
      context.commit(types.LOAD_EXPERT_FORM_DATA, formData);
    },
    loadPictsFormData(context, formData) {
      context.commit(types.LOAD_PICTS_FORM_DATA, formData);
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
    setPictsSectionState(context, payload) {
      const params = {
        name: payload.name,
        isValid: payload.isValid
      };
      context.commit(types.SET_PICTS_SECTION_STATE, params);
    },
    updateSectionValues(context, payload) {
      const params = {
        name: context.getters.activeSectionName,
        ...payload
      };
      context.commit(types.UPDATE_EXPERT_SECTION_VALUES, params);
    },
    updateSpecificExpertSectionValues(context, payload) {
      context.commit(types.UPDATE_EXPERT_SECTION_VALUES, payload);
    },
    updateSpecificPictsSectionValues(context, payload) {
      context.commit(types.UPDATE_PICTS_SECTION_VALUES, payload);
    },
    clearPictsFormResponses(context) {
      context.commit(types.SET_ACTIVE_SECTION, 0);
      context.commit(types.DELETE_PICTS_SECTION_VALUES);
    },
    clearExpertFormResponses(context) {
      context.commit(types.SET_ACTIVE_SECTION, 0);
      context.commit(types.DELETE_EXPERT_SECTION_VALUES);
    },
    clearRiverSections(context) {
      context.commit(types.SET_RIVER_SECTIONS_USER, []);
    }
  },
  modules: {}
});
