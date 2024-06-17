<script setup>
import { ref, computed, onMounted, onBeforeUpdate } from "vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const pdfLink = ref(null);
const values = ref({
  bioQualityIndex: 0,
});

// LYFECYCLE
onMounted(() => {
  init();
  // TODO: Fix this
  // this.pdfLink = require("../../assets/pdfs/diagnostico.pdf");
});
onBeforeUpdate(() => {
  appStore.updateSpecificExpertSectionValues({
    name: "biological",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// COMPUTED
const bioQualityHasErrors = computed(() => {
  return values.value.bioQualityIndex === null;
});
const isSectionValid = computed(() => {
  return !bioQualityHasErrors.value;
});

// METHODS
const init = () => {
  values.value.bioQualityIndex = null; //default value and make beforeUpdate hook jump
};
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>6. Calidad biológica del agua</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field
      :message="{
        '*Seleccione una opción': bioQualityHasErrors,
      }"
      :type="{ 'is-danger': bioQualityHasErrors }"
    >
      <b-select
        v-model="values.bioQualityIndex"
        placeholder="Selecciona calidad biológica del agua"
        icon="thumbs-up-down"
        expanded=""
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.biological.data
            .bioQualityOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <div v-if="values.bioQualityIndex !== null" class="results">
      <div class="block">
        <b-message
          class="results-display"
          :title="values.bioQualityIndex.name"
          type="is-info"
          :closable="false"
        >
          {{ values.bioQualityIndex.description }}
          <div class="results__rate">
            <b-rate
              v-model="values.bioQualityIndex.value"
              icon-pack="mdi"
              icon="star"
              size="is-medium"
              :show-text="false"
              :disabled="true"
            >
            </b-rate>
          </div>
        </b-message>
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
