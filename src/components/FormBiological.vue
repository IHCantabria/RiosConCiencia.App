<template>
  <div class="form-section">
    <h5 class="title is-5">
      <a :href="pdfLink" target="_blank"
        ><b-icon icon="book-information-variant" type="is-primary"></b-icon></a
      ><span>6. Calidad Biológica del Agua</span>
    </h5>
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
        bioQualityIndex: null
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
    })
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
</style>
