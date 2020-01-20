<template>
  <div class="form-section">
    <h5 class="title is-5">4. Índice del Hábitat Fluvial (100m)</h5>
    <b-field
      label="a. Grado de inclusión de las piedras, cantos y gravas en rápidos y pozas"
    >
      <b-select icon="gradient" v-model="stonesInPools">
        <option
          v-for="(option, index) in formHabitatData.stonesInPoolsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="b. Frecuencia de rápidos">
      <b-select icon="waves" v-model="rapidsFrequency">
        <option
          v-for="(option, index) in formHabitatData.rapidFrequencyOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="c. Composición del sustrato"> </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(type, index) in substrateComposition"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>

        <b-radio
          v-for="option in formHabitatData.substrateCompositionPresenceOptions"
          :key="option.id"
          :native-value="option"
          v-model="substrateComposition[index].value"
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
      <b-select icon="waves" v-model="velocityAndDepth">
        <option
          v-for="(option, index) in formHabitatData.velocityAndDepthOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="e. Sombre en el cauce">
      <b-select icon="waves" v-model="riverShadows">
        <option
          v-for="(option, index) in formHabitatData.riverShadowsOptions"
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
        v-for="(element, index) in randomElements"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ element.name }}
        </div>
        <b-radio
          v-for="option in formHabitatData.randomElementPresenceOptions"
          :key="option.id"
          :native-value="option"
          v-model="randomElements[index].value"
          >{{ option.name }}</b-radio
        >
      </div>
    </div>
    <b-field label="g. Cobertura de la vegatación acúatica"> </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(type, index) in aquaticVegetation"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>
        <b-radio
          v-for="option in formHabitatData.aquaticVegetationCoverageOptions"
          :key="option.id"
          :native-value="option"
          v-model="aquaticVegetation[index].value"
          >{{ option.name }}</b-radio
        >
      </div>
    </div>
    <b-field label="h. Valor del Índice del Hábitat Fluvial (IHF)"> </b-field>
    <b-rate
      v-model="indiceHabitatFluvial"
      icon-pack="mdi"
      icon="star"
      :max="ihfRateConfig.max"
      size="is-medium"
      :show-text="true"
      :disabled="true"
      :texts="ihfRateConfig.texts"
    >
    </b-rate>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      formHabitatData: state => state.formSections.habitat.data
    })
  },
  data() {
    return {
      indiceHabitatFluvial: 1,
      ihfRateConfig: {
        max: 3,
        texts: [
          "Hábitat empobrecido",
          "Hábitat intermedio",
          "Hábitat bien constituido"
        ]
      },
      stonesInPools: "",
      substrateComposition: [],
      rapidsFrequency: "",
      velocityAndDepth: "",
      velocityAndDepthTypes: [
        "rápido / profundo",
        "lento / profundo",
        "lento / poco profundo",
        "rápido / poco profundo"
      ],
      riverShadows: "",
      randomElements: [],
      aquaticVegetation: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.stonesInPools = this.formHabitatData.stonesInPoolsOptions[0];
      this.rapidsFrequency = this.formHabitatData.rapidFrequencyOptions[0];
      this.velocityAndDepth = this.formHabitatData.velocityAndDepthOptions[0];
      this.riverShadows = this.formHabitatData.riverShadowsOptions[0];
      this.prepareComplexObjects();
    },
    prepareComplexObjects() {
      //for objects that needs "value" as another object. ie: values with "points".
      for (const element of this.formHabitatData.substrateCompositionOptions) {
        this.substrateComposition.push({ ...element, value: {} });
      }
      for (const element of this.formHabitatData.aquaticVegetationeOptions) {
        this.aquaticVegetation.push({ ...element, value: {} });
      }
      for (const element of this.formHabitatData.randomElementOptions) {
        this.randomElements.push({ ...element, value: {} });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
