<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { downloadPDF } from "@/utils/download-pdf";
import manualRiosPDF from "@/assets/pdfs/0_Manual_PR_2024.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();

// COMPUTED
const riverSectionHasErrors = computed(() => {
  return values.value.riverSection === null;
});
const userFullName = computed(() => {
  return `${appStore.user.name ? appStore.user.name : ""} ${
    appStore.user.surnames ? appStore.user.surnames : ""
  }`;
});
const weatherHasErrors = computed(() => {
  return values.value.weatherToday === null;
});
const weather48HasErrors = computed(() => {
  return values.value.weather48h === null;
});
const dateHasErrors = computed(() => {
  return values.value.SampleDate === null;
});
const isSectionValid = computed(() => {
  return (
    !weatherHasErrors.value &&
    !weather48HasErrors.value &&
    !riverSectionHasErrors.value &&
    !dateHasErrors.value
  );
});

// LYFECYCLE
onMounted(() => {
  init();
});

// DATA
const values = ref({
  partners: null,
  riverSection: null,
  weatherToday: null,
  weather48h: null,
  SampleDate: new Date(),
});

// METHODS
const init = () => {
  values.value.partners = ""; //default value and make beforeUpdate hook jump
};
const updateSpecificExpertSectionValues = () => {
  if (appStore.formExpertSent) return;
  appStore.updateSpecificExpertSectionValues({
    name: "init",
    values: values.value,
    isValid: isSectionValid.value,
  });
};
const clearDateTime = () => {
  values.value.SampleDate = null;
};

// WATCH
watch(
  values.value,
  async () => {
    await nextTick();
    updateSpecificExpertSectionValues();
  },
  { deep: true },
);
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>0. Datos iniciales</span>
      </h5>
      <a
        class="header-section__help"
        @click="downloadPDF(manualRiosPDF, 'Manual PR_2024')"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field label="Nombre del responsable">
      <label>{{ userFullName }}</label>
    </b-field>
    <b-field label="Acompañantes">
      <b-input v-model="values.partners"></b-input>
    </b-field>
    <b-field
      label="Fecha"
      :message="{
        '*Seleccione una fecha': dateHasErrors,
      }"
      :type="{ 'is-danger': dateHasErrors }"
    >
      <b-datetimepicker
        v-model="values.SampleDate"
        placeholder="Seleccione una fecha"
        icon="calendar-today"
        :icon-right="values.SampleDate ? 'close-circle' : ''"
        icon-right-clickable
        locale="es-ES"
        horizontal-time-picker
        @icon-right-click="clearDateTime"
      >
      </b-datetimepicker>
    </b-field>
    <b-field
      label="Tramo"
      :message="{
        '*Hay que seleccionar un tramo': riverSectionHasErrors,
      }"
      :type="{ 'is-danger': riverSectionHasErrors }"
    >
      <b-select
        v-model="values.riverSection"
        icon="go-kart-track"
        placeholder="Seleccione Tramo"
      >
        <option
          v-for="option in appStore.userRiverSections"
          :key="option.id"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Cuenca / Municipio">
      <label v-if="values.riverSection"
        >{{ values.riverSection.catchment }} /
        {{ values.riverSection.municipality }}</label
      >
      <label v-else>-</label>
    </b-field>
    <b-field
      label="Clima hoy"
      :message="{
        '*Hay que seleccionar una opción': weatherHasErrors,
      }"
      :type="{ 'is-danger': weatherHasErrors }"
    >
      <b-select
        v-model="values.weatherToday"
        icon="weather-lightning-rainy"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="option in appStore.formExpertSections.init.data.weatherOptions"
          :key="option.id"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="Clima últimos 2 días"
      :message="{
        '*Hay que seleccionar una opción': weather48HasErrors,
      }"
      :type="{ 'is-danger': weather48HasErrors }"
    >
      <b-select
        v-model="values.weather48h"
        icon="weather-lightning-rainy"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="option in appStore.formExpertSections.init.data.weatherOptions"
          :key="option.id"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
  </div>
</template>
