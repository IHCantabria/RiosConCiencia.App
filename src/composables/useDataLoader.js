import { useAppStore } from "@/store/appStore.js";
import {
  getUserRiverSections,
  getExpertMasterData,
  getPictsMasterData,
} from "@/api/riosconciencia.js";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";

export function useDataLoader() {
  const initDataLoader = async () => {
    try {
      await getRiverSections();
      await setExpertFormData();
      await setPictsFormData();
    } catch (err) {
      throw new Error(err);
    }
  };

  const updateRiverSections = async () => {
    try {
      await getRiverSections();
    } catch (err) {
      throw new Error(err);
    }
  };

  return { initDataLoader, updateRiverSections };
}

// River sections
const getRiverSections = async () => {
  const appStore = useAppStore();
  const authenticatedUser = appStore.user;
  try {
    const userRiverSections = await getUserRiverSections(
      authenticatedUser.token,
      authenticatedUser.id,
    );
    const riverSectionsFormated = getRiverSectionsSplit(userRiverSections);
    appStore.loadRiverSections(riverSectionsFormated.expert);
    appStore.loadRiverSectionsPicts(riverSectionsFormated.picts);
  } catch (err) {
    const msg =
      err.response.status == 404
        ? "¡Atención! no tienes asignados tramos de río, no podras completar ni enviar ningun formulario."
        : "Fallo al recuperar tus tramos de río, prueba mas tarde";
    Toast.open({
      message: msg,
      type: "is-danger",
      duration: 8000,
    });
  }
};
const getRiverSectionsSplit = (riverSections) => {
  const riverSectionExpert = getRiverSectionsFormated(
    riverSections.filter((section) => !section.isTeaSection),
  );
  const riverSectionPicts = getRiverSectionsFormated(
    riverSections.filter((section) => section.isTeaSection),
  );
  return { expert: riverSectionExpert, picts: riverSectionPicts };
};
const getRiverSectionsFormated = (sections) => {
  return sections.map((section) => {
    return {
      id: section.idRiverSection,
      name: section.alias,
      coordX: section.coordX,
      coordY: section.coordY,
      municipality: section.municipality,
      riverName: section.riverName,
      riverType: section.riverType,
      catchment: section.catchment,
      riverAlias: section.riverAlias,
    };
  });
};

// Expert form data
const setExpertFormData = async () => {
  const appStore = useAppStore();
  const masterData = await getExpertMasterData(appStore.user.token);
  appStore.loadExpertFormData(masterData);
};
const setPictsFormData = async () => {
  const appStore = useAppStore();
  const masterData = await getPictsMasterData(appStore.user.token);
  appStore.loadPictsFormData(masterData);
};
