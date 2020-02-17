<template>
  <div class="form-section">
    <h5 class="title is-5">7. Calidad del Bosque de Ribera (QRISI)</h5>
    <b-field label="a. Estructura de las riberas, grado de naturalidad">
    </b-field>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': naturalnessHasErrors
      }"
      :type="{ 'is-danger': naturalnessHasErrors }"
    >
      <b-select
        icon="tree"
        v-model="values.riverbankNaturalness"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in formRiverQuality.data
            .riverbankNaturalnessOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="b. Conexión con las formas vegetales adyacentes"> </b-field>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': connectionsHasErrors
      }"
      :type="{ 'is-danger': connectionsHasErrors }"
    >
      <b-select
        icon="transition"
        v-model="values.riverbankConections"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in formRiverQuality.data
            .riverbankConectionsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="c. Continuidad de la vegetación"> </b-field>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': vegetationsHasErrors
      }"
      :type="{ 'is-danger': vegetationsHasErrors }"
    >
      <b-select
        icon="transit-connection"
        v-model="values.riverbankVegetations"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in formRiverQuality.data
            .riverbankVegetationsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <div v-if="isSectionValid">
      <b-field label="d. Valor del QRISI"> </b-field>
      <div class="results">
        <div class="block">
          <b-message
            :title="qrisiIndex.cat.name"
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
          </b-message>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      pdfLink: require("../assets/pdfs/ribera.pdf"),
      values: {
        riverbankNaturalness: null,
        riverbankConections: null,
        riverbankVegetations: null
      }
    };
  },
  computed: {
    ...mapState({
      formRiverQuality: state => state.formSections.riverQuality
    }),
    qrisiIndexTotalPoints() {
      if (this.isSectionValid) {
        return (
          parseInt(this.values.riverbankNaturalness.value) +
          parseInt(this.values.riverbankVegetations.value) +
          parseInt(this.values.riverbankConections.value)
        );
      }
      return 0;
    },
    qrisiIndex() {
      return {
        cat: this.getRiverQualityCategory(this.qrisiIndexTotalPoints),
        totalPoints: this.qrisiIndexTotalPoints
      };
    },
    naturalnessHasErrors() {
      return this.values.riverbankNaturalness === null;
    },
    vegetationsHasErrors() {
      return this.values.riverbankVegetations === null;
    },
    connectionsHasErrors() {
      return this.values.riverbankConections === null;
    },
    isSectionValid() {
      return (
        !this.naturalnessHasErrors &&
        !this.vegetationsHasErrors &&
        !this.connectionsHasErrors
      );
    }
  },
  beforeUpdate() {
    this.values.qrisiIndex = this.qrisiIndex;
    this.updateSectionValues({
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSectionValues: "updateSectionValues"
    }),
    getRiverQualityCategory(totalPoints) {
      if (totalPoints <= 4)
        return this.formRiverQuality.data.qrisiCategoriesOptions[2];
      if (totalPoints > 4 && totalPoints <= 8)
        return this.formRiverQuality.data.qrisiCategoriesOptions[1];
      return this.formRiverQuality.data.qrisiCategoriesOptions[0];
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
</style>
