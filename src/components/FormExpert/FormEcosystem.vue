<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>5. El Ecosistema Acúatico (50m)</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
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
        min="0.1"
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
        min="0.1"
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
        min="0.1"
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

    <div class="block">
      <div class="radio-rows">
        <div class="radio-rows__options-container">
          <b-field>
            <b-radio-button
              v-for="option in formEcoSystem.data.transparencyOptions"
              :key="option.id"
              v-model="values.waterTransparency"
              :native-value="option"
              >{{ option.name }}
            </b-radio-button>
          </b-field>
        </div>
      </div>
    </div>
    <div class="is-divider"></div>
    <b-field label="c. La vida en el río y las riberas"> </b-field>
    <div
      v-for="(category, indexCat) in formEcoSystem.data.eukaryoteComplexOptions"
      :class="['block', CategoryOrder(category)]"
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
      <template v-if="category.id == 2">
        <div class="block" key="20">
          <div class="checkboxes-group">
            <label class="checkboxes-group__title"
              >Invasoras / Alóctonas (grado de cobertura)</label
            >
          </div>
          <div
            class="field"
            v-for="option in invasorsComputed"
            :key="option.id"
          >
            <b-checkbox
              v-model="values.riverEcosystemInvPlantsCoverage"
              :native-value="option"
              >{{ option.name }}</b-checkbox
            >
            <div
              class="radio-rows__options-container"
              v-if="InvasorSelectedIndex(option) != -1"
            >
              <b-field>
                <b-radio-button
                  class="radio-rows__options-container-item"
                  v-for="type in formEcoSystem.data.coverageOptions"
                  :key="type.id"
                  :native-value="type"
                  v-model="
                    values.riverEcosystemInvPlantsCoverage[
                      InvasorSelectedIndex(option)
                    ].value
                  "
                  >{{ type.name }}</b-radio-button
                >
              </b-field>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      :class="['block', CategoryOrder(category)]"
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
      pdfLink: null,
      values: {
        samplePointCoords: {
          lon: 0,
          lat: 0
        },
        samplePointWidth: 0,
        samplePointDepth: 0,
        samplePointWaterVelocity: 0,
        samplePointWaterTemp: 0,
        waterTransparency: null,
        riverEcosystem: [],
        riverEcosystemInvPlantsCoverage: [],
        riverEcosystemSpecies: []
      }
    };
  },
  created() {
    this.pdfLink = require("../../assets/pdfs/ecosistema.pdf");
  },
  computed: {
    ...mapState({
      formEcoSystem: state => state.formExpertSections.ecoSystem
    }),
    invasorsComputed() {
      let invasorsComputed = this.formEcoSystem.data.invasorPlantOptions;
      invasorsComputed.forEach(invasor => {
        invasor.value = this.formEcoSystem.data.coverageOptions[2];
      });
      return invasorsComputed;
    },
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
      return this.values.samplePointWaterTemp === null;
    },
    sampleWidthHasErrors() {
      return this.values.samplePointWidth === 0;
    },
    transparencyHasErrors() {
      return this.values.waterTransparency === null;
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
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificExpertSectionValues({
      name: "ecoSystem",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificExpertSectionValues: "updateSpecificExpertSectionValues"
    }),
    init() {
      this.values.samplePointWaterTemp = null; //default value and make beforeUpdate hook jump
    },
    InvasorSelectedIndex(option) {
      return this.values.riverEcosystemInvPlantsCoverage.indexOf(option);
    },
    CategoryOrder(item) {
      return `eukaryote${item.id}`;
    },
    getActualPosition() {
      getUserGeolocation()
        .then(res => {
          this.values.samplePointCoords.lon = parseFloat(
            res.coords.longitude
          ).toFixed(7);
          this.values.samplePointCoords.lat = parseFloat(
            res.coords.latitude
          ).toFixed(7);
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: "No es posible Geolocalizar la ubicación",
            type: "is-danger",
            duration: 4000
          });
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
.eukaryote1 {
  order: 1;
}
.eukaryote2 {
  order: 2;
}
.eukaryote3 {
  order: 3;
}
.eukaryote4 {
  order: 4;
}
.eukaryote5 {
  order: 5;
}
.eukaryote6 {
  order: 6;
}
.eukaryote7 {
  order: 7;
}
.eukaryote8 {
  order: 8;
}
.eukaryote9 {
  order: 9;
}
</style>
