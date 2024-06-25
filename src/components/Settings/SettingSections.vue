<script setup>
import { ref, onMounted } from "vue";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import BaseTableComponent from "@/components/base/ui/BaseTableComponent.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import FormCreateUpdateSection from "@/components/Settings/FormCreateUpdateSection.vue";
import { SECTIONS_TABLE_CONFIG } from "@/config/settings-config.js";
import { useSettingsStore } from "@/store/settingsStore.js";
import { useSettingsDataLoader } from "@/composables/useSettingsDataLoader.js";

// STORES & COMPOSABLES
const settingsStore = useSettingsStore();
const { updateAllRiverSections } = useSettingsDataLoader();

// COMPONENT REFS
const modalRef = ref(null);

// DATA
const isLoading = ref(false);
const tableConfig = ref(null);
const dataCopy = ref(null);
const modalAction = ref(null);
const riverSectionToUpdate = ref({
  id: null,
  alias: "",
  coordX: null,
  coordY: null,
  idMunicipality: null,
  idRiver: null,
});
const riverSectionAliasFilter = ref("");

// LIFECYCLE
onMounted(() => {
  setTableConfig();
});

// METHODS
const setTableConfig = () => {
  tableConfig.value = {
    ...SECTIONS_TABLE_CONFIG,
    data: setData(),
  };
};
const setData = () => {
  const data = settingsStore.allRiverSections.map((section) => {
    return {
      id: section.id,
      name: section.alias,
      coords: `${section.coordX}, ${section.coordY}`,
      municipality: getMunicipalityName(section.idMunicipality),
      river: getRiverName(section.idRiver),
    };
  });
  dataCopy.value = JSON.parse(JSON.stringify(data));
  return data;
};
const updateData = async () => {
  await updateAllRiverSections();
  const updatedData = setData();
  dataCopy.value = JSON.parse(JSON.stringify(updatedData));
  tableConfig.value.data = updatedData;
};
const getMunicipalityName = (idMunicipality) => {
  return settingsStore.allMunicipalities.find(
    (municipality) => municipality.id === idMunicipality,
  ).name;
};
const getRiverName = (idRiver) => {
  return settingsStore.allRivers.find((river) => river.id === idRiver).name;
};
const onCreateButtonClick = () => {
  modalAction.value = "create";
  modalRef.value.isModalActive = true;
};
const onActionClick = ({ action, item: section }) => {
  if (action.name === "edit") {
    onEditButtonClick(section);
  }
};
const onEditButtonClick = (section) => {
  const sectionInfo = getSectionInfo(section.id);
  riverSectionToUpdate.value = { ...sectionInfo };
  modalAction.value = "update";
  modalRef.value.isModalActive = true;
};
const onFormCancel = () => {
  modalAction.value = null;
  resetRiverSectionToUpdate();
  modalRef.value.isModalActive = false;
};
const onFormSubmit = async (section) => {
  isLoading.value = true;
  try {
    if (modalAction.value === "create") {
      await settingsStore.createRiverSection(section);
    } else {
      await settingsStore.updateRiverSection(
        riverSectionToUpdate.value.id,
        section,
      );
    }
    showSuccessToast();
    updateData();
  } catch (error) {
    showErrorToast();
  } finally {
    modalRef.value.isModalActive = false;
    resetRiverSectionToUpdate();
    isLoading.value = false;
    modalAction.value = null;
  }
};
const resetRiverSectionToUpdate = () => {
  riverSectionToUpdate.value = {
    id: null,
    alias: "",
    coordX: null,
    coordY: null,
    idMunicipality: null,
    idRiver: null,
  };
};
const showSuccessToast = () => {
  const messageVerb = modalAction.value === "create" ? "creado" : "actualizado";
  Toast.open({
    message: `Tramo ${messageVerb} con éxito`,
    type: "is-success",
  });
};
const showErrorToast = () => {
  Toast.open({
    message: "Ha ocurrido un error al procesar la solicitud",
    type: "is-danger",
  });
};
const getSectionInfo = (id) => {
  return settingsStore.allRiverSections.find((section) => section.id === id);
};
const onFilterChange = (value) => {
  clearTimeout(window.timer);
  window.timer = setTimeout(() => {
    riverSectionAliasFilter.value = value;
    filterData();
  }, 300);
};
const filterData = () => {
  let data = JSON.parse(JSON.stringify(dataCopy.value));
  data = data.filter((section) =>
    section.name
      .toLowerCase()
      .includes(riverSectionAliasFilter.value.toLowerCase()),
  );
  tableConfig.value.data = data;
};
</script>

<template>
  <div class="setting-sections">
    <div class="controls">
      <div class="controls__filters">
        <b-field label="Filtrar por alias" class="filter-label">
          <b-input
            class="filter-input"
            :model-value="riverSectionAliasFilter"
            type="is-primary"
            placeholder="Ej: Arroyo Collado"
            @input="onFilterChange($event.target.value)"
          />
        </b-field>
      </div>
      <div class="controls__buttons">
        <b-button
          class="button"
          type="is-primary"
          icon-left="plus"
          expanded
          @click="onCreateButtonClick()"
        >
          Crear tramo
        </b-button>
      </div>
    </div>
    <div class="table">
      <BaseTableComponent
        v-if="tableConfig"
        v-bind="tableConfig"
        @action-click="onActionClick"
      />
    </div>
  </div>
  <base-modal
    ref="modalRef"
    :title="modalAction === 'create' ? 'Crear tramo' : 'Actualizar tramo'"
    :close-click-outside="false"
    :show-header-close-button="false"
  >
    <template #content>
      <FormCreateUpdateSection
        :action="modalAction"
        :river-section-to-update="riverSectionToUpdate"
        :is-loading="isLoading"
        @cancel="onFormCancel"
        @submit="onFormSubmit"
      />
    </template>
  </base-modal>
</template>

<style lang="scss" scoped>
.setting-sections {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  max-width: 90vw;

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin: 0 1rem 1rem;
    width: 100%;

    &__filters {
      .filter-label {
        text-align: start;
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
