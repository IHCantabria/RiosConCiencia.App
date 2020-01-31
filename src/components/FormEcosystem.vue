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
          v-model="values.samplePointCoords.lon"
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
          v-model="values.samplePointCoords.lat"
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
    <b-field
      label="Anchura (m)"
      custom-class="is-small"
      :message="{
        '*Hay que definir la anchura': sampleWidthHasErrors
      }"
      :type="{ 'is-danger': sampleWidthHasErrors }"
    >
      <b-numberinput
        v-model="values.samplePointWidth"
        step="0.1"
      ></b-numberinput>
    </b-field>
    <b-field
      label="Profundidad media (m)"
      custom-class="is-small"
      :message="{
        '*Hay que definir la profundidad': sampleDepthHasErrors
      }"
      :type="{ 'is-danger': sampleDepthHasErrors }"
    >
      <b-numberinput
        v-model="values.samplePointDepth"
        step="0.1"
      ></b-numberinput>
    </b-field>
    <b-field
      label="Velocidad del agua (m/s)"
      custom-class="is-small"
      :message="{
        '*Hay que definir la velocidad del agua': waterVelocityHasErrors
      }"
      :type="{ 'is-danger': waterVelocityHasErrors }"
    >
      <b-numberinput
        v-model="values.samplePointWaterVelocity"
        step="0.1"
      ></b-numberinput>
    </b-field>
    <b-field label="Caudal" custom-class="is-small"> </b-field>
    <label>{{ flow }}m³/s</label>
    <div class="is-divider"></div>
    <b-field label="b. Características físicas del agua"> </b-field>
    <b-field
      label="Temperatura (°C)"
      custom-class="is-small"
      :message="{
        '*Hay que definir la temperatura del agua': waterTempHasErrors
      }"
      :type="{ 'is-danger': waterTempHasErrors }"
    >
      <b-numberinput v-model="values.samplePointWaterTemp"></b-numberinput>
    </b-field>
    <b-field label="Transparencia" custom-class="is-small"> </b-field>
    <b-field
      label="(marcar solo los sectores que se ven en el disco, en el caso de no ver
        ninguno, marcar el 0)"
      custom-class="is-small"
      :message="{
        '*Al menos un sector debe estar marcado': transparencyHasErrors
      }"
      :type="{ 'is-danger': transparencyHasErrors }"
    ></b-field>

    <div class="field">
      <b-checkbox
        v-for="option in formEcoSystem.data.transparencyOptions"
        :key="option.id"
        v-model="values.samplePointWaterTransparency"
        :native-value="option"
        >{{ option.name }}
      </b-checkbox>
    </div>
    <div class="is-divider"></div>
    <b-field label="c. La vida en el río y las riberas"> </b-field>
    <div
      class="block"
      v-for="(category, indexCat) in formEcoSystem.data.eukaryoteComplexOptions"
      :key="indexCat + 10"
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
          <b-checkbox v-model="values.riverEcosystem" :native-value="option">{{
            option.name
          }}</b-checkbox>
          <div
            class="field sub-check"
            v-for="subOpt in option.options"
            :key="subOpt.id"
          >
            <b-checkbox
              size="is-small"
              v-model="values.riverEcosystemSpecies"
              :native-value="subOpt"
              >{{ subOpt.name }}</b-checkbox
            >
          </div>
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
        <b-checkbox v-model="values.riverEcosystem" :native-value="option">{{
          option.name
        }}</b-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserGeolocation } from "@/api/geolocation.js";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      values: {
        samplePointCoords: {
          lon: 0,
          lat: 0
        },
        samplePointWidth: 0,
        samplePointDepth: 0,
        samplePointWaterVelocity: 0,
        samplePointWaterTemp: 0,
        samplePointWaterTransparency: [],
        riverEcosystem: [],
        riverEcosystemInvPlantsCoverage: [],
        riverEcosystemSpecies: []
      }
    };
  },
  computed: {
    ...mapState({
      formEcoSystem: state => state.formSections.ecoSystem
    }),
    flow() {
      return (
        this.values.samplePointWidth *
        this.values.samplePointDepth *
        this.values.samplePointWaterVelocity
      );
    },
    sampleDepthHasErrors() {
      return this.values.samplePointDepth === 0;
    },
    waterVelocityHasErrors() {
      return this.values.samplePointWaterVelocity === 0;
    },
    waterTempHasErrors() {
      return this.values.samplePointWaterTemp === 0;
    },
    sampleWidthHasErrors() {
      return this.values.samplePointWidth === 0;
    },
    transparencyHasErrors() {
      return this.values.samplePointWaterTransparency.length === 0;
    },
    isSectionValid() {
      return (
        !this.sampleDepthHasErrors &&
        !this.waterVelocityHasErrors &&
        !this.waterTempHasErrors &&
        !this.sampleWidthHasErrors &&
        !this.transparencyHasErrors
      );
    }
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
    getActualPosition() {
      getUserGeolocation()
        .then(res => {
          this.values.samplePointCoords.lon = parseFloat(
            res.coords.longitude
          ).toFixed(5);
          this.values.samplePointCoords.lat = parseFloat(
            res.coords.latitude
          ).toFixed(5);
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
.sub-check {
  margin: 1rem;
}
</style>
