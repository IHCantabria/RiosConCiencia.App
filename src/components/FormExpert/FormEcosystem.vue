<!-- eslint-disable promise/always-return -->
<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { downloadPDF } from "@/utils/download-pdf";
import EcosystemPDF from "@/assets/pdfs/ecosistema.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const values = ref({
  samplePointWidth: null,
  samplePointDepth: null,
  samplePointWaterVelocity: null,
  samplePointWaterTemp: 0,
  waterTransparency: null,
  samplePointCoords: {
    lon: null,
    lat: null,
  },
});

// LYFECYCLE
onMounted(() => {
  init();
});

// COMPUTED
const flow = computed(() => {
  return (
    values.value.samplePointWidth *
    values.value.samplePointDepth *
    values.value.samplePointWaterVelocity
  );
});
const waterTempHasErrors = computed(() => {
  return values.value.samplePointWaterTemp === null;
});
const transparencyHasErrors = computed(() => {
  return values.value.waterTransparency === null;
});
const isSectionValid = computed(() => {
  return !waterTempHasErrors.value && !transparencyHasErrors.value;
});

// METHODS
const init = () => {
  values.value.samplePointWaterTemp = null; //default value and make beforeUpdate hook jump
  values.value.samplePointCoords = JSON.parse(
    JSON.stringify(appStore.userPosition),
  );
};
const updateSpecificExpertSectionValues = () => {
  if (appStore.formExpertSent) return;
  appStore.updateSpecificExpertSectionValues({
    name: "ecoSystem",
    values: values.value,
    isValid: isSectionValid.value,
  });
};

// WATCHERS
watch(
  () => values.value,
  async (newValue) => {
    if (newValue.samplePointWidth == 0) {
      values.value.samplePointWidth = null;
    }
    if (newValue.samplePointDepth == 0) {
      values.value.samplePointDepth = null;
    }
    if (newValue.samplePointWaterVelocity == 0) {
      values.value.samplePointWaterVelocity = null;
    }
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
        <span>3. Estudio del ecosistema acuático (100 m)</span>
      </h5>
      <a
        class="header-section__help"
        @click="downloadPDF(EcosystemPDF, 'Ecosistema')"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field label="3.1 Anchura (m):">
      <b-numberinput
        v-model="values.samplePointWidth"
        step="0.1"
        min="0"
      ></b-numberinput>
    </b-field>
    <b-field label="3.2 Profundidad media (m):">
      <b-numberinput
        v-model="values.samplePointDepth"
        step="0.1"
        min="0"
      ></b-numberinput>
    </b-field>
    <b-field label="3.3 Velocidad del agua (m/s):">
      <b-numberinput
        v-model="values.samplePointWaterVelocity"
        step="0.1"
        min="0"
      ></b-numberinput>
    </b-field>
    <b-field label="3.4 Caudal (m³/s) (A x P x V):">
      <span>{{ flow }}m³/s</span></b-field
    >

    <b-field
      label="3.5 Temperatura (°C):"
      :message="{
        '*Hay que definir la temperatura del agua': waterTempHasErrors,
      }"
      :type="{ 'is-danger': waterTempHasErrors }"
    >
      <b-numberinput
        v-model="values.samplePointWaterTemp"
        step="0.5"
      ></b-numberinput>
    </b-field>
    <b-field label="3.6 Transparencia"> </b-field>
    <b-field
      label="(marcar solo los sectores que se ven en el disco, en el caso de no ver
        ninguno, marcar el 0)"
      custom-class="is-small"
      :message="{
        '*Al menos un sector debe estar marcado': transparencyHasErrors,
      }"
      :type="{ 'is-danger': transparencyHasErrors }"
    ></b-field>

    <div class="block">
      <div class="radio-rows">
        <div class="radio-rows__options-container">
          <b-field>
            <b-radio-button
              v-for="option in appStore.formExpertSections.ecoSystem.data
                .transparencyOptions"
              :key="option.id"
              v-model="values.waterTransparency"
              :native-value="option"
              >{{ option.name }}
            </b-radio-button>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>
