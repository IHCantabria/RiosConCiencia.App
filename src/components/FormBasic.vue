<template>
  <div class="form-section">
    <h5 class="title is-5">
      1. Inspección Básica del tramo (500m)<a :href="pdfLink" target="_blank"
        ><b-icon icon="file-pdf" type="is-primary"></b-icon
      ></a>
    </h5>

    <b-field label="a. ¿El agua del río fluye?"> </b-field>
    <b-field>
      <b-radio-button
        v-model="values.waterFlow"
        :native-value="false"
        type="is-danger"
      >
        <b-icon icon="close"></b-icon>
        <span>No</span>
      </b-radio-button>

      <b-radio-button
        v-model="values.waterFlow"
        :native-value="true"
        type="is-success"
      >
        <b-icon icon="check"></b-icon>
        <span>Si</span>
      </b-radio-button>
    </b-field>
    <b-field
      label="b. ¿Es el nivel del agua habitual para la época del año?"
      :message="{
        '*Hay que seleccionar una opción': waterLevelHasErrors
      }"
      :type="{ 'is-danger': waterLevelHasErrors }"
    >
      <b-select
        icon="arrow-expand-vertical"
        placeholder="Seleccione una opción"
        v-model="values.waterLevel"
      >
        <option
          v-for="(option, index) in formBasic.data.waterLevelOptions"
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
        :value="values.waterLevelCriticalProblem"
      ></b-input>
    </b-field>
    <b-field
      label="c. Anchura media del cauce (m)"
      :message="{
        '*Hay que seleccionar una opción': riverBedWidthHasErrors
      }"
      :type="{ 'is-danger': riverBedWidthHasErrors }"
    >
      <b-select
        icon="arrow-expand-horizontal"
        placeholder="Seleccione una opción"
        v-model="values.riverBedWidth"
      >
        <option
          v-for="(option, index) in formBasic.data.riverBedWidthOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field
      label="d. Profundidad media del cauce (cm)"
      :message="{
        '*Hay que seleccionar una opción': riverBedDepthHasErrors
      }"
      :type="{ 'is-danger': riverBedDepthHasErrors }"
      riverSideWidthHasErrors
    >
      <b-select
        icon="arrow-expand-down"
        placeholder="Seleccione una opción"
        v-model="values.riverBedDepth"
      >
        <option
          v-for="(option, index) in formBasic.data.riverBedDepthOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="e. Anchura media de la zona de ribera (m)"> </b-field>
    <div class="two-controls">
      <b-field
        label="Izquierda"
        :message="{
          '*Hay que seleccionar una opción': riverSideWidthLeftHasErrors
        }"
        :type="{ 'is-danger': riverSideWidthLeftHasErrors }"
        custom-class="is-small"
      >
        <b-select
          icon="arrow-expand-horizontal"
          placeholder="Seleccione"
          v-model="values.riverSideWidthLeft"
        >
          <option
            v-for="(option, index) in formBasic.data.riverSideWidthOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field
        label="Derecha"
        :message="{
          '*Hay que seleccionar una opción': riverSideWidthRightHasErrors
        }"
        :type="{ 'is-danger': riverSideWidthRightHasErrors }"
        custom-class="is-small"
      >
        <b-select
          icon="arrow-expand-horizontal"
          placeholder="Seleccione"
          v-model="values.riverSideWidthRight"
        >
          <option
            v-for="(option, index) in formBasic.data.riverSideWidthOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
    </div>
    <b-field label="f. ¿Que color tiene el agua?">
      <b-select icon="invert-colors" v-model="values.waterColor">
        <option
          v-for="(option, index) in formBasic.data.waterColorOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="g. ¿Que olor tiene el agua?">
      <b-select icon="grain" v-model="values.waterSmell">
        <option
          v-for="(option, index) in formBasic.data.waterSmellOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="h. Existen..."></b-field>
    <div class="block">
      <b-checkbox
        v-for="(option, index) in formBasic.data.waterElementsOptions"
        :key="index"
        v-model="values.waterElements"
        :native-value="option"
      >
        {{ option.name }}
      </b-checkbox>
    </div>

    <b-field
      label="i. ¿En que condiciones se encuentran las márgenes de nuestro río?"
      :message="{
        '*Selecciona las condiciones en cada margen del río': riverConditionsHasErrors
      }"
      type="is-danger"
    >
    </b-field>
    <div class="checkboxes-rows">
      <label class="checkboxes-rows__title">izq.</label>
      <label class="checkboxes-rows__title">der.</label>
    </div>
    <div
      class="checkboxes-rows"
      v-for="(option, index) in formBasic.data.riverMarginConditionOptions"
      :key="index"
    >
      <b-checkbox
        v-model="values.riverMarginConditionsLeft"
        :native-value="option"
      >
      </b-checkbox>
      <b-checkbox
        v-model="values.riverMarginConditionsRight"
        :native-value="option"
      >
      </b-checkbox>
      {{ option.name }}
    </div>
    <div class="checks-container">
      <b-field
        label="j. ¿Cuáles son los usos del suelo en las márgenes del río?"
        :message="{
          '*Selecciona al menos un uso del suelo en cada margen': landUseHasErrors
        }"
        type="is-danger"
      >
      </b-field>
      <div class="checkboxes-rows">
        <label class="checkboxes-rows__title">izq.</label>
        <label class="checkboxes-rows__title">der.</label>
      </div>
      <div
        class="checkboxes-rows"
        v-for="(option, index) in formBasic.data.riverMarginLandUseOptions"
        :key="index"
      >
        <b-checkbox
          v-model="values.riverMarginLandUseLeft"
          :native-value="option"
        >
        </b-checkbox>
        <b-checkbox
          v-model="values.riverMarginLandUseRight"
          :native-value="option"
        >
        </b-checkbox>
        {{ option.name }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      pdfLink: require("../assets/pdfs/basico.pdf"),
      values: {
        waterFlow: true,
        waterLevel: null,
        waterColor: "",
        waterSmell: "",
        waterElements: [],
        waterLevelCriticalProblem: "",
        riverBedWidth: null,
        riverBedDepth: null,
        riverSideWidthLeft: null,
        riverSideWidthRight: null,
        riverMarginConditionsLeft: [],
        riverMarginConditionsRight: [],
        riverMarginLandUseLeft: [],
        riverMarginLandUseRight: []
      }
    };
  },
  computed: {
    ...mapState({
      formBasic: state => state.formSections.basic
    }),
    landUseHasErrors() {
      return (
        this.values.riverMarginLandUseLeft.length === 0 ||
        this.values.riverMarginLandUseRight.length === 0
      );
    },
    riverConditionsHasErrors() {
      return (
        this.values.riverMarginConditionsLeft.length === 0 ||
        this.values.riverMarginConditionsRight.length === 0
      );
    },
    waterLevelHasErrors() {
      return this.values.waterLevel === null;
    },
    riverBedWidthHasErrors() {
      return this.values.riverBedWidth === null;
    },
    riverBedDepthHasErrors() {
      return this.values.riverBedDepth === null;
    },
    riverSideWidthRightHasErrors() {
      return this.values.riverSideWidthRight === null;
    },
    riverSideWidthLeftHasErrors() {
      return this.values.riverSideWidthLeft === null;
    },
    isSectionValid() {
      return (
        !this.landUseHasErrors &&
        !this.riverConditionsHasErrors &&
        !this.waterLevelHasErrors &&
        !this.riverBedWidthHasErrors &&
        !this.riverBedDepthHasErrors &&
        !this.riverSideWidthRightHasErrors &&
        !this.riverSideWidthLeftHasErrors
      );
    }
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
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
      //default init values
      this.values.waterColor = this.formBasic.data.waterColorOptions[0];
      this.values.waterSmell = this.formBasic.data.waterSmellOptions[0];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
