<template>
  <div class="form-section">
    <div class="block" v-if="isFormExpertValid">
      <b-message
        title="Resumen"
        class="results-display"
        type="is-success"
        :closable="false"
      >
        <b-field label="Hábitat Fluvial">
          <b-tag type="is-info" size="is-medium">{{
            habitatQuality.results.habitatIndex.cat.name
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
      <div class="block" v-if="isFormExpertValid">
        <b-message
          class="results-display"
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
          class="results-display"
          title="Formulario incompleto"
          type="is-warning"
          :closable="false"
        >
          No podrás enviar el formulario hasta que completes todas las secciones
          que están incompletas.
        </b-message>
      </div>
      <div class="block" v-if="!isComputedOnline">
        <b-message
          v-if="!isFormExpertValid"
          class="results-display"
          title="Estado sin conexión"
          type="is-warning"
          :closable="false"
        >
          Actualmente te encuentras sin conexión a internet, no podras enviar el
          formulario hasta que dispongas de conexión.
        </b-message>
        <b-message
          v-else
          class="results-display"
          title="Estado sin conexión"
          type="is-warning"
          :closable="false"
        >
          Actualmente te encuentras sin conexión a internet, mantente en esta
          pantalla y espera a tener conexión para enviar el formulario.
        </b-message>
      </div>
    </div>
    <b-field
      class="observations-field"
      label="Si ha ocurrido algo reseñable durante el muestreo o has encontrado algo que no has podido reflejar en el formulario, detállalo aquí:"
    >
      <b-input
        maxlength="300"
        type="textarea"
        v-model="values.observations"
      ></b-input>
    </b-field>
    <div class="big-button">
      <b-button
        type="is-danger"
        size="is-medium"
        expanded
        :disabled="!isReadySend"
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
  components: {
    spinner: () => import("@/components/Loading")
  },
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
        state.formExpertSections.ecoResult.data.ecologicalStateOptions,
      formSections: state => state.formExpertSections,
      habitatQuality: state => state.formExpertSections.habitat,
      riverQuality: state => state.formExpertSections.riverQuality,
      bioQuality: state => state.formExpertSections.biological
    }),
    ...mapGetters({
      isFormExpertValid: "isFormExpertValid"
    }),
    ecoStatusIndex() {
      if (!this.isFormExpertValid) return null;
      return this.calculateStatus();
    },
    isReadySend() {
      return this.isFormExpertValid && this.isComputedOnline;
    },
    isSectionValid() {
      return this.ecoStatusIndex !== null;
    }
  },
  beforeUpdate() {
    this.updateSpecificExpertSectionValues({
      name: "ecoResult",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificExpertSectionValues: "updateSpecificExpertSectionValues"
    }),
    calculateStatus() {
      const qrisiIndexValue = this.riverQuality.results.qrisiIndex.cat.value;
      const bioQualityIndexValue = this.bioQuality.results.bioQualityIndex
        .value;
      if (bioQualityIndexValue == 0) {
        return this._getStatusForNoCalculable();
      }
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
        await saveSample(this.user.token, sampleData);
        const toast = this.$buefy.toast.open({
          message: "¡Enhorabuena! El formulario se ha enviado con éxito",
          type: "is-success",
          duration: 5000
        });
        toast.$on("close", () => {
          this.$root.$emit("clearExpert");
        });
      } catch (err) {
        this.$buefy.toast.open({
          message:
            "Ooops, se ha producido un error intentando enviar el formulario",
          type: "is-danger",
          duration: 4000
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
          ecoStatus: this.ecoStatusIndex
        };
      }
      // Add sides prop to river margins values
      formResults.riverMarginConditions = this._setupRiverMarginsValues(
        this.formSections.basic.results.riverMarginConditionsLeft,
        this.formSections.basic.results.riverMarginConditionsRight,
        this.formSections.basic.data.riverSideOptions
      );
      formResults.riverMarginLandUse = this._setupRiverMarginsValues(
        this.formSections.basic.results.riverMarginLandUseLeft,
        this.formSections.basic.results.riverMarginLandUseRight,
        this.formSections.basic.data.riverSideOptions
      );

      return formResults;
    },
    _setupRiverMarginsValues(leftMarginValues, rightMarginValues, riverSides) {
      const fullList = [];
      for (let item of leftMarginValues) {
        item.side = riverSides[0].id;
        fullList.push(item);
      }
      for (let item of rightMarginValues) {
        item.side = riverSides[1].id;
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
    },
    _getStatusForNoCalculable() {
      return this.statusOptions[5];
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
.results-display {
  max-width: 500px;
}
.big-button {
  margin-top: 1.5rem;
}
</style>
