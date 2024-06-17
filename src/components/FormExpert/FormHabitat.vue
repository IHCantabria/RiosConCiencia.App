<script setup>
import { ref, onMounted, onBeforeUpdate, computed } from "vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const pdfLink = ref(null);
const pdfLink2 = ref(null);
const values = ref({
  stonesInPools: null,
  substrateComposition: [],
  rapidsFrequency: null,
  velocityAndDepth: null,
  riverShadows: null,
  randomElements: [],
  aquaticVegetation: [],
  habitatIndex: null,
});
const velocityAndDepthTypes = [
  "rápido / profundo",
  "lento / profundo",
  "lento / poco profundo",
  "rápido / poco profundo",
];

// LYFECYCLE
onMounted(() => {
  init();
  // TODO: Fix this
  // pdfLink.value = require("../../assets/pdfs/habitat.pdf");
  // pdfLink2.value = require("../../assets/pdfs/fichaIHF2019.pdf");
});
onBeforeUpdate(() => {
  values.value.habitatIndex = habitatIndex.value;
  appStore.updateSpecificExpertSectionValues({
    name: "habitat",
    values: values.value,
    isValid: isSectionValid.value,
  });
});
// COMPUTED
const randomElementPresenceOptionsFilter = computed(() => {
  return appStore.formExpertSections.habitat.data.randomElementPresenceOptions.filter(
    (element) => element.id != 2,
  );
});
const substrateCompositionSUM = computed(() => {
  return getTotalPoints(values.value.substrateComposition);
});
const randomElementsSUM = computed(() => {
  return getTotalPoints(values.value.randomElements);
});
const aquaticVegetationSUM = computed(() => {
  return getTotalPoints(values.value.aquaticVegetation);
});
const habitatIndexTotalPoints = computed(() => {
  return (
    parseInt(
      values.value.stonesInPools ? values.value.stonesInPools.points : 0,
    ) +
    parseInt(
      values.value.rapidsFrequency ? values.value.rapidsFrequency.points : 0,
    ) +
    parseInt(substrateCompositionSUM.value) +
    parseInt(
      values.value.velocityAndDepth ? values.value.velocityAndDepth.points : 0,
    ) +
    parseInt(values.value.riverShadows ? values.value.riverShadows.points : 0) +
    parseInt(randomElementsSUM.value) +
    parseInt(aquaticVegetationSUM.value)
  );
});
const habitatIndex = computed(() => {
  return isSectionValid.value
    ? {
        cat: getHabitatCategory(habitatIndexTotalPoints.value),
        totalPoints: habitatIndexTotalPoints.value,
      }
    : null;
});
const substrateHasErrors = computed(() => {
  for (const element of values.value.substrateComposition) {
    if (Object.keys(element.value).length === 0) return true;
  }
  return false;
});
const randomElementsHasErrors = computed(() => {
  for (const element of values.value.randomElements) {
    if (Object.keys(element.value).length === 0) return true;
  }
  return false;
});
const aquaticVegetationHasErrors = computed(() => {
  for (const element of values.value.aquaticVegetation) {
    if (Object.keys(element.value).length === 0) return true;
  }
  return false;
});
const stonesInPoolsHasErrors = computed(() => {
  return values.value.stonesInPools === null;
});
const rapidsFrequencyHasErrors = computed(() => {
  return values.value.rapidsFrequency === null;
});
const velocityAndDepthHasErrors = computed(() => {
  return values.value.velocityAndDepth === null;
});
const riverShadowsHasErrors = computed(() => {
  return values.value.riverShadows === null;
});
const isSectionValid = computed(() => {
  return (
    !substrateHasErrors.value &&
    !randomElementsHasErrors.value &&
    !stonesInPoolsHasErrors.value &&
    !rapidsFrequencyHasErrors.value &&
    !velocityAndDepthHasErrors.value &&
    !riverShadowsHasErrors.value &&
    !aquaticVegetationHasErrors.value
  );
});

// METHODS
const init = () => {
  prepareComplexObjects();
};
const prepareComplexObjects = () => {
  //for objects that needs "value" as another object. ie: values with "points".
  for (const element of appStore.formExpertSections.habitat.data
    .substrateCompositionOptions) {
    values.value.substrateComposition.push({ ...element, value: {} });
  }
  for (const element of appStore.formExpertSections.habitat.data
    .aquaticVegetationOptions) {
    values.value.aquaticVegetation.push({ ...element, value: {} });
  }
  for (const element of appStore.formExpertSections.habitat.data
    .randomElementOptions) {
    values.value.randomElements.push({ ...element, value: {} });
  }
};
const getTotalPoints = (items) => {
  let sum = 0;
  for (const item of items) {
    if (item.value.points) {
      sum = sum + item.value.points;
    }
  }
  return sum;
};
const getHabitatCategory = (totalPoints) => {
  if (totalPoints > 60)
    return appStore.formExpertSections.habitat.data
      .habitatIndexCategoriesOptions[0];
  if (habitatIndexTotalPoints.value < 40)
    return appStore.formExpertSections.habitat.data
      .habitatIndexCategoriesOptions[2];

  return appStore.formExpertSections.habitat.data
    .habitatIndexCategoriesOptions[1];
};
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>4. El hábitat fluvial (100 m)</span>
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
    <b-field
      label="a. Grado de inclusión de las piedras, cantos y gravas en rápidos y pozas"
      :message="{
        '*Hay que seleccionar una opción': stonesInPoolsHasErrors,
      }"
      :type="{ 'is-danger': stonesInPoolsHasErrors }"
    >
      <b-select
        v-model="values.stonesInPools"
        icon="gradient-vertical"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.habitat.data
            .stonesInPoolsOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="b. Frecuencia de rápidos"
      :message="{
        '*Hay que seleccionar una opción': rapidsFrequencyHasErrors,
      }"
      :type="{ 'is-danger': rapidsFrequencyHasErrors }"
    >
      <b-select
        v-model="values.rapidsFrequency"
        icon="waves"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.habitat.data
            .rapidFrequencyOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="c. Composición del sustrato"
      :message="{
        '*Hay que seleccionar una opción para cada elemento':
          substrateHasErrors,
      }"
      :type="{ 'is-danger': substrateHasErrors }"
    >
    </b-field>
    <div class="block">
      <div
        v-for="(type, index) in values.substrateComposition"
        :key="index"
        class="radio-rows"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>
        <div class="radio-rows__options-container">
          <b-field>
            <b-radio-button
              v-for="option in appStore.formExpertSections.habitat.data
                .substrateCompositionPresenceOptions"
              :key="option.id"
              v-model="values.substrateComposition[index].value"
              :native-value="option"
              >{{ option.name }}</b-radio-button
            >
          </b-field>
        </div>
      </div>
    </div>
    <b-field label="d. Regímenes de velocidad y profundidad"> </b-field>
    <b-taglist>
      <b-tag
        v-for="(type, index) in velocityAndDepthTypes"
        :key="index"
        type="is-info"
        >{{ type }}</b-tag
      >
    </b-taglist>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': velocityAndDepthHasErrors,
      }"
      :type="{ 'is-danger': velocityAndDepthHasErrors }"
    >
      <b-select
        v-model="values.velocityAndDepth"
        icon="format-list-bulleted-type"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.habitat.data
            .velocityAndDepthOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="e. Sombra en el cauce"
      :message="{
        '*Hay que seleccionar una opción': riverShadowsHasErrors,
      }"
      :type="{ 'is-danger': riverShadowsHasErrors }"
    >
      <b-select
        v-model="values.riverShadows"
        icon="box-shadow"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.habitat.data
            .riverShadowsOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="f. Presencia de elementos de heterogeneidad"
      :message="{
        '*Hay que seleccionar una opción para cada elemento':
          randomElementsHasErrors,
      }"
      :type="{ 'is-danger': randomElementsHasErrors }"
    >
    </b-field>
    <div class="block">
      <div
        v-for="(element, index) in values.randomElements"
        :key="index"
        class="radio-rows"
      >
        <div class="radio-rows__label-container">
          {{ element.name }}
        </div>
        <div class="radio-rows__options-container">
          <template v-if="element.id != 1">
            <b-field>
              <b-radio-button
                v-for="option in randomElementPresenceOptionsFilter"
                :key="option.id"
                v-model="values.randomElements[index].value"
                class="radio-rows__options-container-item"
                :native-value="option"
                >{{ option.name }}</b-radio-button
              ></b-field
            >
          </template>
          <template v-else>
            <b-field>
              <b-radio-button
                v-for="option in appStore.formExpertSections.habitat.data
                  .randomElementPresenceOptions"
                :key="option.id"
                v-model="values.randomElements[index].value"
                class="radio-rows__options-container-item"
                :native-value="option"
                >{{ option.name }}</b-radio-button
              ></b-field
            >
          </template>
        </div>
      </div>
    </div>
    <b-field
      label="g. Cobertura de la vegetación acuática"
      :message="{
        '*Hay que seleccionar una opción para cada elemento':
          aquaticVegetationHasErrors,
      }"
      :type="{ 'is-danger': aquaticVegetationHasErrors }"
    >
    </b-field>
    <div class="block">
      <div
        v-for="(type, index) in values.aquaticVegetation"
        :key="index"
        class="radio-rows"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>
        <div class="radio-rows__options-container">
          <b-field>
            <b-radio-button
              v-for="option in appStore.formExpertSections.habitat.data
                .aquaticVegetationCoverageOptions"
              :key="option.id"
              v-model="values.aquaticVegetation[index].value"
              class="radio-rows__options-container-item"
              :native-value="option"
              >{{ option.name }}</b-radio-button
            ></b-field
          >
        </div>
      </div>
    </div>
    <div v-if="values.habitatIndex !== null">
      <b-field label="h. Valor del Índice del Hábitat Fluvial (IHF)"> </b-field>
      <div class="results">
        <div class="block">
          <b-message
            class="results-display"
            :title="habitatIndex.cat.name"
            type="is-info"
            :closable="false"
          >
            {{ habitatIndex.cat.description }}
            <div class="results__rate">
              <b-rate
                v-model="habitatIndex.cat.value"
                icon-pack="mdi"
                icon="star"
                :max="3"
                size="is-medium"
                :show-text="false"
                :disabled="true"
              >
              </b-rate>
            </div>
            <div class="block">{{ habitatIndexTotalPoints }} puntos</div>
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
