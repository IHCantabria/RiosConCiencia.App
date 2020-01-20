<template>
  <div class="form-section">
    <h5 class="title is-5">1. Inspección Básica del tramo (500m)</h5>
    <b-field label="¿El agua del río fluye?"> </b-field>
    <b-field>
      <b-radio-button v-model="waterFlow" native-value="false" type="is-danger">
        <b-icon icon="close"></b-icon>
        <span>No</span>
      </b-radio-button>

      <b-radio-button v-model="waterFlow" native-value="true" type="is-success">
        <b-icon icon="check"></b-icon>
        <span>Si</span>
      </b-radio-button>
    </b-field>
    <b-field label="¿Es el nivel del agua habitual para la época del año?">
      <b-select icon="arrow-expand-vertical" v-model="waterLevel">
        <option
          v-for="(option, index) in formBasicData.waterLevelOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Si hay algún problema crítico, intenta explicar su causa:">
      <b-input
        maxlength="200"
        type="textarea"
        :value="waterLevelCriticalProblem"
      ></b-input>
    </b-field>
    <b-field label="Anchura media del cauce (m)">
      <b-select icon="arrow-expand-horizontal" v-model="riverBedWidth">
        <option
          v-for="(option, index) in formBasicData.riverBedWidthOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Profundidad media del cauce (cm)">
      <b-select icon="arrow-expand-down" v-model="riverBedDepth">
        <option
          v-for="(option, index) in formBasicData.riverBedDepthOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Anchura media de la zona de ribera (m)"> </b-field>
    <div class="two-controls">
      <b-field label="Izquierda" custom-class="is-small">
        <b-select icon="arrow-expand-horizontal" v-model="riversideWidthLeft">
          <option
            v-for="(option, index) in formBasicData.riversideWidthOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Derecha" custom-class="is-small">
        <b-select icon="arrow-expand-horizontal" v-model="riversideWidthRight">
          <option
            v-for="(option, index) in formBasicData.riversideWidthOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
    </div>
    <b-field label="¿Que color tiene el agua?">
      <b-select icon="invert-colors" v-model="waterColor">
        <option
          v-for="(option, index) in formBasicData.waterColorOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="¿Que olor tiene el agua?">
      <b-select icon="grain" v-model="waterSmell">
        <option
          v-for="(option, index) in formBasicData.waterSmellOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Existen..."></b-field>
    <div class="block">
      <b-checkbox
        v-for="(option, index) in formBasicData.waterElementsOptions"
        :key="index"
        v-model="waterElements"
        :native-value="option"
      >
        {{ option.name }}
      </b-checkbox>
    </div>

    <b-field
      label="¿En que condiciones se encuentran las márgenes de nuestro río?"
    >
    </b-field>
    <div class="checkboxes-rows">
      <label class="checkboxes-rows__title">izq.</label>
      <label class="checkboxes-rows__title">der.</label>
    </div>
    <div
      class="checkboxes-rows"
      v-for="(option, index) in formBasicData.riverMarginConditionOptions"
      :key="index"
    >
      <b-checkbox v-model="riverMarginConditionsLeft" :native-value="option">
      </b-checkbox>
      <b-checkbox v-model="riverMarginConditionsRight" :native-value="option">
      </b-checkbox>
      {{ option.name }}
    </div>
    <div class="checks-container">
      <b-field label="¿Cuáles son los usos del suelo en las márgenes del río?">
      </b-field>
      <div class="checkboxes-rows">
        <label class="checkboxes-rows__title">izq.</label>
        <label class="checkboxes-rows__title">der.</label>
      </div>
      <div
        class="checkboxes-rows"
        v-for="(option, index) in formBasicData.riverMarginLandUseOptions"
        :key="index"
      >
        <b-checkbox v-model="riverMarginLandUseLeft" :native-value="option">
        </b-checkbox>
        <b-checkbox v-model="riverMarginLandUseRight" :native-value="option">
        </b-checkbox>
        {{ option.name }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      formBasicData: state => state.formSections.basicSection.basicSectionData
    })
  },
  data() {
    return {
      waterFlow: true,
      waterLevel: "",
      waterColor: "",
      waterSmell: "",
      waterElements: [],
      waterLevelCriticalProblem: "",
      riverBedWidth: "",
      riverBedDepth: "",
      riversideWidthLeft: "",
      riversideWidthRight: "",
      riverMarginConditionsLeft: [],
      riverMarginConditionsRight: [],
      riverMarginLandUseLeft: [],
      riverMarginLandUseRight: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //default init values
      this.waterLevel = this.formBasicData.waterLevelOptions[0];
      this.riverBedWidth = this.formBasicData.riverBedWidthOptions[0];
      this.riverBedDepth = this.formBasicData.riverBedDepthOptions[0];
      this.riversideWidth = this.formBasicData.riversideWidthOptions[0];
      this.riversideWidthLeft = this.formBasicData.riversideWidthOptions[0];
      this.riversideWidthRight = this.formBasicData.riversideWidthOptions[0];
      this.waterColor = this.formBasicData.waterColorOptions[0];
      this.waterSmell = this.formBasicData.waterSmellOptions[0];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
