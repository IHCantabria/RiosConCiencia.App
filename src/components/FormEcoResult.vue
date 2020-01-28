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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      formEcoResultData: state => state.formSections.ecoResult.data
    }),
    ecoStatus() {
      return this.formEcoResultData.ecologicalStateOptions[0];
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
