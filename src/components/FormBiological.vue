<template>
  <div class="form-section">
    <h5 class="title is-5">6. Calidad Biológica del agua</h5>
    <b-field>
      <b-select
        placeholder="Selecciona calidad biológica del agua"
        icon="thumbs-up-down"
        expanded=""
        v-model="bioQuality"
      >
        <option
          v-for="(option, index) in bioQualityOptions"
          :value="option"
          :key="index"
        >
          {{ option.name }}</option
        >
      </b-select>
    </b-field>
    <div class="results" v-if="bioQuality !== null">
      <div class="block">
        <b-message
          :title="bioQuality.name"
          type="is-info"
          aria-close-label="Close message"
        >
          {{ bioQuality.description }}
          <div class="results__rate">
            <b-rate
              v-model="bioQuality.value"
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
      bioQuality: null,
      bioQualityOptions: [
        {
          id: 1,
          name: "Muy buena",
          description: "Todos los organismos identificados...",
          value: 5
        },
        {
          id: 2,
          name: "Buena",
          description: "Todos los organismos identificados...",
          value: 4
        },
        {
          id: 3,
          name: "Moderada",
          description: "Todos los organismos identificados...",
          value: 3
        },
        {
          id: 4,
          name: "Deficiente",
          description: "Todos los organismos identificados...",
          value: 2
        },
        {
          id: 5,
          name: "Mala",
          description: "Todos los organismos identificados...",
          value: 1
        }
      ]
    };
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
