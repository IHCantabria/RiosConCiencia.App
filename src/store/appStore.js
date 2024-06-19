import { defineStore } from "pinia";
import { checkNestedProperty, canDoExpert, canDoPicts } from "@/utils/utils";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    user: {},
    userRiverSections: [],
    userRiverSectionsPicts: [],
    userPosition: null,
    activeSectionId: 0,
    activeFormId: 0, // formExpert == 0, formPicts == 1
    formExpertSections: {},
    formExpertSent: false,
    formPictsSections: {},
    pictsFormSent: false,
    goodPlantsAbsence: false,
    garbageAbsence: false,
    goodAnimalsAbsence: false,
    isOnline: true,
  }),
  getters: {
    userCanDoExpertForm() {
      return canDoExpert(this.user?.roleId);
    },
    isExpertDataLoaded() {
      return Object.keys(this.formExpertSections).length !== 0;
    },
    isPictsDataLoaded() {
      return Object.keys(this.formPictsSections).length !== 0;
    },
    userCanDoPictsForm() {
      return canDoPicts(this.user?.roleId);
    },
    garbageExist() {
      const results = this.formPictsSections.garbage?.results?.waterGarbage;
      return results ? results.length > 0 : false;
    },
    isColorGood() {
      const results = this.formPictsSections.color?.results?.waterColor;
      return results ? results.isGood : true;
    },
    isSmellGood() {
      const results = this.formPictsSections.smell?.results?.waterSmell;
      return results ? results.isGood : true;
    },
    badPlants() {
      const results = this.formPictsSections.plants?.results?.waterPlants;
      return results ? results.filter((plant) => !plant.isGood) : [];
    },
    isFirstSection() {
      return this.activeSectionId === 0;
    },
    isLastSection() {
      return (formSections) =>
        this.activeSectionId === Object.keys(formSections).length - 1;
    },
    userIsLogged() {
      return !!this.user?.token;
    },
    activeSectionName() {
      const formSections =
        this.activeFormId === 0
          ? this.formExpertSections
          : this.formPictsSections;
      return Object.keys(formSections)[this.activeSectionId];
    },
    isFormExpertValid() {
      const sections = this.formExpertSections;
      return Object.keys(sections).length !== 0
        ? sections.biological.isValid &&
            sections.init.isValid &&
            sections.basic.isValid &&
            sections.habitat.isValid &&
            sections.ecoSystem.isValid &&
            sections.riverQuality.isValid
        : false;
    },
    isFormPictsValid() {
      return Object.keys(this.formPictsSections).length !== 0;
    },
    isStateEcoReady() {
      return (
        checkNestedProperty(
          this.formExpertSections.riverQuality,
          "results.qrisiIndex",
        ) &&
        checkNestedProperty(
          this.formExpertSections.biological,
          "results.bioQualityIndex",
        )
      );
    },
  },
  actions: {
    clearIndexDB() {
      // TODO: Check this
      // formStore.clear();
    },
    setDefaultStateStore() {
      this.user = {};
      this.userRiverSections = [];
      this.activeSectionId = 0;
      this.activeFormId = 0;
      this.formExpertSections = {};
      this.formPictsSections = {};
      this.goodPlantsAbsence = false;
      this.garbageAbsence = false;
      this.goodAnimalsAbsence = false;
    },
    setActiveUser(user) {
      this.user = user;
    },
    setActiveForm(formId) {
      this.activeFormId = formId;
    },
    loadRiverSections(riverSections) {
      this.userRiverSections = riverSections;
    },
    loadRiverSectionsPicts(riverSectionsPicts) {
      this.userRiverSectionsPicts = riverSectionsPicts;
    },
    loadExpertFormData(formData) {
      for (const name of Object.keys(formData)) {
        this.formExpertSections[name] = formData[name];
      }
    },
    loadPictsFormData(formData) {
      for (const name of Object.keys(formData)) {
        this.formPictsSections[name] = formData[name];
      }
    },
    setActiveSection(sectionId) {
      this.activeSectionId = sectionId;
    },
    setUserPosition(position) {
      this.userPosition = position;
    },
    setExpertSectionState(payload) {
      this.formExpertSections[payload.name].isValid = payload.isValid;
    },
    setPictsSectionState(payload) {
      this.formPictsSections[payload.name].isValid = payload.isValid;
    },
    setGoodAnimalsAbsence(goodAnimalsAbsence) {
      this.goodAnimalsAbsence = goodAnimalsAbsence;
    },
    setGoodPlantsAbsence(goodPlantsAbsence) {
      this.goodPlantsAbsence = goodPlantsAbsence;
    },
    setGarbageAbsence(garbageAbsence) {
      this.garbageAbsence = garbageAbsence;
    },
    updateSectionValues(payload) {
      const params = {
        name: this.activeSectionName,
        ...payload,
      };
      this.formExpertSections[params.name].results = { ...params.values };
      this.formExpertSections[params.name].isValid = params.isValid;
    },
    updateSpecificExpertSectionValues(payload) {
      this.formExpertSections[payload.name].results = { ...payload.values };
      this.formExpertSections[payload.name].isValid = payload.isValid;
    },
    updateSpecificPictsSectionValues(payload) {
      this.formPictsSections[payload.name].results = { ...payload.values };
      this.formPictsSections[payload.name].isValid = payload.isValid;
    },
    clearPictsFormResponses() {
      this.activeSectionId = 0;
      for (const section of Object.keys(this.formPictsSections)) {
        this.formPictsSections[section].results = {};
        this.formPictsSections[section].isValid = false;
      }
      this.goodAnimalsAbsence = false;
      this.goodPlantsAbsence = false;
      this.garbageAbsence = false;
    },
    clearExpertFormResponses() {
      this.activeSectionId = 0;
      for (const section of Object.keys(this.formExpertSections)) {
        this.formExpertSections[section].results = {};
        this.formExpertSections[section].isValid = false;
      }
    },
    clearRiverSections() {
      this.userRiverSections = [];
    },
    logout() {
      this.setActiveUser({});
      this.clearRiverSections({});
      this.clearPictsFormResponses();
      this.clearExpertFormResponses();
    },
  },
  persist: false,
});
