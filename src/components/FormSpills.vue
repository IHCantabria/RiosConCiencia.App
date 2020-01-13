<template>
  <div class="form-section">
    <h5 class="title is-5">2. Inspección de Vertidos (500m)</h5>
    <b-field label="Vertidos detectados">
      <b-select icon="grain" v-model="waterLevel">
        <option
          v-for="(option, index) in waterLevelOptions"
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
    return {};
  }
};
</script>
<style lang="scss" scoped></style>
