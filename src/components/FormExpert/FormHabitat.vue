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
        '*Hay que seleccionar una opción': stonesInPoolsHasErrors
      }"
      :type="{ 'is-danger': stonesInPoolsHasErrors }"
    >
      <b-select
        icon="gradient"
        placeholder="Seleccione una opción"
        v-model="values.stonesInPools"
      >
        <option
          v-for="(option, index) in formHabitat.data.stonesInPoolsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field
      label="b. Frecuencia de rápidos"
      :message="{
        '*Hay que seleccionar una opción': rapidsFrequencyHasErrors
      }"
      :type="{ 'is-danger': rapidsFrequencyHasErrors }"
    >
      <b-select
        icon="waves"
        placeholder="Seleccione una opción"
        v-model="values.rapidsFrequency"
      >
        <option
          v-for="(option, index) in formHabitat.data.rapidFrequencyOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field
      label="c. Composición del sustrato"
      :message="{
        '*Hay que seleccionar una opción para cada elemento': substrateHasErrors
      }"
      :type="{ 'is-danger': substrateHasErrors }"
    >
    </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(type, index) in values.substrateComposition"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>
        <div class="radio-rows__options-container">
          <b-field>
            <b-radio-button
              v-for="option in formHabitat.data
                .substrateCompositionPresenceOptions"
              :key="option.id"
              :native-value="option"
              v-model="values.substrateComposition[index].value"
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
        '*Hay que seleccionar una opción': velocityAndDepthHasErrors
      }"
      :type="{ 'is-danger': velocityAndDepthHasErrors }"
    >
      <b-select
        icon="format-list-bulleted-type"
        placeholder="Seleccione una opción"
        v-model="values.velocityAndDepth"
      >
        <option
          v-for="(option, index) in formHabitat.data.velocityAndDepthOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field
      label="e. Sombra en el cauce"
      :message="{
        '*Hay que seleccionar una opción': riverShadowsHasErrors
      }"
      :type="{ 'is-danger': riverShadowsHasErrors }"
    >
      <b-select
        icon="box-shadow"
        placeholder="Seleccione una opción"
        v-model="values.riverShadows"
      >
        <option
          v-for="(option, index) in formHabitat.data.riverShadowsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field
      label="f. Presencia de elementos de heterogeneidad"
      :message="{
        '*Hay que seleccionar una opción para cada elemento': randomElementsHasErrors
      }"
      :type="{ 'is-danger': randomElementsHasErrors }"
    >
    </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(element, index) in values.randomElements"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ element.name }}
        </div>
        <div class="radio-rows__options-container">
          <template v-if="element.id != 1">
            <b-field>
              <b-radio-button
                class="radio-rows__options-container-item"
                v-for="option in randomElementPresenceOptionsFilter"
                :key="option.id"
                :native-value="option"
                v-model="values.randomElements[index].value"
                >{{ option.name }}</b-radio-button
              ></b-field
            >
          </template>
          <template v-else>
            <b-field>
              <b-radio-button
                class="radio-rows__options-container-item"
                v-for="option in formHabitat.data.randomElementPresenceOptions"
                :key="option.id"
                :native-value="option"
                v-model="values.randomElements[index].value"
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
        '*Hay que seleccionar una opción para cada elemento': aquaticVegetationHasErrors
      }"
      :type="{ 'is-danger': aquaticVegetationHasErrors }"
    >
    </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(type, index) in values.aquaticVegetation"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>
        <div class="radio-rows__options-container">
          <b-field>
            <b-radio-button
              class="radio-rows__options-container-item"
              v-for="option in formHabitat.data
                .aquaticVegetationCoverageOptions"
              :key="option.id"
              :native-value="option"
              v-model="values.aquaticVegetation[index].value"
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
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      pdfLink: null,
      pdfLink2: null,
      values: {
        stonesInPools: null,
        substrateComposition: [],
        rapidsFrequency: null,
        velocityAndDepth: null,
        riverShadows: null,
        randomElements: [],
        aquaticVegetation: [],
        habitatIndex: null
      },
      velocityAndDepthTypes: [
        "rápido / profundo",
        "lento / profundo",
        "lento / poco profundo",
        "rápido / poco profundo"
      ]
    };
  },
  created() {
    this.pdfLink = require("../../assets/pdfs/habitat.pdf");
    this.pdfLink2 = require("../../assets/pdfs/fichaIHF2019.pdf");
  },
  computed: {
    ...mapState({
      formHabitat: state => state.formExpertSections.habitat
    }),
    randomElementPresenceOptionsFilter() {
      return this.formHabitat.data.randomElementPresenceOptions.filter(
        element => element.id != 2
      );
    },
    substrateCompositionSUM() {
      return this.getTotalPoints(this.values.substrateComposition);
    },
    randomElementsSUM() {
      return this.getTotalPoints(this.values.randomElements);
    },
    aquaticVegetationSUM() {
      return this.getTotalPoints(this.values.aquaticVegetation);
    },
    habitatIndexTotalPoints() {
      return (
        parseInt(
          this.values.stonesInPools ? this.values.stonesInPools.points : 0
        ) +
        parseInt(
          this.values.rapidsFrequency ? this.values.rapidsFrequency.points : 0
        ) +
        parseInt(this.substrateCompositionSUM) +
        parseInt(
          this.values.velocityAndDepth ? this.values.velocityAndDepth.points : 0
        ) +
        parseInt(
          this.values.riverShadows ? this.values.riverShadows.points : 0
        ) +
        parseInt(this.randomElementsSUM) +
        parseInt(this.aquaticVegetationSUM)
      );
    },
    habitatIndex() {
      return this.isSectionValid
        ? {
            cat: this.getHabitatCategory(this.habitatIndexTotalPoints),
            totalPoints: this.habitatIndexTotalPoints
          }
        : null;
    },
    substrateHasErrors() {
      for (let element of this.values.substrateComposition) {
        if (Object.keys(element.value).length === 0) return true;
      }
      return false;
    },
    randomElementsHasErrors() {
      for (let element of this.values.randomElements) {
        if (Object.keys(element.value).length === 0) return true;
      }
      return false;
    },
    aquaticVegetationHasErrors() {
      for (let element of this.values.aquaticVegetation) {
        if (Object.keys(element.value).length === 0) return true;
      }
      return false;
    },
    stonesInPoolsHasErrors() {
      return this.values.stonesInPools === null;
    },
    rapidsFrequencyHasErrors() {
      return this.values.rapidsFrequency === null;
    },
    velocityAndDepthHasErrors() {
      return this.values.velocityAndDepth === null;
    },
    riverShadowsHasErrors() {
      return this.values.riverShadows === null;
    },
    isSectionValid() {
      return (
        !this.substrateHasErrors &&
        !this.randomElementsHasErrors &&
        !this.stonesInPoolsHasErrors &&
        !this.rapidsFrequencyHasErrors &&
        !this.velocityAndDepthHasErrors &&
        !this.riverShadowsHasErrors &&
        !this.aquaticVegetationHasErrors
      );
    }
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.values.habitatIndex = this.habitatIndex;
    this.updateSpecificExpertSectionValues({
      name: "habitat",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificExpertSectionValues: "updateSpecificExpertSectionValues"
    }),
    init() {
      this.prepareComplexObjects();
    },
    prepareComplexObjects() {
      //for objects that needs "value" as another object. ie: values with "points".
      for (const element of this.formHabitat.data.substrateCompositionOptions) {
        this.values.substrateComposition.push({ ...element, value: {} });
      }
      for (const element of this.formHabitat.data.aquaticVegetationOptions) {
        this.values.aquaticVegetation.push({ ...element, value: {} });
      }
      for (const element of this.formHabitat.data.randomElementOptions) {
        this.values.randomElements.push({ ...element, value: {} });
      }
    },
    getTotalPoints(items) {
      var sum = 0;
      for (const item of items) {
        if (item.value.points) {
          sum = sum + item.value.points;
        }
      }
      return sum;
    },
    getHabitatCategory(totalPoints) {
      if (totalPoints > 60)
        return this.formHabitat.data.habitatIndexCategoriesOptions[0];
      if (this.habitatIndexTotalPoints < 40)
        return this.formHabitat.data.habitatIndexCategoriesOptions[2];

      return this.formHabitat.data.habitatIndexCategoriesOptions[1];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
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
