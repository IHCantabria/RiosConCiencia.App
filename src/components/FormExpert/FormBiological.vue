<!-- eslint-disable promise/always-return -->
<script setup>
import { ref, onBeforeUpdate, computed, onMounted } from "vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const values = ref({
  riverEcosystem: [],
  riverEcosystemInvPlantsCoverage: [],
  riverEcosystemSpecies: [],
});

// LYFECYCLE
onMounted(() => {
  updateSpecificExpertSectionValues();
});

onBeforeUpdate(() => {
  if (appStore.formExpertSent) return;
  updateSpecificExpertSectionValues();
});

// COMPUTED
const invasorsComputed = computed(() => {
  const invasorsComputed =
    appStore.formExpertSections.biological.data.invasorPlantOptions;
  invasorsComputed.forEach((invasor) => {
    invasor.value =
      appStore.formExpertSections.biological.data.coverageOptions[2];
  });
  return invasorsComputed;
});
const isSectionValid = computed(() => {
  return true;
});

// METHODS
const updateSpecificExpertSectionValues = () => {
  appStore.updateSpecificExpertSectionValues({
    name: "biological",
    values: values.value,
    isValid: isSectionValid.value,
  });
};
const InvasorSelectedIndex = (option) => {
  return values.value.riverEcosystemInvPlantsCoverage.indexOf(option);
};
const CategoryOrder = (item) => {
  return `eukaryote${item.id}`;
};
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>4. Estudio de la biodiversidad (100 m)</span>
      </h5>
    </div>
    <b-field label="4.1  Inventario de especies de flora y fauna"> </b-field>
    <div
      v-for="(category, indexCat) in appStore.formExpertSections.biological.data
        .eukaryoteComplexOptions"
      :key="indexCat + 10"
      :class="['block', CategoryOrder(category)]"
    >
      <b-field
        v-if="category.name === 'Invertebrados'"
        label="4.2  Muestreo e identificación de macroinvertebrados bentónicos"
      />
      <div class="checkboxes-group">
        <span class="checkboxes-group__title">{{ category.name }}</span>
      </div>
      <div v-for="(group, indexGroup) in category.options" :key="indexGroup">
        <div class="checkboxes-group">
          <span class="checkboxes-group__subtitle">{{ group.name }}</span>
        </div>
        <div v-for="option in group.options" :key="option.id" class="field">
          <b-checkbox v-model="values.riverEcosystem" :native-value="option">
            {{ option.name }}
          </b-checkbox>
          <div
            v-for="subOpt in option.options"
            :key="subOpt.id"
            class="field sub-check"
          >
            <b-checkbox
              v-model="values.riverEcosystemSpecies"
              size="is-small"
              :native-value="subOpt"
            >
              {{ subOpt.name }}
            </b-checkbox>
          </div>
        </div>
      </div>
      <template v-if="category.id == 2">
        <div key="20" class="block">
          <div class="checkboxes-group">
            <span class="checkboxes-group__subtitle">
              Invasoras / Alóctonas (grado de cobertura) total parcial puntual
            </span>
          </div>
          <div
            v-for="option in invasorsComputed"
            :key="option.id"
            class="field"
          >
            <b-checkbox
              v-model="values.riverEcosystemInvPlantsCoverage"
              :native-value="option"
            >
              {{ option.name }}
            </b-checkbox>
            <div
              v-if="InvasorSelectedIndex(option) != -1"
              class="radio-rows__options-container"
            >
              <b-field>
                <b-radio-button
                  v-for="type in appStore.formExpertSections.biological.data
                    .coverageOptions"
                  :key="type.id"
                  v-model="
                    values.riverEcosystemInvPlantsCoverage[
                      InvasorSelectedIndex(option)
                    ].value
                  "
                  class="radio-rows__options-container-item"
                  :native-value="type"
                >
                  {{ type.name }}
                </b-radio-button>
              </b-field>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      v-for="(category, indexCatSimple) in appStore.formExpertSections
        .biological.data.eukaryoteSimpleOptions"
      :key="indexCatSimple"
      :class="['block', CategoryOrder(category)]"
    >
      <div class="checkboxes-group">
        <label class="checkboxes-group__title">{{ category.name }}</label>
      </div>
      <div v-for="option in category.options" :key="option.id" class="field">
        <b-checkbox v-model="values.riverEcosystem" :native-value="option">
          {{ option.name }}
        </b-checkbox>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-check {
  margin: 1rem;
}

.eukaryote1 {
  order: 1;
}

.eukaryote2 {
  order: 2;
}

.eukaryote3 {
  order: 3;
}

.eukaryote4 {
  order: 4;
}

.eukaryote5 {
  order: 5;
}

.eukaryote6 {
  order: 6;
}

.eukaryote7 {
  order: 7;
}

.eukaryote8 {
  order: 8;
}

.eukaryote9 {
  order: 9;
}
</style>
