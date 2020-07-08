<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>0. Datos iniciales</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field label="Nombre del responsable">
      <label>{{ userFullName }}</label>
    </b-field>
    <b-field label="Acompañantes">
      <b-input v-model="values.partners"></b-input>
    </b-field>
    <b-field
      label="Tramo"
      :message="{
        '*Hay que seleccionar un tramo': riverSectionHasErrors
      }"
      :type="{ 'is-danger': riverSectionHasErrors }"
    >
      <b-select
        icon="go-kart-track"
        placeholder="Seleccione Tramo"
        v-model="values.riverSection"
      >
        <option
          v-for="option in userRiverSections"
          :key="option.id"
          :value="option"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Cuenca / Municipio">
      <label v-if="values.riverSection"
        >{{ values.riverSection.catchment }} /
        {{ values.riverSection.municipality }}</label
      >
      <label v-else>-</label>
    </b-field>
    <b-field
      label="Clima hoy"
      :message="{
        '*Hay que seleccionar una opción': weatherHasErrors
      }"
      :type="{ 'is-danger': weatherHasErrors }"
    >
      <b-select
        icon="weather-lightning-rainy"
        placeholder="Seleccione una opción"
        v-model="values.weatherToday"
      >
        <option
          v-for="option in formInit.data.weatherOptions"
          :key="option.id"
          :value="option"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field
      label="Clima últimos 2 días"
      :message="{
        '*Hay que seleccionar una opción': weather48HasErrors
      }"
      :type="{ 'is-danger': weather48HasErrors }"
    >
      <b-select
        icon="weather-lightning-rainy"
        placeholder="Seleccione una opción"
        v-model="values.weather48h"
      >
        <option
          v-for="option in formInit.data.weatherOptions"
          :key="option.id"
          :value="option"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.user,
      formInit: state => state.formExpertSections.init,
      userRiverSections: state => state.userRiverSections
    }),
    riverSectionHasErrors() {
      return this.values.riverSection === null;
    },
    userFullName() {
      return `${this.user.name ? this.user.name : ""} ${
        this.user.surnames ? this.user.surnames : ""
      }`;
    },
    weatherHasErrors() {
      return this.values.weatherToday === null;
    },
    weather48HasErrors() {
      return this.values.weather48h === null;
    },
    isSectionValid() {
      return (
        !this.weatherHasErrors &&
        !this.weather48HasErrors &&
        !this.riverSectionHasErrors
      );
    }
  },
  mounted() {
    this.init();
  },
  created() {
    this.pdfLink = require("../../assets/pdfs/manual2019.pdf");
  },
  beforeUpdate() {
    this.updateSpecificExpertSectionValues({
      name: "init",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  data() {
    return {
      pdfLink: null,
      values: {
        partners: null,
        riverSection: null,
        weatherToday: null,
        weather48h: null
      }
    };
  },
  methods: {
    ...mapActions({
      updateSpecificExpertSectionValues: "updateSpecificExpertSectionValues"
    }),
    init() {
      this.values.partners = ""; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
