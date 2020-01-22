<template>
  <div class="form-section">
    <h5 class="title is-5">7. Calidad del Bosque de Ribera (QRISI)</h5>
    <b-field label="a. Estructura de las riberas, grado de naturalidad">
    </b-field>
    <b-field>
      <b-select icon="tree" v-model="riverbankNaturalness">
        <option
          v-for="(option, index) in riverbankNaturalnessOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="b. Conexión con las formas vegetales adyacentes"> </b-field>
    <b-field>
      <b-select icon="transition" v-model="riverbankConections">
        <option
          v-for="(option, index) in riverbankConectionsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="c. Continuidad de la vegetación"> </b-field>
    <b-field>
      <b-select icon="transit-connection" v-model="riverbankVegetations">
        <option
          v-for="(option, index) in riverbankVegetationsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="d. Valor del QRISI"> </b-field>
    <div class="results">
      <div class="block">
        <b-message :title="qrisi.name" type="is-info" :closable="false">
          {{ qrisi.description }}
          <div class="results__rate">
            <b-rate
              v-model="qrisi.value"
              icon-pack="mdi"
              icon="star"
              size="is-medium"
              :show-text="false"
              :disabled="true"
            >
            </b-rate>
          </div>
        </b-message>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      qrisiRateConfig: {
        max: 3,
        texts: [
          "Hábitat empobrecido",
          "Hábitat intermedio",
          "Hábitat bien constituido"
        ]
      },
      riverbankNaturalness: {},
      riverbankConections: {},
      riverbankVegetations: {},
      riverbankNaturalnessOptions: [
        { id: 1, name: "Bosque Denso", value: "6" },
        { id: 2, name: "Bosque 50%", value: "4" },
        { id: 3, name: "Bardales / árboles alineados", value: "2" }
      ],
      riverbankConectionsOptions: [
        { id: 1, name: "Total", value: "4" },
        { id: 2, name: "Parcial(campos agrícolas)", value: "3" },
        { id: 3, name: "Nula(urb/infraestructuras)", value: "0" }
      ],
      riverbankVegetationsOptions: [
        { id: 1, name: "Total", value: "2" },
        { id: 2, name: "Parcial", value: "1" },
        { id: 3, name: "Escasa / Nula", value: "0" }
      ],
      qrisiCategories: [
        {
          id: 1,
          name: "Alta, bien conservado",
          description: "El bosque de ribera presenta un estado óptimo...",
          value: 3
        },
        {
          id: 2,
          name: "Media, alteración importante",
          description:
            "El bosque de ribera presenta alteraciones importantes...",
          value: 2
        },
        {
          id: 3,
          name: "Muy degradado",
          description: "El bosque de ribera está muy degradado...",
          value: 1
        }
      ]
    };
  },
  computed: {
    qrisiValue() {
      return (
        parseInt(this.riverbankNaturalness.value) +
        parseInt(this.riverbankVegetations.value) +
        parseInt(this.riverbankConections.value)
      );
    },
    qrisi() {
      if (this.qrisiValue <= 4) return this.qrisiCategories[2];
      if (this.qrisiValue > 4 && this.qrisiValue <= 8)
        return this.qrisiCategories[1];
      return this.qrisiCategories[0];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.riverbankNaturalness = this.riverbankNaturalnessOptions[0];
      this.riverbankConections = this.riverbankConectionsOptions[0];
      this.riverbankVegetations = this.riverbankVegetationsOptions[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.results {
  padding: 1rem;
  &__rate {
    padding: 1rem;
  }
}
</style>
