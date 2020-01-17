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
          v-for="(option, index) in sectionMasterData.waterLevelOptions"
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
          v-for="(option, index) in riverBedWidthOptions"
          :value="option"
          :key="index"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Profundidad media del cauce (cm)">
      <b-select icon="arrow-expand-down" v-model="riverBedDepth">
        <option
          v-for="(option, index) in riverBedDepthOptions"
          :value="option"
          :key="index"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Anchura media de la zona de ribera (m)"> </b-field>
    <div class="two-controls">
      <b-field label="Izquierda" custom-class="is-small">
        <b-select icon="arrow-expand-horizontal" v-model="riversideWidthLeft">
          <option
            v-for="(option, index) in riversideWidthOptions"
            :value="option"
            :key="index"
            >{{ option }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Derecha" custom-class="is-small">
        <b-select icon="arrow-expand-horizontal" v-model="riversideWidthRight">
          <option
            v-for="(option, index) in riversideWidthOptions"
            :value="option"
            :key="index"
            >{{ option }}</option
          >
        </b-select>
      </b-field>
    </div>
    <b-field label="¿Que color tiene el agua?">
      <b-select icon="invert-colors" v-model="waterColor">
        <option
          v-for="(option, index) in waterColorOptions"
          :value="option"
          :key="index"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
    <b-field label="¿Que olor tiene el agua?">
      <b-select icon="grain" v-model="waterSmell">
        <option
          v-for="(option, index) in waterSmellOptions"
          :value="option"
          :key="index"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Existen..."></b-field>
    <div class="block">
      <b-checkbox
        v-for="(option, index) in waterElementsOptions"
        :key="index"
        v-model="waterElements"
        :native-value="option"
      >
        {{ option }}
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
      v-for="(option, index) in riverMarginConditionOptions"
      :key="index"
    >
      <b-checkbox v-model="riverMarginConditionsLeft" :native-value="option">
      </b-checkbox>
      <b-checkbox v-model="riverMarginConditionsRight" :native-value="option">
      </b-checkbox>
      {{ option }}
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
        v-for="(option, index) in riverMarginLandUseOptions"
        :key="index"
      >
        <b-checkbox v-model="riverMarginLandUseLeft" :native-value="option">
        </b-checkbox>
        <b-checkbox v-model="riverMarginLandUseRight" :native-value="option">
        </b-checkbox>
        {{ option }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      sectionMasterData: state =>
        state.formSections.basicSection.basicSectionData
    })
  },
  data() {
    return {
      waterFlow: true,
      waterLevel: "",
      waterColor: "",
      waterSmell: "",
      waterElements: [],
      waterLevelCriticalProblem: "Sample text",
      //   waterLevelOptions: ["Normal", "Más alto", "Más bajo"],
      waterColorOptions: [
        "Transparente",
        "Turbia",
        "Fangosa",
        "Blanquecina",
        "Gris"
      ],
      waterSmellOptions: [
        "No tiene olor",
        "Peces",
        "Huevos podridos",
        "Petróleo, gasolina",
        "Alcantarilla",
        "Amoniaco",
        "Purines"
      ],
      waterElementsOptions: ["Aceites", "Espumas", "Impurezas"],
      riverBedWidth: "",
      riverBedWidthOptions: ["< 1", "1 - 2", "2 - 5", "5 - 10", "> 10"], //m
      riverBedDepth: "",
      riverBedDepthOptions: ["< 20", "20 - 50", "50 - 100", "> 100"], //cm
      riversideWidthLeft: "",
      riversideWidthRight: "",
      riversideWidthOptions: ["< 1", "1 - 5", "5 - 20", "> 20"], //m
      riverMarginConditionsLeft: [],
      riverMarginConditionsRight: [],
      riverMarginConditionOptions: [
        "Erosionadas",
        "Con árboles",
        "Con arbustos",
        "Con prados, hierbas",
        "Con playas",
        "Deforestadas o taladas",
        "Con bordes desbrozados",
        "Con paseos o caminos a la ribera",
        "Con zonas de acceso para personas",
        "Canalizadas",
        "Urbanizadas"
      ],
      riverMarginLandUseLeft: [],
      riverMarginLandUseRight: [],
      riverMarginLandUseOptions: [
        "Industrial",
        "Residencial",
        "Camping",
        "Áreas de Recreo",
        "Aparcamientos",
        "Ganadería",
        "Agricultura",
        "Carreteras",
        "Ferrocarril",
        "Depuradora o potabilizadora"
      ]
    };
  },
  mounted() {
    //ejemplo contra los datos maestros de la store (pseudo codigo)
    // this.riversideWidthOptions = state.formSections.basic.riversideWidthOptions

    //default init values
    this.waterLevel = this.sectionMasterData.waterLevelOptions[0];
    this.riverBedWidth = this.riverBedWidthOptions[0];
    this.riverBedDepth = this.riverBedDepthOptions[0];
    this.riversideWidth = this.riversideWidthOptions[0];
    this.riversideWidthLeft = this.riversideWidthOptions[0];
    this.riversideWidthRight = this.riversideWidthOptions[0];
    this.waterColor = this.waterColorOptions[0];
    this.waterSmell = this.waterSmellOptions[0];
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
