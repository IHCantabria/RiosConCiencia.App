<template>
  <div class="form-section">
    <h5 class="title is-5">8. Estado ecológico</h5>
    <div class="results">
      <div class="block">
        <b-message :title="ecoStatus.name" type="is-info" :closable="false">
          {{ ecoStatus.description }}
          <div class="results__rate">
            <b-rate
              v-model="ecoStatus.value"
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
      ecoStatusCategories: [
        {
          id: 1,
          name: "Muy buen estado",
          description: "Sin alteraciones humanas",
          value: 5
        },
        {
          id: 2,
          name: "Buen estado",
          description: "Leves alteraciones",
          value: 4
        },
        {
          id: 3,
          name: "Moderado",
          description: "Alteraciones considerables",
          value: 3
        },
        {
          id: 4,
          name: "Estado deficiente",
          description: "Alteraciones importantes",
          value: 2
        },
        {
          id: 5,
          name: "Mal estado",
          description: "Muy degradado",
          value: 1
        }
      ]
    };
  },
  computed: {
    ecoStatus() {
      return this.ecoStatusCategories[0];
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
