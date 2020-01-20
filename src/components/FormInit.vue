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
        v-model="riverSection"
      >
        <option
          v-for="option in riverSections"
          :key="option.id"
          :value="option"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Cuenca / Municipio">
      <label>{{ riverSection.cuenca }} / {{ riverSection.municipio }}</label>
    </b-field>
    <b-field label="Clima hoy">
      <b-select icon="weather-lightning-rainy" v-model="weatherToday">
        <option
          v-for="option in weatherOptions"
          :key="option"
          :value="option"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Clima últimos 2 días">
      <b-select icon="weather-lightning-rainy" v-model="weather48h">
        <option
          v-for="option in weatherOptions"
          :key="option"
          :value="option"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId,
      user: state => state.user
    })
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      riverSection: {},
      weatherToday: "",
      weather48h: "",
      weatherOptions: ["Soleado", "Nublado", "Lluvioso", "Tormenta"],
      riverSections: [
        {
          id: 1,
          name: "tramo 1",
          cuenca: "Saja",
          municipio: "Cabezón de la Sal"
        },
        { id: 2, name: "tramo 2", cuenca: "Saja", municipio: "Cabuerniga" }
      ]
    };
  },
  methods: {
    init() {
      this.riverSection = this.riverSections[0];
      this.weatherToday = this.weatherOptions[0];
      this.weather48h = this.weatherOptions[0];
    }
  }
};
</script>
<style lang="scss" scoped></style>
