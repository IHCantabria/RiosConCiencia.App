<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from "vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const pdfLink = ref(null);
const pdfLink2 = ref(null);
const values = ref({
  riverbankNaturalness: 0,
  riverbankConections: null,
  riverbankVegetations: null,
});

// LYFECYCLE
onMounted(() => {
  init();
  // TODO: Fix this
  // pdfLink.value = require("../../assets/pdfs/ribera.pdf");
  // pdfLink2.value = require("../../assets/pdfs/fichaQRISI2019.pdf");
});
onBeforeUpdate(() => {
  if (appStore.formExpertSent) return;
  values.value.qrisiIndex = qrisiIndex.value;
  appStore.updateSpecificExpertSectionValues({
    name: "riverQuality",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// COMPUTED
const qrisiIndexTotalPoints = computed(() => {
  if (isSectionValid.value) {
    return (
      parseInt(values.value.riverbankNaturalness.value) +
      parseInt(values.value.riverbankVegetations.value) +
      parseInt(values.value.riverbankConections.value)
    );
  }
  return 0;
});
const qrisiIndex = computed(() => {
  return {
    cat: getRiverQualityCategory(qrisiIndexTotalPoints.value),
    totalPoints: qrisiIndexTotalPoints.value,
  };
});
const naturalnessHasErrors = computed(() => {
  return values.value.riverbankNaturalness === null;
});
const vegetationsHasErrors = computed(() => {
  return values.value.riverbankVegetations === null;
});
const connectionsHasErrors = computed(() => {
  return values.value.riverbankConections === null;
});
const isSectionValid = computed(() => {
  return (
    !naturalnessHasErrors.value &&
    !vegetationsHasErrors.value &&
    !connectionsHasErrors.value
  );
});

// METHODS
const init = () => {
  values.value.riverbankNaturalness = null; //default value and make beforeUpdate hook jump
};
const getRiverQualityCategory = (totalPoints) => {
  if (totalPoints <= 4)
    return appStore.formExpertSections.riverQuality.data
      .qrisiCategoriesOptions[2];
  if (totalPoints > 4 && totalPoints <= 8)
    return appStore.formExpertSections.riverQuality.data
      .qrisiCategoriesOptions[1];
  return appStore.formExpertSections.riverQuality.data
    .qrisiCategoriesOptions[0];
};
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>7. Calidad del Bosque de Ribera (QRISI)</span>
      </h5>
      <div class="header-section__help">
        <a :href="pdfLink" class="header-section__help-item" target="_blank"
          ><b-icon icon="information-outline" type="is-primary"></b-icon
        ></a>
        <a :href="pdfLink2" class="header-section__help-item" target="_blank"
          ><b-icon icon="book-information-variant" type="is-primary"></b-icon
        ></a>
      </div>
    </div>
    <b-field label="a. Estructura de las riberas, grado de naturalidad">
    </b-field>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': naturalnessHasErrors,
      }"
      :type="{ 'is-danger': naturalnessHasErrors }"
    >
      <b-select
        v-model="values.riverbankNaturalness"
        icon="tree"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.riverQuality
            .data.riverbankNaturalnessOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="b. Conexión con las formas vegetales adyacentes"> </b-field>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': connectionsHasErrors,
      }"
      :type="{ 'is-danger': connectionsHasErrors }"
    >
      <b-select
        v-model="values.riverbankConections"
        icon="transition"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.riverQuality
            .data.riverbankConectionsOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="c. Continuidad de la vegetación"> </b-field>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': vegetationsHasErrors,
      }"
      :type="{ 'is-danger': vegetationsHasErrors }"
    >
      <b-select
        v-model="values.riverbankVegetations"
        icon="transit-connection"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.riverQuality
            .data.riverbankVegetationsOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <div v-if="isSectionValid">
      <b-field label="d. Valor del QRISI"> </b-field>
      <div class="results">
        <div class="block">
          <b-message
            :title="qrisiIndex.cat.name"
            class="results-display"
            type="is-info"
            :closable="false"
          >
            {{ qrisiIndex.cat.description }}
            <div class="results__rate">
              <b-rate
                v-model="qrisiIndex.cat.value"
                icon-pack="mdi"
                icon="star"
                :max="3"
                size="is-medium"
                :show-text="false"
                :disabled="true"
              >
              </b-rate>
            </div>
            <div class="block">{{ qrisiIndexTotalPoints }} puntos</div>
          </b-message>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.results {
  padding: 1rem;

  &__rate {
    padding: 1rem;
  }
}

.results-display {
  max-width: 500px;
}
</style>
