import { defineStore } from "pinia";
import {
  createRiverSection,
  updateRiverSection,
  registerUser,
  updateUser,
  disableUser,
} from "@/api/riosconciencia.js";
import { useAppStore } from "@/store/appStore.js";

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
      const appStore = useAppStore();
      const newRiverSection = await createRiverSection(
        appStore.user.token,
        riverSection,
      );
      return newRiverSection;
    },
    async updateRiverSection(riverSectionId, riverSection) {
      const appStore = useAppStore();
      const updatedRiverSection = await updateRiverSection(
        appStore.user.token,
        riverSectionId,
        riverSection,
      );
      return updatedRiverSection;
    },
    async registerUser(user) {
      const appStore = useAppStore();
      const newUser = await registerUser(appStore.user.token, user);
      return newUser;
    },
    async updateUser(userId, user) {
      const appStore = useAppStore();
      const updatedUser = await updateUser(appStore.user.token, userId, user);
      return updatedUser;
    },
    async disableUser(userId) {
      const appStore = useAppStore();
      const updatedUser = await disableUser(appStore.user.token, userId);
      return updatedUser;
    },
  },
});
