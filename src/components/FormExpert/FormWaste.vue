<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const pdfLink = ref(null);
const values = ref({
  wasteList: [],
});
const selectedWaste = ref({});
const units = ref(1);
const wasteTable = ref({
  selectedRows: [],
  columns: [
    {
      field: "name",
      label: "Residuo",
    },
    {
      field: "units",
      label: "Unidades",
    },
  ],
});

// COMPUTED
const isSectionValid = computed(() => {
  return true; // optional section
});

// LYFECYCLE
onMounted(() => {
  init();
  updateSpecificExpertSectionValues();
  // TODO: Fix this
  // pdfLink.value = require("../../assets/pdfs/ribera.pdf");
});
onBeforeUpdate(() => {
  updateSpecificExpertSectionValues();
});
// METHODS
const updateSpecificExpertSectionValues = () => {
  if (appStore.formExpertSent) return;
  appStore.updateSpecificExpertSectionValues({
    name: "waste",
    values: values.value,
    isValid: isSectionValid.value,
  });
};

const init = () => {
  selectedWaste.value =
    appStore.formExpertSections.waste.data.wasteOptions[0].options[0];
};
const saveNewWaste = () => {
  const newWaste = {
    ...selectedWaste.value,
    units: units.value,
  };
  const indexWaste = checkWasteExist(newWaste);
  addWaste(newWaste, indexWaste);
  units.value = 1;
  appStore.updateSectionValues({ values: values.value, isValid: true });
};
const checkWasteExist = (newWaste) => {
  return values.value.wasteList.findIndex((waste) => waste.id == newWaste.id);
};
const addWaste = (newWaste, index) => {
  index == -1
    ? values.value.wasteList.push(newWaste)
    : (values.value.wasteList[index].units =
        values.value.wasteList[index].units + newWaste.units);
};
const removeSelectedWaste = () => {
  for (const element of wasteTable.value.selectedRows) {
    const filtered = values.value.wasteList.filter((value) => {
      return value !== element;
    });
    values.value.wasteList = filtered;
  }
  wasteTable.value.selectedRows = [];
  appStore.updateSectionValues({ values: values.value, isValid: true });
};

// WATCHERS
watch(
  () => selectedWaste.value,
  () => {
    units.value = 1;
  },
);
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>3. Inspección de residuos (100 m)</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <div class="form-section__block form-section__block-waste">
      <b-field>
        <b-select
          v-model="selectedWaste"
          placeholder="Seleccione tipo de residuo"
          icon="delete-variant"
          expanded=""
        >
          <optgroup
            v-for="(group, index) in appStore.formExpertSections.waste.data
              .wasteOptions"
            :key="index"
            :label="group.material.toUpperCase()"
          >
            <option
              v-for="(option, indexOption) in group.options"
              :key="indexOption"
              :value="option"
            >
              {{ option.name }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
      <b-field>
        <b-numberinput v-model="units" min="1"></b-numberinput>
      </b-field>
      <b-button type="is-primary" @click="saveNewWaste"> Guardar </b-button>
    </div>
    <div v-if="values.wasteList.length > 0" class="table-container">
      <b-table
        v-model:checked-rows="wasteTable.selectedRows"
        :data="values.wasteList"
        :columns="wasteTable.columns"
        :narrowed="true"
        :mobile-cards="false"
        checkable
      ></b-table>
    </div>
    <div v-else>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="delete-variant" size="is-large"> </b-icon>
          </p>
          <p>No hay residuos</p>
        </div>
      </section>
    </div>
    <b-field v-if="wasteTable.selectedRows.length > 0">
      <b-button
        type="is-primary"
        icon-left="delete"
        outlined
        size="is-small"
        expanded
        @click="removeSelectedWaste()"
        >Eliminar residuos seleccionados</b-button
      >
    </b-field>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  padding: 1rem;
}
</style>
