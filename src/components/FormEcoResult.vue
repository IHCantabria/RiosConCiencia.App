<template>
  <div class="form-section">
    <div class="block" v-if="isFormValid">
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

    <h5 class="title is-5">8. Estado ecológico</h5>
    <div>
      <div class="block" v-if="isFormValid">
        <b-message
          :title="ecoStatusIndex.name"
          type="is-info"
          :closable="false"
        >
          {{ ecoStatusIndex.description }}
          <div class="results__rate">
            <b-rate
              v-model="ecoStatusIndex.value"
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
      <div class="block" v-else>
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

    <div class="big-button">
      <b-button
        type="is-danger"
        size="is-medium"
        expanded
        :disabled="!isFormValid"
        @click="sendSampleData()"
        >Enviar Resultados</b-button
      >
    </div>
    <spinner :is-loading="isSendingData"></spinner>
  </div>
</template>
<script>
import { saveSample } from "@/api/riosconciencia.js";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "FormEcoResult",
  data() {
    return {
      values: {
        ecoStatus: {}
      },
      isSendingData: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      statusOptions: state =>
        state.formSections.ecoResult.data.ecologicalStateOptions,
      formSections: state => state.formSections,
      riverQuality: state => state.formSections.riverQuality,
      bioQuality: state => state.formSections.biological
    }),
    ...mapGetters({
      isFormValid: "isFormValid"
    }),
    ecoStatusIndex() {
      if (!this.isFormValid) return null;
      return this.calculateStatus();
    },
    isSectionValid() {
      return this.ecoStatusIndex !== null;
    }
  },
  methods: {
    ...mapActions({
      updateSectionValues: "updateSectionValues"
    }),
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
    async sendSampleData() {
      this.values.ecoStatus = this.ecoStatusIndex;
      const sampleData = this._prepareSampleObj();
      try {
        this.isSendingData = true;
        const res = await saveSample(this.user.token, sampleData);
        console.log(res);
        this.$buefy.toast.open({
          message: "¡Enhorabuena! El formulario se ha enviado con éxito",
          type: "is-success"
        });
      } catch (err) {
        this.$buefy.toast.open({
          message:
            "Ooops, se ha producido un error intentando enviar el formulario",
          type: "is-danger"
        });
      } finally {
        this.isSendingData = false;
      }
    },
    _prepareSampleObj() {
      var formResults = {};
      for (let section of Object.keys(this.formSections)) {
        formResults = {
          ...formResults,
          ...this.formSections[section].results,
          user: this.user,
          //TODO: no haría falta mandar este tipo de objeto, hay que cambiar en la BD el modelo
          ecoStatus: { cat: this.ecoStatusIndex, totalPoints: 0 }
        };
      }
      // Add sides prop to river margins values
      formResults.riverMarginConditions = this._setupRiverMarginsValues(
        this.formSections.basic.results.riverMarginConditionsLeft,
        this.formSections.basic.results.riverMarginConditionsRight
      );
      formResults.riverMarginLandUse = this._setupRiverMarginsValues(
        this.formSections.basic.results.riverMarginLandUseLeft,
        this.formSections.basic.results.riverMarginLandUseRight
      );

      return formResults;
    },
    _setupRiverMarginsValues(leftMarginValues, rightMarginValues) {
      const fullList = [];
      for (let item of leftMarginValues) {
        item.side = 1;
        fullList.push(item);
      }
      for (let item of rightMarginValues) {
        item.side = 2;
        fullList.push(item);
      }
      return fullList;
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
.big-button {
  margin-top: 1.5rem;
}
</style>
