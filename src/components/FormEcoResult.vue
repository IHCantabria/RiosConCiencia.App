<template>
  <div class="form-section">
    <div class="block">
      <b-message title="Resumen" type="is-success">
        <b-field label="Hábitat Fluvial">
          <b-tag type="is-info" size="is-medium">{{
            bioQuality.results.bioQualityIndex.name
          }}</b-tag>
        </b-field>
        <b-field label="Calidad Biológica del Agua">
          <b-tag type="is-info" size="is-medium">{{
            bioQuality.results.bioQualityIndex.name
          }}</b-tag>
        </b-field>
        <b-field label="Calidad del Bosque de Ribera">
          <b-tag type="is-info" size="is-medium">{{
            riverQuality.results.qrisiIndex.cat.name
          }}</b-tag>
        </b-field>
      </b-message>
    </div>
    <div class="is-divider"></div>
    <h5 class="title is-5">8. Estado ecológico</h5>
    <div class="results">
      <div class="block" v-if="ecoStatus !== null">
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
      <div class="block" v-if="!isStateEcoReady">
        <b-message
          title="Formulario incompleto"
          type="is-warning"
          :closable="false"
        >
          Hace falta completar la CALIDAD DEL AGUA y la CALIDAD DEL BOSQUE DE
          RIBERA para ver el resultado del Estado Ecológico.
        </b-message>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "FormEcoResult",
  computed: {
    ...mapState({
      statusOptions: state =>
        state.formSections.ecoResult.data.ecologicalStateOptions,
      riverQuality: state => state.formSections.riverQuality,
      bioQuality: state => state.formSections.biological
    }),
    ...mapGetters({
      isStateEcoReady: "isStateEcoReady"
    }),
    ecoStatus() {
      if (!this.isStateEcoReady) return null;
      return this.calculateStatus();
    }
  },
  methods: {
    calculateStatus() {
      const qrisiIndexValue = this.riverQuality.results.qrisiIndex.cat.value;
      const bioQualityIndexValue = this.bioQuality.results.bioQualityIndex
        .value;

      if (qrisiIndexValue === 3) {
        return this._getStatusForGoodQrisi(bioQualityIndexValue);
      } else if (qrisiIndexValue === 2) {
        return this._getStatusForIntermediateQrisi(bioQualityIndexValue);
      } else if (qrisiIndexValue === 1) {
        return this._getStatusForBadQrisi(bioQualityIndexValue);
      }
    },
    _getStatusForGoodQrisi(bioQualityIndexValue) {
      if (bioQualityIndexValue === 5) return this.statusOptions[0];
      if (bioQualityIndexValue === 4) return this.statusOptions[1];
      if (bioQualityIndexValue === 3) return this.statusOptions[2];
      if (bioQualityIndexValue === 2) return this.statusOptions[3];
      return this.statusOptions[4];
    },
    _getStatusForIntermediateQrisi(bioQualityIndexValue) {
      if (bioQualityIndexValue === 5) return this.statusOptions[1];
      if (bioQualityIndexValue === 4) return this.statusOptions[2];
      if (bioQualityIndexValue === 3) return this.statusOptions[3];
      if (bioQualityIndexValue === 2) return this.statusOptions[4];
      return this.statusOptions[4];
    },
    _getStatusForBadQrisi(bioQualityIndexValue) {
      if (bioQualityIndexValue === 5) return this.statusOptions[2];
      if (bioQualityIndexValue === 4) return this.statusOptions[3];
      if (bioQualityIndexValue === 3) return this.statusOptions[4];
      if (bioQualityIndexValue === 2) return this.statusOptions[4];
      return this.statusOptions[4];
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
