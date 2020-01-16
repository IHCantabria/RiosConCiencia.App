<template>
  <div class="form-section">
    <h5 class="title is-5">4. Índice del Hábitat Fluvial (100m)</h5>
    <b-field
      label="a. Grado de inclusión de las piedras, cantos y gravas en rápidos y pozas"
    >
      <b-select icon="gradient" v-model="stonesInPools">
        <option
          v-for="(option, index) in stonesInPoolsOptions"
          :value="option"
          :key="index"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
    <b-field label="b. Frecuencia de rápidos">
      <b-select icon="waves" v-model="rapidsFrequency">
        <option
          v-for="(option, index) in rapidsFrequencyOptions"
          :value="option"
          :key="index"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
    <b-field label="c. Composición del sustrato"> </b-field>
    <div
      class="radio-rows"
      v-for="(type, index) in substrateComposition"
      :key="index"
    >
      <div class="radio-rows__label-container">
        {{ type.name }}
      </div>
      <b-radio native-value="2" v-model="type.value">{{
        substrateOptions[0]
      }}</b-radio>
      <b-radio native-value="5" v-model="type.value">{{
        substrateOptions[1]
      }}</b-radio>
    </div>
    <b-field label="d. Regímenes de velocidad y profundidad"> </b-field>
    <b-taglist>
      <b-tag
        v-for="(type, index) in velocityAndDepthTypes"
        :key="index"
        type="is-info"
        >{{ type }}</b-tag
      >
    </b-taglist>
    <b-field>
      <b-select icon="waves" v-model="velocityAndDepth">
        <option
          v-for="(option, index) in velocityAndDepthOptions"
          :value="option"
          :key="index"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
    <b-field label="e. Sombre en el cauce">
      <b-select icon="waves" v-model="riverShadows">
        <option
          v-for="(option, index) in riverShadowsOptions"
          :value="option"
          :key="index"
          >{{ option }}</option
        >
      </b-select>
    </b-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stonesInPools: "",
      substrateOptions: ["<10%", ">10%"],
      substrateComposition: [
        { name: "Bloques y piedras", value: 2 },
        { name: "Cantos y gravas", value: 2 },
        { name: "Arena", value: 2 },
        { name: "Limo y arcilla", value: 2 }
      ],
      rapidsFrequency: "",
      rapidsFrequencyOptions: [
        "Alta Frecuencia",
        "Escasa",
        "Ocasional",
        "Flujo Laminar",
        "Solo Pozas"
      ],
      stonesInPoolsOptions: ["Bajo", "Moderado", "Alto"],
      velocityAndDepth: "",
      velocityAndDepthOptions: [
        "Las 4 categorías",
        "3 de las 4 categorías",
        "2 de las 4 caregorías",
        "Solo 1 categoría"
      ],
      velocityAndDepthTypes: [
        "rápido / profunda",
        "lento / profundo",
        "lento / poco profundo",
        "rápido / poco profundo"
      ],
      riverShadows: "",
      riverShadowsOptions: [
        "Sombreado con ventanas",
        "Totalmente en sombra",
        "Grandes claros",
        "Expuestos"
      ]
    };
  },
  mounted() {
    this.stonesInPools = this.stonesInPoolsOptions[0];
    this.rapidsFrequency = this.rapidsFrequencyOptions[0];
    this.velocityAndDepth = this.velocityAndDepthOptions[0];
    this.riverShadows = this.riverShadowsOptions[0];
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
