<template>
  <div class="form-section">
    <h5 class="title is-5">7. Calidad del Bosque de Ribera (QRISI)</h5>
    <b-field label="a. Estructura de las riberas, grado de naturalidad">
    </b-field>
    <b-field>
      <b-select icon="tree" v-model="riverbankNaturalness">
        <option
          v-for="(option,
          index) in formRiverQualityData.riverbankNaturalnessOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="b. Conexión con las formas vegetales adyacentes"> </b-field>
    <b-field>
      <b-select icon="transition" v-model="riverbankConections">
        <option
          v-for="(option,
          index) in formRiverQualityData.riverbankConectionsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="c. Continuidad de la vegetación"> </b-field>
    <b-field>
      <b-select icon="transit-connection" v-model="riverbankVegetations">
        <option
          v-for="(option,
          index) in formRiverQualityData.riverbankVegetationsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="d. Valor del QRISI"> </b-field>
    <div class="results">
      <div class="block">
        <b-message :title="qrisi.name" type="is-info" :closable="false">
          {{ qrisi.description }}
          <div class="results__rate">
            <b-rate
              v-model="qrisi.value"
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
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      riverbankNaturalness: {},
      riverbankConections: {},
      riverbankVegetations: {}
    };
  },
  computed: {
    ...mapState({
      formRiverQualityData: state => state.formSections.riverQuality.data
    }),
    qrisiValue() {
      return (
        parseInt(this.riverbankNaturalness.value) +
        parseInt(this.riverbankVegetations.value) +
        parseInt(this.riverbankConections.value)
      );
    },
    qrisi() {
      if (this.qrisiValue <= 4)
        return this.formRiverQualityData.qrisiCategoriesOptions[2];
      if (this.qrisiValue > 4 && this.qrisiValue <= 8)
        return this.formRiverQualityData.qrisiCategoriesOptions[1];
      return this.formRiverQualityData.qrisiCategoriesOptions[0];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.riverbankNaturalness = this.formRiverQualityData.riverbankNaturalnessOptions[0];
      this.riverbankConections = this.formRiverQualityData.riverbankConectionsOptions[0];
      this.riverbankVegetations = this.formRiverQualityData.riverbankVegetationsOptions[0];
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
