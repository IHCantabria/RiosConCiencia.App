<!-- eslint-disable promise/always-return -->
<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from "vue";
import { getUserGeolocation } from "@/api/geolocation.js";
import { useAppStore } from "@/store/appStore.js";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import { downloadPDF } from "@/utils/download-pdf";
import VertidosPDF from "@/assets/pdfs/vertidos.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();

// COMPUTED
const spillDisabled = computed(() => {
  return (
    values.value.spillSource === null || values.value.spillDiameter === null
  );
});
const isSectionValid = computed(() => {
  return true; //optional section
});

// LYFECYCLE
onMounted(() => {
  init();
  updateSpecificExpertSectionValues();
});
onBeforeUpdate(() => {
  updateSpecificExpertSectionValues();
});

// DATA
const values = ref({
  spillsList: null,
});
const spillDiameter = ref(null);
const spillFlow = ref(null);
const spillColor = ref(null);
const spillLongitude = ref(0);
const spillLatitude = ref(0);
const spillSmell = ref(null);
const spillSource = ref(null);
const spillsTable = ref({
  selectedRows: [],
  columns: [
    {
      field: "position.longitude",
      label: "Longitud",
    },
    {
      field: "position.latitude",
      label: "Latitud",
    },
    {
      field: "diameter.name",
      label: "Diámetro",
    },
    {
      field: "flow.name",
      label: "Caudal",
    },
    {
      field: "color.name",
      label: "Color",
    },
    {
      field: "smell.name",
      label: "Olor",
    },
    {
      field: "source.name",
      label: "Origen",
    },
  ],
});

// METHODS
const init = () => {
  values.value.spillsList = []; //default value and make beforeUpdate hook jump
};

const updateSpecificExpertSectionValues = () => {
  if (appStore.formExpertSent) return;
  appStore.updateSpecificExpertSectionValues({
    name: "spills",
    values: values.value,
    isValid: isSectionValid.value,
  });
};

const getActualPosition = () => {
  getUserGeolocation()
    .then((res) => {
      spillLongitude.value = parseFloat(res.coords.longitude).toFixed(7);
      spillLatitude.value = parseFloat(res.coords.latitude).toFixed(7);
    })
    .catch(() => {
      Toast.open({
        message: "No es posible geolocalizar la ubicación",
        type: "is-danger",
        duration: 4000,
      });
    });
};
const saveNewSpill = () => {
  const newSpill = {
    position: {
      longitude: spillLongitude.value,
      latitude: spillLatitude.value,
    },
    diameter: spillDiameter.value,
    flow: spillFlow.value,
    color: spillColor.value,
    smell: spillSmell.value,
    source: spillSource.value,
  };
  resetSpillValues();
  values.value.spillsList.push(newSpill);
  appStore.updateSectionValues({
    values: values.value,
    isValid: true,
  });
};
const resetSpillValues = () => {
  spillDiameter.value = null;
  spillFlow.value = null;
  spillColor.value = null;
  spillLongitude.value = 0;
  spillLatitude.value = 0;
  spillSmell.value = null;
  spillSource.value = null;
};
const removeSelectedSpills = () => {
  for (const spill of spillsTable.value.selectedRows) {
    const filtered = self.values.spillsList.filter((value) => {
      return value !== spill;
    });
    self.values.spillsList = filtered;
  }
  spillsTable.value.selectedRows = [];
  appStore.updateSectionValues({ values: values.value, isValid: true });
};
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span> 2. Inspección de vertidos (500 m)</span>
      </h5>
      <a
        class="header-section__help"
        @click="downloadPDF(VertidosPDF, 'vertidos')"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <div class="form-section__block form-section__block-spills">
      <b-field label="Coordenadas (WGS84)"></b-field>
      <div class="two-controls">
        <b-field label="Lon" custom-class="is-small">
          <b-input
            v-model="spillLongitude"
            placeholder="Number"
            type="number"
            min="-180"
            max="180"
            step="any"
            custom-class="is-small"
          >
          </b-input>
        </b-field>
        <b-field label="Lat" custom-class="is-small">
          <b-input
            v-model="spillLatitude"
            placeholder="Number"
            type="number"
            min="-90"
            max="90"
            step="any"
            custom-class="is-small"
          >
          </b-input>
        </b-field>
      </div>
      <b-field>
        <b-button
          type="is-primary"
          icon-left="map-marker"
          outlined
          size="is-small"
          expanded
          @click="getActualPosition()"
          >Obtener posición actual</b-button
        >
      </b-field>
      <b-field
        label="Diámetro"
        message="*Este campo es obligatorio al añadir un vertido"
      >
        <b-select
          v-model="spillDiameter"
          icon="diameter-outline"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="(option, index) in appStore.formExpertSections.spills.data
              .spillDiameterOptions"
            :key="index"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Caudal">
        <b-select
          v-model="spillFlow"
          icon="elevation-rise"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="option in appStore.formExpertSections.spills.data
              .spillFlowOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Color">
        <b-select
          v-model="spillColor"
          icon="invert-colors"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="option in appStore.formExpertSections.spills.data
              .spillColorOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Olor">
        <b-select
          v-model="spillSmell"
          icon="grain"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="option in appStore.formExpertSections.spills.data
              .spillSmellOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field
        label="Origen"
        message="*Este campo es obligatorio al añadir un vertido"
      >
        <b-select
          v-model="spillSource"
          icon="source-commit-start"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="option in appStore.formExpertSections.spills.data
              .spillSourceOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-button
        type="is-primary"
        :disabled="spillDisabled"
        @click="saveNewSpill"
      >
        Guardar
      </b-button>
    </div>

    <div
      v-if="values.spillsList && values.spillsList.length > 0"
      class="table-container"
    >
      <b-table
        v-model:checked-rows="spillsTable.selectedRows"
        :data="values.spillsList"
        :columns="spillsTable.columns"
        :narrowed="true"
        :mobile-cards="true"
        class="table-spills"
        checkable
      ></b-table>
    </div>
    <div v-else>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="pipe-leak" size="is-large"> </b-icon>
          </p>
          <p>No hay vertidos</p>
        </div>
      </section>
    </div>

    <b-field v-if="spillsTable.selectedRows.length > 0">
      <b-button
        type="is-primary"
        icon-left="delete"
        outlined
        size="is-small"
        expanded
        @click="removeSelectedSpills()"
        >Eliminar vertidos seleccionados</b-button
      >
    </b-field>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  padding: 1rem;
}
</style>
