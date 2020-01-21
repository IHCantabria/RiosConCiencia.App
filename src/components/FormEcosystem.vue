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
      <b-numberinput v-model="samplePointWidth"></b-numberinput>
    </b-field>
    <b-field label="Profundidad media (m)" custom-class="is-small">
      <b-numberinput v-model="samplePointDepth"></b-numberinput>
    </b-field>
    <b-field label="Velocidad del agua (m/s)" custom-class="is-small">
      <b-numberinput v-model="samplePointWaterVelocity"></b-numberinput>
    </b-field>
    <b-field label="Caudal" custom-class="is-small"> </b-field>
    <label>{{ flow }}m³/s</label>
  </div>
</template>
<script>
import { getUserGeolocation } from "@/api/geolocation.js";
export default {
  data() {
    return {
      samplePointCoords: {
        lon: 0,
        lat: 0
      },
      samplePointWidth: 0,
      samplePointDepth: 0,
      samplePointWaterVelocity: 0
    };
  },
  computed: {
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
