<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span> 2. Inspección de Vertidos (500m)</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <div class="form-section__block">
      <b-field label="Coordenadas (WGS84)"></b-field>
      <div class="two-controls">
        <b-field label="Lon" custom-class="is-small">
          <b-input
            placeholder="Number"
            type="number"
            min="-180"
            max="180"
            step="any"
            custom-class="is-small"
            v-model="spillLongitude"
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
            v-model="spillLatitude"
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
        label="Diámetro"
        message="*Este campo es obligatorio al añadir un vertido"
      >
        <b-select
          icon="diameter-outline"
          placeholder="Seleccione una opción"
          v-model="spillDiameter"
        >
          <option
            v-for="(option, index) in formSpills.data.spillDiameterOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Caudal">
        <b-select
          icon="elevation-rise"
          placeholder="Seleccione una opción"
          v-model="spillFlow"
        >
          <option
            v-for="(option, index) in formSpills.data.spillFlowOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Color">
        <b-select
          icon="invert-colors"
          placeholder="Seleccione una opción"
          v-model="spillColor"
        >
          <option
            v-for="(option, index) in formSpills.data.spillColorOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Olor">
        <b-select
          icon="grain"
          placeholder="Seleccione una opción"
          v-model="spillSmell"
        >
          <option
            v-for="(option, index) in formSpills.data.spillSmellOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field
        label="Origen"
        message="*Este campo es obligatorio al añadir un vertido"
      >
        <b-select
          icon="source-commit-start"
          placeholder="Seleccione una opción"
          v-model="spillSource"
        >
          <option
            v-for="(option, index) in formSpills.data.spillSourceOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-button
        type="is-primary"
        :disabled="spillDisabled"
        @click="saveNewSpill"
      >
        Guardar
      </b-button>
    </div>

    <div
      class="table-container"
      v-if="values.spillsList && values.spillsList.length > 0"
    >
      <b-table
        :data="values.spillsList"
        :columns="spillsTable.columns"
        :checked-rows.sync="spillsTable.selectedRows"
        :narrowed="true"
        :mobile-cards="true"
        class="table-spills"
        checkable
      ></b-table>
    </div>
    <div v-else>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="pipe-leak" size="is-large"> </b-icon>
          </p>
          <p>No hay vertidos</p>
        </div>
      </section>
    </div>

    <b-field v-if="spillsTable.selectedRows.length > 0">
      <b-button
        type="is-primary"
        icon-left="delete"
        outlined
        size="is-small"
        expanded
        @click="removeSelectedSpills()"
        >Eliminar vertidos seleccionados</b-button
      >
    </b-field>
  </div>
</template>
<script>
import { getUserGeolocation } from "@/api/geolocation.js";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      formSpills: state => state.formExpertSections.spills
    }),
    spillDisabled() {
      return this.spillSource === null || this.spillDiameter === null;
    },
    isSectionValid() {
      return true; //optional section
    }
  },
  data() {
    return {
      pdfLink: require("../../assets/pdfs/vertidos.pdf"),
      values: {
        spillsList: null
      },
      spillDiameter: null,
      spillFlow: null,
      spillColor: null,
      spillLongitude: 0,
      spillLatitude: 0,
      spillSmell: null,
      spillSource: null,
      spillsTable: {
        selectedRows: [],
        columns: [
          {
            field: "position.longitude",
            label: "Longitud"
          },
          {
            field: "position.latitude",
            label: "Latitud"
          },
          {
            field: "diameter.name",
            label: "Diámetro"
          },
          {
            field: "flow.name",
            label: "Caudal"
          },
          {
            field: "color.name",
            label: "Color"
          },
          {
            field: "smell.name",
            label: "Olor"
          },
          {
            field: "source.name",
            label: "Origen"
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificExpertSectionValues({
      name: "spills",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificExpertSectionValues: "updateSpecificExpertSectionValues",
      updateSectionValues: "updateSectionValues"
    }),
    init() {
      this.values.spillsList = []; //default value and make beforeUpdate hook jump
    },
    getActualPosition() {
      getUserGeolocation()
        .then(res => {
          this.spillLongitude = parseFloat(res.coords.longitude).toFixed(5);
          this.spillLatitude = parseFloat(res.coords.latitude).toFixed(5);
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: "No es posible Geolocalizar la ubicación",
            type: "is-danger"
          });
        });
    },
    saveNewSpill() {
      const newSpill = {
        position: {
          longitude: this.spillLongitude,
          latitude: this.spillLatitude
        },
        diameter: this.spillDiameter,
        flow: this.spillFlow,
        color: this.spillColor,
        smell: this.spillSmell,
        source: this.spillSource
      };
      this.resetSpillValues();
      this.values.spillsList.push(newSpill);
      this.updateSectionValues({
        values: this.values,
        isValid: true
      });
    },
    resetSpillValues() {
      this.spillDiameter = null;
      this.spillFlow = null;
      this.spillColor = null;
      this.spillLongitude = 0;
      this.spillLatitude = 0;
      this.spillSmell = null;
      this.spillSource = null;
    },
    removeSelectedSpills() {
      const self = this;
      for (const spill of this.spillsTable.selectedRows) {
        var filtered = self.values.spillsList.filter(value => {
          return value !== spill;
        });
        self.values.spillsList = filtered;
      }
      this.spillsTable.selectedRows = [];
      this.updateSectionValues({ values: this.values, isValid: true });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";

.table-container {
  padding: 1rem;
}
</style>
