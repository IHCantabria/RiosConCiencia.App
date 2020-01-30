<template>
  <div class="form-section">
    <h5 class="title is-5">0. Datos Iniciales</h5>
    <b-field label="Nombre del responsable">
      <label>{{ user.name }}</label>
    </b-field>
    <b-field label="Acompañantes">
      <b-input value=""></b-input>
    </b-field>
    <b-field label="Tramo">
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
        placeholder="Seleccione"
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
        placeholder="Seleccione"
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
import { getUserRiverSections } from "@/api/riosconciencia.js";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.user,
      formInit: state => state.formSections.init
    }),
    riverSectionHasErrors() {
      return this.values.riverSection === null;
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
  beforeUpdate() {
    this.updateSectionValues({
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  data() {
    return {
      values: {
        riverSection: null,
        weatherToday: null,
        weather48h: null
      },
      userRiverSections: []
    };
  },
  methods: {
    ...mapActions({
      updateSectionValues: "updateSectionValues"
    }),
    async init() {
      try {
        this.userRiverSections = await getUserRiverSections(this.user.id);
      } catch (err) {
        //TODO: notificar
        console.error("error getting river sections");
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
