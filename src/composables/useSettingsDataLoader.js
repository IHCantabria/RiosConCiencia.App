import { useSettingsStore } from "@/store/settingsStore.js";
import { useAppStore } from "@/store/appStore.js";
import {
  getAllUsers,
  getAllUserRoles,
  getAllMunicipalities,
  getAllRivers,
  getAllRiverSections,
} from "@/api/riosconciencia.js";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";

export function useSettingsDataLoader() {
  const settingsStore = useSettingsStore();
  const appStore = useAppStore();

  const initSettingsDataLoader = async () => {
    const token = appStore.user.token;
    try {
      settingsStore.allUsers = await getAllUsers(token);
      settingsStore.allUserRoles = await getAllUserRoles(token);
      settingsStore.allMunicipalities = await getAllMunicipalities(token);
      settingsStore.allRivers = await getAllRivers(token);
      settingsStore.allRiverSections = await getAllRiverSections(token);
    } catch (err) {
      settingsStore.resetSettingsStore();
      Toast.open({
        message: "Error loading settings data",
        type: "is-danger",
      });
      throw new Error(err);
    }
  };

  const updateAllRiverSections = async () => {
    const token = appStore.user.token;
    try {
      settingsStore.allRiverSections = await getAllRiverSections(token);
    } catch (err) {
      Toast.open({
        message: "Error updating river sections",
        type: "is-danger",
      });
      throw new Error(err);
    }
  };

  const updateAllUsers = async () => {
    try {
      const token = appStore.user.token;
      settingsStore.allUsers = await getAllUsers(token);
    } catch (err) {
      Toast.open({
        message: "Error updating users",
        type: "is-danger",
      });
      throw new Error(err);
    }
  };

  return { initSettingsDataLoader, updateAllRiverSections, updateAllUsers };
}
