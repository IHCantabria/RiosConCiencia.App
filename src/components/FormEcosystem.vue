<template>
  <div class="form-section">
    <h5 class="title is-5">5. El ecosistema acúatico (50m)</h5>
    <b-field label="a. Descripción del punto de muestreo"> </b-field>

    <b-field label="Coordenadas (WGS84)" custom-class="is-small"></b-field>
    <div class="two-controls">
      <b-field label="Lon" custom-class="is-small">
        <b-input
          placeholder="Number"
          type="number"
          min="-180"
          max="180"
          step="any"
          custom-class="is-small"
          v-model="samplePointCoords.lon"
        >
        </b-input>
      </b-field>
      <b-field label="Lat" custom-class="is-small">
        <b-input
          placeholder="Number"
          type="number"
          min="-90"
          max="90"
          step="any"
          custom-class="is-small"
          v-model="samplePointCoords.lat"
        >
        </b-input>
      </b-field>
    </div>
    <b-field>
      <b-button
        type="is-primary"
        icon-left="map-marker"
        outlined
        size="is-small"
        expanded
        @click="getActualPosition()"
        >Obtener posición actual</b-button
      >
    </b-field>
    <b-field label="Anchura (m)" custom-class="is-small">
      <b-numberinput v-model="samplePointWidth" step="0.1"></b-numberinput>
    </b-field>
    <b-field label="Profundidad media (m)" custom-class="is-small">
      <b-numberinput v-model="samplePointDepth" step="0.1"></b-numberinput>
    </b-field>
    <b-field label="Velocidad del agua (m/s)" custom-class="is-small">
      <b-numberinput
        v-model="samplePointWaterVelocity"
        step="0.1"
      ></b-numberinput>
    </b-field>
    <b-field label="Caudal" custom-class="is-small"> </b-field>
    <label>{{ flow }}m³/s</label>
    <div class="is-divider"></div>
    <b-field label="b. Características físicas del agua"> </b-field>
    <b-field label="Temperatura (°C)" custom-class="is-small">
      <b-numberinput v-model="samplePointWaterTemp"></b-numberinput>
    </b-field>
    <b-field label="Transparencia" custom-class="is-small"> </b-field>
    <b-field
      label="(marcar solo los sectores que se ven en el disco, en el caso de no ver
        ninguno, marcar el 0)"
      custom-class="is-small"
    ></b-field>
    <div class="field">
      <b-checkbox
        v-for="(option, index) in formEcoSystem.data.transparencyOptions"
        :key="index"
        v-model="samplePointWaterTransparency"
        :native-value="option"
        >{{ option.name }}
      </b-checkbox>
    </div>
    <div class="is-divider"></div>
    <b-field label="c. La vida en el río y las riberas"> </b-field>
    <div
      class="block"
      v-for="(category, indexCat) in formEcoSystem.data.eukaryoteComplexOptions"
      :key="indexCat"
    >
      <b-field :label="category.name" custom-class="is-small"> </b-field>
      <div
        class="block"
        v-for="(group, indexGroup) in category.options"
        :key="indexGroup"
      >
        <div class="checkboxes-group">
          <label class="checkboxes-group__title">{{ group.name }}</label>
        </div>
        <div class="field" v-for="option in group.options" :key="option.id">
          <b-checkbox v-model="riverEcosystem" :native-value="option">{{
            option.name
          }}</b-checkbox>
        </div>
      </div>
    </div>
    <div
      class="block"
      v-for="(category, indexCatSimple) in formEcoSystem.data
        .eukaryoteSimpleOptions"
      :key="indexCatSimple"
    >
      <b-field :label="category.name" custom-class="is-small"> </b-field>
      <div class="field" v-for="option in category.options" :key="option.id">
        <b-checkbox v-model="riverEcosystem" :native-value="option">{{
          option.name
        }}</b-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserGeolocation } from "@/api/geolocation.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      samplePointCoords: {
        lon: 0,
        lat: 0
      },
      samplePointWidth: 0,
      samplePointDepth: 0,
      samplePointWaterVelocity: 0,
      samplePointWaterTemp: 0,
      samplePointWaterTransparency: [],
      riverEcosystem: []
    };
  },
  computed: {
    ...mapState({
      formEcoSystem: state => state.formSections.ecoSystem
    }),
    flow() {
      return (
        this.samplePointWidth *
        this.samplePointDepth *
        this.samplePointWaterVelocity
      );
    }
  },
  methods: {
    getActualPosition() {
      getUserGeolocation()
        .then(res => {
          this.samplePointCoords.lon = parseFloat(res.coords.longitude).toFixed(
            5
          );
          this.samplePointCoords.lat = parseFloat(res.coords.latitude).toFixed(
            5
          );
        })
        .catch(err => {
          //TODO: notificar?
          console.error(`Error cargando posición. ${err}`);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
