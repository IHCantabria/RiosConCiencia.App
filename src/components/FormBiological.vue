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
          v-for="(option, index) in formBiologicalData.bioQualityOptions"
          :value="option"
          :key="index"
        >
          {{ option.name }}</option
        >
      </b-select>
    </b-field>
    <div class="results" v-if="bioQuality !== null">
      <div class="block">
        <b-message :title="bioQuality.name" type="is-info" :closable="false">
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      bioQuality: null
    };
  },
  computed: {
    ...mapState({
      formBiologicalData: state => state.formSections.biological.data
    })
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
