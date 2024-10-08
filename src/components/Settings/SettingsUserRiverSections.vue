<script setup>
import { ref, onMounted } from "vue";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import BaseTableComponent from "@/components/base/ui/BaseTableComponent.vue";
import { USER_SECTIONS_TABLE_CONFIG } from "@/config/settings-config.js";
import { useSettingsStore } from "@/store/settingsStore.js";
import { useAppStore } from "@/store/appStore.js";
import Spinner from "@/components/LoadingComponent.vue";
import {
  assignSectionToUser,
  dellocateRiverSection,
} from "@/api/riosconciencia.js";

// PROPS
const props = defineProps({
  user: {
    type: [Object, null],
    required: true,
  },
  userRiverSections: {
    type: Array,
    required: true,
  },
});

// STORES & COMPOSABLES
const settingsStore = useSettingsStore();
const appStore = useAppStore();

// DATA
const isLoading = ref(false);
const tableConfig = ref(null);
const dataCopy = ref(null);
const riverSectionAliasIdFilter = ref("");
const userRiverSectionsCopy = ref(null);
const filterShowAll = ref(true); // Controls showing all sections
const filterShowAssigned = ref(false); // Controls showing only assigned sections

// EMITS
const emit = defineEmits(["finish-click"]);

// LIFECYCLE
onMounted(() => {
  userRiverSectionsCopy.value = JSON.parse(
    JSON.stringify(props.userRiverSections),
  );
  setTableConfig();
  filterData(); // Ensure data is filtered on load
});

// METHODS
const setTableConfig = () => {
  tableConfig.value = {
    ...USER_SECTIONS_TABLE_CONFIG,
    data: setData(),
  };
};
const setData = () => {
  const data = settingsStore.allRiverSections.map((section) => {
    return {
      expert: setExpert(section.id),
      tea: setTea(section.id),
      id: section.id,
      name: section.alias,
      coords: `Lon: ${section.coordX}, Lat: ${section.coordY}`,
      municipality: getMunicipalityName(section.idMunicipality),
      river: getRiverName(section.idRiver),
      isZEC: section.isZEC,
    };
  });
  dataCopy.value = JSON.parse(JSON.stringify(data));
  return data;
};
const updateData = () => {
  tableConfig.value.data = setData();
  filterData(); // Ensure the data is filtered after update
};
const setExpert = (idSection) => {
  return userRiverSectionsCopy.value.some(
    (section) => section.idRiverSection === idSection && !section.isTeaSection,
  );
};
const setTea = (idSection) => {
  return userRiverSectionsCopy.value.some(
    (section) => section.idRiverSection === idSection && section.isTeaSection,
  );
};
const getMunicipalityName = (idMunicipality) => {
  return settingsStore.allMunicipalities.find(
    (municipality) => municipality.id === idMunicipality,
  ).name;
};
const getRiverName = (idRiver) => {
  return settingsStore.allRivers.find((river) => river.id === idRiver).name;
};
const onFilterChange = (value) => {
  clearTimeout(window.timer);
  window.timer = setTimeout(() => {
    riverSectionAliasIdFilter.value = value;
    filterData();
  }, 300);
};
const filterData = () => {
  let data = JSON.parse(JSON.stringify(dataCopy.value));
  const filterValue = riverSectionAliasIdFilter.value.toLowerCase().trim();

  data = data.filter((section) => {
    const matchesFilter =
      section.name
        .toLowerCase()
        .replace(/\s+/g, " ")
        .includes(filterValue.replace(/\s+/g, " ")) ||
      section.id.toString().includes(filterValue);

    const isAssigned = userRiverSectionsCopy.value.some(
      (userSection) => userSection.idRiverSection === section.id,
    );

    // Show all if "Mostrar todos" is selected
    if (filterShowAll.value) {
      return matchesFilter;
    }

    // Show only assigned sections if "Mostrar solo asignados" is selected
    if (filterShowAssigned.value) {
      return matchesFilter && isAssigned;
    }

    // Default to no filter
    return matchesFilter;
  });

  tableConfig.value.data = data;
};

const onFilterShowAllChange = () => {
  if (filterShowAll.value) {
    filterShowAssigned.value = false; // Deselect the other checkbox
  }
  filterData();
};

const onFilterShowAssignedChange = () => {
  if (filterShowAssigned.value) {
    filterShowAll.value = false; // Deselect the other checkbox
  }
  filterData();
};

const onFinishButtonClick = () => {
  emit("finish-click");
};
const onItemCheckboxClick = async (event) => {
  const { item, column, checked } = event;
  try {
    isLoading.value = true;
    const isTeaSection = column === "tea";
    const existingSection = userRiverSectionsCopy.value.find(
      (section) =>
        section.idRiverSection === item.id &&
        section.isTeaSection === isTeaSection,
    );

    if (!existingSection || checked) {
      await assignSection(item, isTeaSection);
    } else {
      await dellocateSection(item, isTeaSection);
    }

    updateData();
    updateAdminRiverSectionsState();
  } catch (error) {
    console.error(error);
    Toast.open({
      message: "Ha ocurrido un error al procesar la solicitud",
      type: "is-danger",
    });
  } finally {
    isLoading.value = false;
  }
};
const assignSection = async (item, isTeaSection) => {
  const payload = {
    idUser: props.user.id,
    idRiverSection: item.id,
    isTeaSection,
  };

  const response = await assignSectionToUser(appStore.user.token, payload);
  if (response?.success === false) {
    Toast.open({
      message: "Error al hacer la petición, intentelo de nuevo más tarde",
      type: "is-danger",
    });
  } else {
    userRiverSectionsCopy.value.push({
      idRiverSection: item.id,
      isTeaSection,
      alias: item.name,
      coordX: item.coords.split(",")[0],
      coordY: item.coords.split(",")[1],
      municipality: item.municipality,
      river: item.river,
    });
  }
};
const dellocateSection = async (item, isTeaSection) => {
  const payload = {
    idUser: props.user.id,
    idRiverSection: item.id,
  };

  const response = await dellocateRiverSection(appStore.user.token, payload);
  if (response?.success === false) {
    Toast.open({
      message: "Error al hacer la petición, intentelo de nuevo más tarde",
      type: "is-danger",
    });
  } else {
    userRiverSectionsCopy.value = userRiverSectionsCopy.value.filter(
      (section) => {
        return (
          section.idRiverSection !== item.id ||
          (section.idRiverSection === item.id &&
            section.isTeaSection !== isTeaSection)
        );
      },
    );
  }
};
const updateAdminRiverSectionsState = () => {
  if (props.user.id === appStore.user.id) {
    settingsStore.hasAdminUserRiverSectionsChanged = true;
  }
};
</script>

<template>
  <div class="setting-sections">
    <div class="user-title">
      <span class="bold">Usuario:</span>
      {{ props.user.name }} {{ props.user.surnames }}
    </div>
    <div class="controls">
      <div class="controls__filters">
        <b-field label="Filtrar por alias o ID" class="filter-label">
          <b-input
            class="filter-input"
            :model-value="riverSectionAliasIdFilter"
            type="is-primary"
            placeholder="Ej: Arroyo Collado"
            @input="onFilterChange($event.target.value)"
          />
        </b-field>
        <!-- Checkbox to toggle between showing all or only assigned sections -->
        <b-field label="Tramos" class="filter-label chechbox-group">
          <b-checkbox
            v-model="filterShowAll"
            type="is-primary"
            style="margin-right: 1rem"
            @change="onFilterShowAllChange()"
          >
            Todos los tramos
          </b-checkbox>
          <b-checkbox
            v-model="filterShowAssigned"
            type="is-primary"
            @change="onFilterShowAssignedChange()"
          >
            Tramos asignados
          </b-checkbox>
        </b-field>
      </div>
      <div class="controls__buttons">
        <b-button
          v-tooltip="'Terminar de gestionar tramos de usuario'"
          class="button"
          type="is-success"
          expanded
          @click="onFinishButtonClick()"
        >
          Terminar
        </b-button>
      </div>
    </div>
    <div class="table">
      <BaseTableComponent
        v-if="tableConfig"
        v-bind="tableConfig"
        @item-checkbox-click="onItemCheckboxClick"
      />
    </div>
  </div>
  <Spinner :is-loading="isLoading" />
</template>

<style lang="scss" scoped>
.setting-sections {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  max-width: 90vw;

  .user-title {
    .bold {
      font-weight: bold;
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin: 0 1rem 1rem;
    width: 100%;

    &__filters {
      display: flex;
      gap: 1rem;

      .filter-label {
        text-align: start;
        margin-bottom: 0;
      }
    }

    &__buttons {
      .button {
        max-width: 200px;
      }
    }
  }

  .table {
    width: 100%;
  }
}

@media (min-width: app-variables.$breakpoint-tablet-to-desktop) {
  .setting-sections {
    max-width: 90%;
  }
}
</style>
