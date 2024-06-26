// create a pinia store

import { defineStore } from "pinia";
import {
  createRiverSection,
  updateRiverSection,
  registerUser,
  updateUser,
  disableUser,
} from "@/api/riosconciencia.js";

export const useSettingsStore = defineStore("settingsStore", {
  state: () => ({
    selectedMenuOption: null,
    allUsers: null,
    allUserRoles: null,
    allMunicipalities: null,
    allRivers: null,
    allRiverSections: null,
  }),
  getters: {
    isDataReady() {
      return (
        this.allUsers &&
        this.allUserRoles &&
        this.allMunicipalities &&
        this.allRivers &&
        this.allRiverSections
      );
    },
  },
  actions: {
    resetSettingsStore() {
      this.$reset();
    },
    async createRiverSection(riverSection) {
      const newRiverSection = await createRiverSection(riverSection);
      return newRiverSection;
    },
    async updateRiverSection(riverSectionId, riverSection) {
      const updatedRiverSection = await updateRiverSection(
        riverSectionId,
        riverSection,
      );
      return updatedRiverSection;
    },
    async registerUser(user) {
      const newUser = await registerUser(user);
      return newUser;
    },
    async updateUser(userId, user) {
      const updatedUser = await updateUser(userId, user);
      return updatedUser;
    },
    async disableUser(userId) {
      const updatedUser = await disableUser(userId);
      return updatedUser;
    },
  },
});
