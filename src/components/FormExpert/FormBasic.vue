<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from "vue";
import { useAppStore } from "@/store/appStore.js";

// DATA
const pdfLink = ref(null);
const values = ref({
  waterFlow: true,
  waterLevel: null,
  waterColor: "",
  waterSmell: "",
  waterElements: [],
  waterLevelCriticalProblem: "",
  riverBedWidth: null,
  riverBedDepth: null,
  riverSideWidthLeft: null,
  riverSideWidthRight: null,
  riverMarginConditionsLeft: [],
  riverMarginConditionsRight: [],
  riverMarginLandUseLeft: [],
  riverMarginLandUseRight: [],
});

// STORES & COMPOSABLES
const appStore = useAppStore();

// LYFECYCLE
onMounted(() => {
  init();
  // TODO: Fix this
  // pdfLink.value = require("../../assets/pdfs/basico.pdf");
});
onBeforeUpdate(() => {
  if (appStore.formExpertSent) return;
  appStore.updateSpecificExpertSectionValues({
    name: "basic",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// COMPUTED
const landUseHasErrors = computed(() => {
  return (
    values.value.riverMarginLandUseLeft.length === 0 &&
    values.value.riverMarginLandUseRight.length === 0
  );
});
const riverConditionsHasErrors = computed(() => {
  return (
    values.value.riverMarginConditionsLeft.length === 0 &&
    values.value.riverMarginConditionsRight.length === 0
  );
});
const waterLevelHasErrors = computed(() => {
  return values.value.waterLevel === null;
});
const riverBedWidthHasErrors = computed(() => {
  return values.value.riverBedWidth === null;
});
const riverBedDepthHasErrors = computed(() => {
  return values.value.riverBedDepth === null;
});
const riverSideWidthRightHasErrors = computed(() => {
  return values.value.riverSideWidthRight === null;
});
const riverSideWidthLeftHasErrors = computed(() => {
  return values.value.riverSideWidthLeft === null;
});
const isSectionValid = computed(() => {
  return (
    !landUseHasErrors.value &&
    !riverConditionsHasErrors.value &&
    !waterLevelHasErrors.value &&
    !riverBedWidthHasErrors.value &&
    !riverBedDepthHasErrors.value &&
    !riverSideWidthRightHasErrors.value &&
    !riverSideWidthLeftHasErrors.value
  );
});

// METHODS
const init = () => {
  //default init values
  values.value.waterColor =
    appStore.formExpertSections.basic.data.waterColorOptions[0];
  values.value.waterSmell =
    appStore.formExpertSections.basic.data.waterSmellOptions[0];
};
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>1. Inspección básica del tramo (500 m)</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field label="a. ¿El agua del río fluye?"> </b-field>
    <b-field>
      <b-radio-button
        v-model="values.waterFlow"
        :native-value="false"
        type="is-danger"
      >
        <b-icon icon="close"></b-icon>
        <span>No</span>
      </b-radio-button>
      <b-radio-button
        v-model="values.waterFlow"
        :native-value="true"
        type="is-success"
      >
        <b-icon icon="check"></b-icon>
        <span>Sí</span>
      </b-radio-button>
    </b-field>
    <b-field
      label="b. ¿Es el nivel del agua habitual para la época del año?"
      :message="{
        '*Hay que seleccionar una opción': waterLevelHasErrors,
      }"
      :type="{ 'is-danger': waterLevelHasErrors }"
    >
      <b-select
        v-model="values.waterLevel"
        icon="arrow-expand-vertical"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .waterLevelOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Si hay algún problema crítico, intenta explicar su causa:">
      <b-input
        v-model="values.waterLevelCriticalProblem"
        maxlength="200"
        type="textarea"
      ></b-input>
    </b-field>
    <b-field
      label="c. Anchura media del cauce (m)"
      :message="{
        '*Hay que seleccionar una opción': riverBedWidthHasErrors,
      }"
      :type="{ 'is-danger': riverBedWidthHasErrors }"
    >
      <b-select
        v-model="values.riverBedWidth"
        icon="arrow-expand-horizontal"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .riverBedWidthOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="d. Profundidad media del cauce (cm)"
      :message="{
        '*Hay que seleccionar una opción': riverBedDepthHasErrors,
      }"
      :type="{ 'is-danger': riverBedDepthHasErrors }"
      river-side-width-has-errors
    >
      <b-select
        v-model="values.riverBedDepth"
        icon="arrow-expand-down"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .riverBedDepthOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="e. Anchura media de la zona de ribera (m)"> </b-field>
    <div class="two-controls">
      <b-field
        label="Izquierda"
        :message="{
          '*Hay que seleccionar una opción': riverSideWidthLeftHasErrors,
        }"
        :type="{ 'is-danger': riverSideWidthLeftHasErrors }"
        custom-class="is-small"
      >
        <b-select
          v-model="values.riverSideWidthLeft"
          icon="arrow-expand-horizontal"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="(option, index) in appStore.formExpertSections.basic.data
              .riverSideWidthOptions"
            :key="index"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field
        label="Derecha"
        :message="{
          '*Hay que seleccionar una opción': riverSideWidthRightHasErrors,
        }"
        :type="{ 'is-danger': riverSideWidthRightHasErrors }"
        custom-class="is-small"
      >
        <b-select
          v-model="values.riverSideWidthRight"
          icon="arrow-expand-horizontal"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="(option, index) in appStore.formExpertSections.basic.data
              .riverSideWidthOptions"
            :key="index"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
    </div>
    <b-field label="f. ¿Qué color tiene el agua?">
      <b-select v-model="values.waterColor" icon="invert-colors">
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .waterColorOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="g. ¿Qué olor tiene el agua?">
      <b-select v-model="values.waterSmell" icon="grain">
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .waterSmellOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="h. Existen..."></b-field>
    <div class="block">
      <b-checkbox
        v-for="(option, index) in appStore.formExpertSections.basic.data
          .waterElementsOptions"
        :key="index"
        v-model="values.waterElements"
        :native-value="option"
      >
        {{ option.name }}
      </b-checkbox>
    </div>

    <b-field
      label="i. ¿En qué condiciones se encuentran las márgenes de nuestro río?"
      :message="{
        '*Selecciona, al menos, una condición en las márgenes':
          riverConditionsHasErrors,
      }"
      type="is-danger"
    >
    </b-field>
    <div class="checkboxes-rows">
      <label class="checkboxes-rows__title">izq.</label>
      <label class="checkboxes-rows__title">der.</label>
    </div>
    <div
      v-for="(option, index) in appStore.formExpertSections.basic.data
        .riverMarginConditionOptions"
      :key="index"
      class="checkboxes-rows"
    >
      <b-checkbox
        v-model="values.riverMarginConditionsLeft"
        :native-value="option"
      >
      </b-checkbox>
      <b-checkbox
        v-model="values.riverMarginConditionsRight"
        :native-value="option"
      >
      </b-checkbox>
      {{ option.name }}
    </div>
    <div class="checks-container">
      <b-field
        label="j. ¿Cuáles son los usos del suelo en las márgenes del río?"
        :message="{
          '*Selecciona, al menos, un uso del suelo en las márgenes':
            landUseHasErrors,
        }"
        type="is-danger"
      >
      </b-field>
      <div class="checkboxes-rows">
        <label class="checkboxes-rows__title">izq.</label>
        <label class="checkboxes-rows__title">der.</label>
      </div>
      <div
        v-for="(option, index) in appStore.formExpertSections.basic.data
          .riverMarginLandUseOptions"
        :key="index"
        class="checkboxes-rows"
      >
        <b-checkbox
          v-model="values.riverMarginLandUseLeft"
          :native-value="option"
        >
        </b-checkbox>
        <b-checkbox
          v-model="values.riverMarginLandUseRight"
          :native-value="option"
        >
        </b-checkbox>
        {{ option.name }}
      </div>
    </div>
  </div>
</template>
