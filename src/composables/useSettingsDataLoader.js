import { useSettingsStore } from "@/store/settingsStore.js";
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

  const initSettingsDataLoader = async () => {
    try {
      settingsStore.allUsers = await getAllUsers();
      settingsStore.allUserRoles = await getAllUserRoles();
      settingsStore.allMunicipalities = await getAllMunicipalities();
      settingsStore.allRivers = await getAllRivers();
      settingsStore.allRiverSections = await getAllRiverSections();
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
    try {
      settingsStore.allRiverSections = await getAllRiverSections();
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
      settingsStore.allUsers = await getAllUsers();
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
