<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>6. Calidad Biológica del Agua</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field
      :message="{
        '*Seleccione una opción': bioQualityHasErrors
      }"
      :type="{ 'is-danger': bioQualityHasErrors }"
    >
      <b-select
        placeholder="Selecciona calidad biológica del agua"
        icon="thumbs-up-down"
        expanded=""
        v-model="values.bioQualityIndex"
      >
        <option
          v-for="(option, index) in formBiological.data.bioQualityOptions"
          :value="option"
          :key="index"
        >
          {{ option.name }}</option
        >
      </b-select>
    </b-field>
    <div class="results" v-if="values.bioQualityIndex !== null">
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
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      pdfLink: require("../assets/pdfs/diagnostico.pdf"),
      values: {
        bioQualityIndex: 0
      }
    };
  },
  computed: {
    ...mapState({
      formBiological: state => state.formSections.biological
    }),
    bioQualityHasErrors() {
      return this.values.bioQualityIndex === null;
    },
    isSectionValid() {
      return !this.bioQualityHasErrors;
    }
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificSectionValues({
      name: "biological",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificSectionValues: "updateSpecificSectionValues"
    }),
    init() {
      this.values.bioQualityIndex = null; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
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
