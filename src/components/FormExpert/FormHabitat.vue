<script setup>
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { downloadPDF } from "@/utils/download-pdf";
import manualHabitatPDF from "@/assets/pdfs/2_Habitat_Fluvial.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const values = ref({
  rapidsFrequencies: [],
  substrateComposition: [],
  riverShadows: null,
  randomElements: [],
  stonesInPools: null,
  transversalObstacle: null,
});

// LYFECYCLE
onMounted(() => {
  init();
});
// COMPUTED
const randomElementPresenceOptionsFilter = computed(() => {
  return appStore.formExpertSections.habitat.data.randomElementPresenceOptions.filter(
    (element) => element.id != 2,
  );
});
const substrateHasErrors = computed(() => {
  for (const element of values.value.substrateComposition) {
    if (Object.keys(element.value).length === 0) return true;
  }
  return false;
});
const rapidFrequencyHasErrors = computed(() => {
  for (const element of values.value.rapidsFrequencies) {
    if (Object.keys(element.value).length === 0) return true;
  }
  return false;
});
const stonesInPoolsHasErrors = computed(() => {
  return values.value.stonesInPools === null;
});
// const aquaticTransversalObstacleHasErrors = computed(() => {
//   return values.value.transversalObstacle === null;
// });
const randomElementsHasErrors = computed(() => {
  for (const element of values.value.randomElements) {
    if (Object.keys(element.value).length === 0) return true;
  }
  return false;
});
const riverShadowsHasErrors = computed(() => {
  return values.value.riverShadows === null;
});
const isSectionValid = computed(() => {
  return (
    !substrateHasErrors.value &&
    !stonesInPoolsHasErrors.value &&
    // !aquaticTransversalObstacleHasErrors.value &&
    !rapidFrequencyHasErrors.value &&
    !randomElementsHasErrors.value &&
    !riverShadowsHasErrors.value
  );
});

// METHODS
const init = () => {
  prepareComplexObjects();
};
const prepareComplexObjects = () => {
  //for objects that needs "value" as another object. ie: values with "points".
  for (const element of appStore.formExpertSections.habitat.data
    .rapidFrequencyOptions) {
    values.value.rapidsFrequencies.push({ ...element, value: {} });
  }
  for (const element of appStore.formExpertSections.habitat.data
    .substrateCompositionOptions) {
    values.value.substrateComposition.push({ ...element, value: {} });
  }
  for (const element of appStore.formExpertSections.habitat.data
    .randomElementOptions) {
    values.value.randomElements.push({ ...element, value: {} });
  }
};
const updateSpecificExpertSectionValues = () => {
  if (appStore.formExpertSent) return;
  appStore.updateSpecificExpertSectionValues({
    name: "habitat",
    values: values.value,
    isValid: isSectionValid.value,
  });
};

const lastClicked = ref(null);

// WATCH
watch(
  values.value,
  async () => {
    await nextTick();
    updateSpecificExpertSectionValues();
    // If the last clicked element is not null, set the value of the other elements to "Presente"
    if (lastClicked.value)
      setMainValue(
        lastClicked.value.array,
        lastClicked.value.index,
        lastClicked.value.formCategory,
      );
  },
  { deep: true },
);

const setMainValue = async (array, index, formCategory) => {
  // Filter the elements with the name "Principal"
  const filteredElements = JSON.parse(JSON.stringify(array)).filter(
    (element) => element.value.name === "Principal",
  );
  // If there is more than one element with the name "Principal", set the value of the other elements to "Presente"
  if (filteredElements.length > 1) {
    array.map((element) => {
      if (
        element.value.name === "Principal" &&
        element.id !== array[index].id
      ) {
        // Find the original element in the array in the store since the buefy component checks the reference. A copy won't work.
        array[array.findIndex((e) => e.id === element.id)].value =
          appStore.formExpertSections.habitat.data[formCategory].find(
            (option) => option.name === "Presente",
          );
        updateSpecificExpertSectionValues();
      }
    });
  }
};

// Save the last clicked element to set the value of the other elements to "Presente"
const setLastClick = (array, index, formCategory) => {
  lastClicked.value = {
    array,
    index,
    formCategory,
  };
};
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>2. Hábitat fluvial</span>
      </h5>
      <div class="header-section__help">
        <a
          class="header-section__help-item"
          @click="downloadPDF(manualHabitatPDF, 'Manual de Hábitat fluivial')"
          ><b-icon icon="information-outline" type="is-primary"></b-icon
        ></a>
      </div>
    </div>
    <b-field
      label="2.1 Movilidad de sedimentos:"
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
      label="2.2 Tipo de estructura longitudinal:"
      :message="{
        '*Hay que seleccionar una opción para cada elemento':
          rapidFrequencyHasErrors,
      }"
      :type="{ 'is-danger': rapidFrequencyHasErrors }"
    >
    </b-field>
    <div class="block">
      <div
        v-for="(type, index) in values.rapidsFrequencies"
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
                .rapidFrequencyPresenceOptions"
              :key="option.id"
              v-model="values.rapidsFrequencies[index].value"
              :native-value="option"
              @click="
                setLastClick(
                  values.rapidsFrequencies,
                  index,
                  'rapidFrequencyPresenceOptions',
                )
              "
              >{{ option.name }}</b-radio-button
            >
          </b-field>
        </div>
      </div>
    </div>
    <b-field
      label="2.3 Composición del sustrato:"
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
              @click="
                setLastClick(
                  values.substrateComposition,
                  index,
                  'substrateCompositionPresenceOptions',
                )
              "
              >{{ option.name }}</b-radio-button
            >
          </b-field>
        </div>
      </div>
    </div>
    <b-field
      label="2.4 Sombra en el cauce:"
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
      label="2.5 Presencia de elementos de heterogeneidad:"
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
    <b-field label=" 2.6 Presencia de obstáculos transversales:">
      <b-select
        v-model="values.transversalObstacle"
        icon="bridge"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.habitat.data
            .aquaticTransversalObstacleOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
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
