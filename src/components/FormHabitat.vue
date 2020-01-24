<template>
  <div class="form-section">
    <h5 class="title is-5">4. Índice del Hábitat Fluvial (100m)</h5>
    <b-field
      label="a. Grado de inclusión de las piedras, cantos y gravas en rápidos y pozas"
    >
      <b-select icon="gradient" v-model="stonesInPools">
        <option
          v-for="(option, index) in formHabitatData.stonesInPoolsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="b. Frecuencia de rápidos">
      <b-select icon="waves" v-model="rapidsFrequency">
        <option
          v-for="(option, index) in formHabitatData.rapidFrequencyOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
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
          v-for="option in formHabitatData.substrateCompositionPresenceOptions"
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
      <b-select icon="format-list-bulleted-type" v-model="velocityAndDepth">
        <option
          v-for="(option, index) in formHabitatData.velocityAndDepthOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="e. Sombre en el cauce">
      <b-select icon="box-shadow" v-model="riverShadows">
        <option
          v-for="(option, index) in formHabitatData.riverShadowsOptions"
          :value="option"
          :key="index"
          >{{ option.name }}</option
        >
      </b-select>
    </b-field>
    <b-field label="f. Presencia de elementos de heterogeneidad"> </b-field>
    <div class="block">
      <div
        class="radio-rows"
        v-for="(element, index) in randomElements"
        :key="index"
      >
        <div class="radio-rows__label-container">
          {{ element.name }}
        </div>
        <b-radio
          v-for="option in formHabitatData.randomElementPresenceOptions"
          :key="option.id"
          :native-value="option"
          v-model="randomElements[index].value"
          >{{ option.name }}</b-radio
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
          v-for="option in formHabitatData.aquaticVegetationCoverageOptions"
          :key="option.id"
          :native-value="option"
          v-model="aquaticVegetation[index].value"
          >{{ option.name }}</b-radio
        >
      </div>
    </div>
    <b-field label="h. Valor del Índice del Hábitat Fluvial (IHF)"> </b-field>
    <div class="results">
      <div class="block">
        <b-message :title="habitatIndex.name" type="is-info" :closable="false">
          {{ habitatIndex.description }}
          <div class="results__rate">
            <b-rate
              v-model="habitatIndex.value"
              icon-pack="mdi"
              icon="star"
              :max="3"
              size="is-medium"
              :show-text="false"
              :disabled="true"
            >
            </b-rate>
          </div>
          <div class="block">{{ habitatIndexValue }} puntos</div>
        </b-message>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      formHabitatData: state => state.formSections.habitat.data
    }),
    substrateCompositionSUM() {
      return this.getTotalPoints(this.substrateComposition);
    },
    randomElementsSUM() {
      return this.getTotalPoints(this.randomElements);
    },
    aquaticVegetationSUM() {
      return this.getTotalPoints(this.aquaticVegetation);
    },
    habitatIndexValue() {
      return (
        parseInt(this.stonesInPools.points) +
        parseInt(this.rapidsFrequency.points) +
        parseInt(this.substrateCompositionSUM) +
        parseInt(this.velocityAndDepth.points) +
        parseInt(this.riverShadows.points) +
        parseInt(this.randomElementsSUM) +
        parseInt(this.aquaticVegetationSUM)
      );
    },
    habitatIndex() {
      if (this.habitatIndexValue > 60) return this.habitatIndexCategories[0];
      if (this.habitatIndexValue < 40) return this.habitatIndexCategories[2];
      return this.habitatIndexCategories[1];
    }
  },
  data() {
    return {
      stonesInPools: {},
      substrateComposition: [],
      rapidsFrequency: {},
      velocityAndDepth: {},
      velocityAndDepthTypes: [
        "rápido / profundo",
        "lento / profundo",
        "lento / poco profundo",
        "rápido / poco profundo"
      ],
      riverShadows: {},
      randomElements: [],
      aquaticVegetation: [],
      habitatIndexCategories: [
        {
          id: 1,
          name: "Hábitat bien constituido",
          description:
            "Habitat bien constituido, excelente para el desarrollo...",
          value: 3
        },
        {
          id: 2,
          name: "Hábitat intermedio",
          description: "Habitat que puede soportar..",
          value: 2
        },
        {
          id: 3,
          name: "Hábitat empobrecido",
          description:
            "Habitat empobrecido. Posibilidad de obtener valores bajos de los índices...",
          value: 1
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.stonesInPools = this.formHabitatData.stonesInPoolsOptions[0];
      this.rapidsFrequency = this.formHabitatData.rapidFrequencyOptions[0];
      this.velocityAndDepth = this.formHabitatData.velocityAndDepthOptions[0];
      this.riverShadows = this.formHabitatData.riverShadowsOptions[0];
      this.prepareComplexObjects();
    },
    prepareComplexObjects() {
      //for objects that needs "value" as another object. ie: values with "points".
      for (const element of this.formHabitatData.substrateCompositionOptions) {
        this.substrateComposition.push({ ...element, value: {} });
      }
      for (const element of this.formHabitatData.aquaticVegetationeOptions) {
        this.aquaticVegetation.push({ ...element, value: {} });
      }
      for (const element of this.formHabitatData.randomElementOptions) {
        this.randomElements.push({ ...element, value: {} });
      }
    },
    getTotalPoints(items) {
      var sum = 0;
      for (const item of items) {
        if (item.value.points) {
          sum = sum + item.value.points;
        }
      }
      return sum;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.results {
  padding: 1rem;
  &__rate {
    padding: 1rem;
  }
}
</style>
