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
    <div class="block">
      <div
        class="radio-rows"
        v-for="(type, index) in substrateComposition"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>

        <b-radio
          v-for="option in substrateOptions"
          :key="option.id"
          :native-value="option"
          v-model="substrateComposition[index].value"
          >{{ option.name }}</b-radio
        >
      </div>
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
    <b-field label="f. Presencia de elementos de heterogeneidad"> </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(element, index) in randomElementsOptions"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ element.name }}
        </div>
        <!-- TODO: No está completo, hay que ver como encajar esta particularidad -->
        <b-checkbox
          v-for="(option, index) in element.options"
          :key="index"
          :native-value="option"
          v-model="randomElements"
          >{{ option.name }}</b-checkbox
        >
      </div>
    </div>
    <b-field label="g. Cobertura de la vegatación acúatica"> </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(type, index) in aquaticVegetation"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ type.name }}
        </div>
        <b-radio
          v-for="option in aquaticVegetationOptions"
          :key="option.id"
          :native-value="option"
          v-model="aquaticVegetation[index].value"
          >{{ option.name }}</b-radio
        >
      </div>
    </div>
    <b-field label="h. Valor del Índice del Hábitat Fluvial (IHF)"> </b-field>
    <b-rate
      v-model="indiceHabitatFluvial"
      icon-pack="mdi"
      icon="star"
      :max="ihfRateConfig.max"
      size="is-medium"
      :show-text="true"
      :texts="ihfRateConfig.texts"
    >
    </b-rate>
  </div>
</template>
<script>
export default {
  data() {
    return {
      indiceHabitatFluvial: 1,
      ihfRateConfig: {
        max: 3,
        texts: [
          "Hábitat empobrecido",
          "Hábitat intermedio",
          "Hábitat bien constituido"
        ]
      },
      stonesInPools: "",
      substrateComposition: [
        { name: "Bloques y piedras", value: {} },
        { name: "Cantos y gravas", value: {} },
        { name: "Arena", value: {} },
        { name: "Limo y arcilla", value: {} }
      ],
      substrateOptions: [
        { id: 1, name: "<10%", value: "" },
        { id: 2, name: ">10%", value: "" }
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
        "rápido / profundo",
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
      ],
      randomElements: [],
      randomElementsOptions: [
        {
          name: "Hojarasca",
          options: [
            { name: "Presencia", value: 2 },
            { name: "10%-75%", value: 4 }
          ]
        },
        {
          name: "Troncos y ramas",
          options: [{ id: 1, name: "Presencia", value: 2 }]
        },
        {
          name: "Raíces descubiertas",
          options: [{ id: 2, name: "Presencia", value: 2 }]
        },
        {
          name: "Diques naturales",
          options: [{ id: 3, name: "Presencia", value: 2 }]
        }
      ],
      aquaticVegetationOptions: [
        { id: 1, name: "Alta", value: 5 },
        { id: 2, name: "Mod", value: 10 },
        { id: 3, name: "Baja", value: 5 }
      ],
      aquaticVegetation: [
        { name: "Algas filamentosas, musgos y hepáticas", value: {} },
        { name: "Algas adheridas a las piedras", value: {} },
        { name: "Plantas superiores y flotantes", value: {} }
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
