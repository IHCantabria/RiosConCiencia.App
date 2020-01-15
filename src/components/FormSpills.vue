<template>
  <div class="form-section">
    <h5 class="title is-5">
      2. Inspección de Vertidos (500m)
    </h5>
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

    <div class="table-container" v-if="spills.length > 0">
      <b-table
        :data="spills"
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
            label: "Longitud"
          },
          {
            field: "position.latitude",
            label: "Latitud"
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
      this.spillsTable.selectedRows = [];
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
