<template>
  <div class="form-section">
    <h5 class="title is-5">4. Índice del Hábitat Fluvial (100m)</h5>
    <b-field
      label="a. Grado de inclusión de las piedras, cantos y gravas en rápidos y pozas"
    >
      <b-select icon="gradient" v-model="values.stonesInPools">
        <option
          v-for="(option, index) in formHabitat.data.stonesInPoolsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="b. Frecuencia de rápidos">
      <b-select icon="waves" v-model="values.rapidsFrequency">
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

        <b-radio
          v-for="option in formHabitat.data.substrateCompositionPresenceOptions"
          :key="option.id"
          :native-value="option"
          v-model="values.substrateComposition[index].value"
          >{{ option.name }}</b-radio
        >
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
    <b-field>
      <b-select
        icon="format-list-bulleted-type"
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
    <b-field label="e. Sombre en el cauce">
      <b-select icon="box-shadow" v-model="values.riverShadows">
        <option
          v-for="(option, index) in formHabitat.data.riverShadowsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="f. Presencia de elementos de heterogeneidad"> </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(element, index) in values.randomElements"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ element.name }}
        </div>
        <b-radio
          v-for="option in formHabitat.data.randomElementPresenceOptions"
          :key="option.id"
          :native-value="option"
          v-model="values.randomElements[index].value"
          >{{ option.name }}</b-radio
        >
      </div>
    </div>
    <b-field label="g. Cobertura de la vegatación acúatica"> </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(type, index) in values.aquaticVegetation"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>
        <b-radio
          v-for="option in formHabitat.data.aquaticVegetationCoverageOptions"
          :key="option.id"
          :native-value="option"
          v-model="values.aquaticVegetation[index].value"
          >{{ option.name }}</b-radio
        >
      </div>
    </div>
    <b-field label="h. Valor del Índice del Hábitat Fluvial (IHF)"> </b-field>
    <div class="results">
      <div class="block">
        <b-message
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
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      values: {
        stonesInPools: {},
        substrateComposition: [],
        rapidsFrequency: {},
        velocityAndDepth: {},
        riverShadows: {},
        randomElements: [],
        aquaticVegetation: [],
        habitatIndex: {}
      },
      velocityAndDepthTypes: [
        "rápido / profundo",
        "lento / profundo",
        "lento / poco profundo",
        "rápido / poco profundo"
      ]
    };
  },
  computed: {
    ...mapState({
      formHabitat: state => state.formSections.habitat
    }),
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
        parseInt(this.values.stonesInPools.points) +
        parseInt(this.values.rapidsFrequency.points) +
        parseInt(this.substrateCompositionSUM) +
        parseInt(this.values.velocityAndDepth.points) +
        parseInt(this.values.riverShadows.points) +
        parseInt(this.randomElementsSUM) +
        parseInt(this.aquaticVegetationSUM)
      );
    },
    habitatIndex() {
      return {
        cat: this.getHabitatCategory(this.habitatIndexTotalPoints),
        totalPoints: this.habitatIndexTotalPoints
      };
    },
    substrateHasErrors() {
      for (let element of this.values.substrateComposition) {
        if (Object.keys(element.value).length === 0) return true;
      }
      return false;
    },
    isSectionValid() {
      return !this.substrateHasErrors;
    }
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.values.habitatIndex = this.habitatIndex;
    this.updateSectionValues({
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSectionValues: "updateSectionValues"
    }),
    init() {
      this.values.stonesInPools = this.formHabitat.data.stonesInPoolsOptions[0];
      this.values.rapidsFrequency = this.formHabitat.data.rapidFrequencyOptions[0];
      this.values.velocityAndDepth = this.formHabitat.data.velocityAndDepthOptions[0];
      this.values.riverShadows = this.formHabitat.data.riverShadowsOptions[0];
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
</style>
