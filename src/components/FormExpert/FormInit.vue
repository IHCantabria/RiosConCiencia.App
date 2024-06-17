<script setup>
import { ref, computed, onMounted, onBeforeUpdate } from "vue";
import { useAppStore } from "@/store/appStore.js";

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
const isSectionValid = computed(() => {
  return (
    !weatherHasErrors.value &&
    !weather48HasErrors.value &&
    !riverSectionHasErrors.value
  );
});

// LYFECYCLE
onMounted(() => {
  init();
  // TODO: Fix this
  // this.pdfLink = require("../../assets/pdfs/manual2019.pdf");
});
onBeforeUpdate(() => {
  appStore.updateSpecificExpertSectionValues({
    name: "init",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// DATA
const pdfLink = ref(null);
const values = ref({
  partners: null,
  riverSection: null,
  weatherToday: null,
  weather48h: null,
});
const init = () => {
  values.value.partners = ""; //default value and make beforeUpdate hook jump
};
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>0. Datos iniciales</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
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
