<template>
  <div class="form-section">
    <h5 class="title is-5">1. Inspección Básica del tramo (500m)</h5>
    <b-field label="¿El agua del río fluye?"> </b-field>
    <b-field>
      <b-radio-button v-model="waterFlow" native-value="false" type="is-danger">
        <b-icon icon="close"></b-icon>
        <span>No</span>
      </b-radio-button>

      <b-radio-button v-model="waterFlow" native-value="true" type="is-success">
        <b-icon icon="check"></b-icon>
        <span>Si</span>
      </b-radio-button>
    </b-field>
    <b-field label="¿Es el nivel del agua habitual para la época del año?">
      <b-select icon="arrow-expand-vertical" v-model="waterLevel">
        <option
          v-for="(level, index) in waterLevelOptions"
          :value="level"
          :key="index"
          >{{ level }}</option
        >
      </b-select>
    </b-field>
    <b-field label="Si hay algún problema crítico, intenta explicar su causa:">
      <b-input
        maxlength="200"
        type="textarea"
        :value="waterLevelCriticalProblem"
      ></b-input>
    </b-field>
  </div>
</template>
<script>
export default {
  data() {
    return {
      waterFlow: true,
      waterLevel: "",
      waterLevelCriticalProblem: "Sample text",
      waterLevelOptions: ["Normal", "Más alto", "Más bajo"]
    };
  },
  mounted() {
    //default init values
    this.waterLevel = this.waterLevelOptions[0];
  }
};
</script>
<style lang="scss" scoped></style>
