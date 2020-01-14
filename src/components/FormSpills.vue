<template>
  <div class="form-section">
    <h5 class="title is-5">2. Inspección de Vertidos (500m)</h5>
    <div class="subsection-container">
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
          @click="getActualPosition()"
          >Obtener posición actual</b-button
        >
      </b-field>
      <b-field label="Diámetro">
        <b-select icon="diameter-outline" v-model="spillDiameter">
          <option
            v-for="(option, index) in spillDiameterOptions"
            :value="option"
            :key="index"
            >{{ option }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Caudal">
        <b-select icon="elevation-rise" v-model="spillFlow">
          <option
            v-for="(option, index) in spillFlowOptions"
            :value="option"
            :key="index"
            >{{ option }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Color">
        <b-select icon="invert-colors" v-model="spillColor">
          <option
            v-for="(option, index) in spillColorOptions"
            :value="option"
            :key="index"
            >{{ option }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Olor">
        <b-select icon="grain" v-model="spillSmell">
          <option
            v-for="(option, index) in spillSmellOptions"
            :value="option"
            :key="index"
            >{{ option }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Origen">
        <b-select icon="source-commit-start" v-model="spillSource">
          <option
            v-for="(option, index) in spillSourceOptions"
            :value="option"
            :key="index"
            >{{ option }}</option
          >
        </b-select>
      </b-field>
      <b-button type="is-primary" @click="saveNewSpill">
        Guardar
      </b-button>
    </div>
    <b-field label="Vertidos Detectados" v-if="spills.length > 0">
      <b-table
        :data="spills"
        :columns="spillsTable.columns"
        :checked-rows.sync="spillsTable.selectedRows"
        checkable
      ></b-table>
    </b-field>
    <b-field v-if="spillsTable.selectedRows.length > 0">
      <b-button
        type="is-primary"
        icon-left="delete"
        outlined
        @click="removeSelectedSpills()"
        >Eliminar vertidos seleccionados</b-button
      >
    </b-field>
  </div>
</template>
<script>
import { getUserGeolocation } from "@/api/geolocation.js";

export default {
  data() {
    return {
      spills: [],
      spillDiameter: "",
      spillFlow: "",
      spillColor: "",
      spillLongitude: 0,
      spillLatitude: 0,
      spillSmell: "",
      spillSource: "",
      spillFlowOptions: ["Grande", "Moderado", "Pequeño", "Goteo"],
      spillDiameterOptions: ["< 0,5", "0,5 - 1", "1 - 2", "> 2"],
      spillColorOptions: ["Transparente", "Gris", "Blanquecino", "Turbio"],
      spillSmellOptions: [
        "Inoloro",
        "Alcantarilla",
        "Huevos Podridos",
        "Purines",
        "Amoniaco"
      ],
      spillSourceOptions: ["Pluvial", "Industrial", "Doméstico", "Desconocido"],
      spillsTable: {
        selectedRows: [],
        columns: [
          {
            field: "position.longitude",
            label: "Lon"
          },
          {
            field: "position.latitude",
            label: "Lat"
          },
          {
            field: "diameter",
            label: "Diámetro"
          },
          {
            field: "flow",
            label: "Caudal"
          },
          {
            field: "color",
            label: "Color"
          },
          {
            field: "smell",
            label: "Olor"
          },
          {
            field: "source",
            label: "Origen"
          }
        ]
      }
    };
  },
  mounted() {
    this.initFormSection();
  },
  methods: {
    initFormSection() {
      // New Spill init values
      this.spillDiameter = this.spillDiameterOptions[0];
      this.spillFlow = this.spillFlowOptions[0];
      this.spillColor = this.spillColorOptions[0];
      this.spillSmell = this.spillSmellOptions[0];
      this.spillSource = this.spillSourceOptions[0];
    },
    getActualPosition() {
      getUserGeolocation()
        .then(res => {
          this.spillLongitude = parseFloat(res.coords.longitude).toFixed(5);
          this.spillLatitude = parseFloat(res.coords.latitude).toFixed(5);
        })
        .catch(err => {
          //TODO: notificar?
          console.error(`Error cargando posición. ${err}`);
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
      this.spills.push(newSpill);
    },
    removeSelectedSpills() {
      const self = this;
      for (const spill of this.spillsTable.selectedRows) {
        var filtered = self.spills.filter(value => {
          return value !== spill;
        });
        self.spills = filtered;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";

.subsection-container {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid $color-primary;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  color: rgba(0, 0, 0, 0.7);
  padding: 1.5rem;
  margin: 1rem;
  &:before {
    background: $color-primary;
    border-radius: 4px 4px 0 0;
    bottom: 100%;
    content: "Nuevo Vertido";
    display: inline-block;
    font-size: 8px;
    font-weight: 700;
    left: -1px;
    padding: 4px 8px;
    position: absolute;
    text-transform: uppercase;
    vertical-align: top;
  }
}
</style>
