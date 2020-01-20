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
            v-for="(option, index) in formSpillsData.spillDiameterOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Caudal">
        <b-select icon="elevation-rise" v-model="spillFlow">
          <option
            v-for="(option, index) in formSpillsData.spillFlowOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Color">
        <b-select icon="invert-colors" v-model="spillColor">
          <option
            v-for="(option, index) in formSpillsData.spillColorOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Olor">
        <b-select icon="grain" v-model="spillSmell">
          <option
            v-for="(option, index) in formSpillsData.spillSmellOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
          >
        </b-select>
      </b-field>
      <b-field label="Origen">
        <b-select icon="source-commit-start" v-model="spillSource">
          <option
            v-for="(option, index) in formSpillsData.spillSourceOptions"
            :value="option"
            :key="index"
            >{{ option.name }}</option
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
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      formSpillsData: state =>
        state.formSections.spillsSection.spillsSectionData
    })
  },
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
  methods: {
    init() {
      // init default values
      this.spillDiameter = this.formSpillsData.spillDiameterOptions[0];
      this.spillFlow = this.formSpillsData.spillFlowOptions[0];
      this.spillColor = this.formSpillsData.spillColorOptions[0];
      this.spillSmell = this.formSpillsData.spillSmellOptions[0];
      this.spillSource = this.formSpillsData.spillSourceOptions[0];
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
