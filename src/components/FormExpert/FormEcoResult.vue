<script setup>
import { ref, computed, onBeforeUpdate, onMounted } from "vue";
import { saveSample } from "@/api/riosconciencia.js";
import spinner from "@/components/LoadingComponent.vue";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import { useAppStore } from "@/store/appStore.js";
import { useRouter } from "vue-router";

// STORES & COMPOSABLES
const router = useRouter();
const appStore = useAppStore();

// DATA
const values = ref({
  ecoStatus: {},
});
const isSendingData = ref(false);
const isSendActive = ref(false);

// COMPUTED
const ecoStatusIndex = computed(() => {
  if (!appStore.isFormExpertValid) return null;
  return calculateStatus();
});
const isReadySend = computed(() => {
  return appStore.isFormExpertValid && appStore.isOnline;
});
const isSectionValid = computed(() => {
  return ecoStatusIndex.value !== null;
});
const statusOptions = computed(() => {
  return appStore.formExpertSections.ecoResult.data.ecologicalStateOptions;
});

// LYFECYCLE
onMounted(() => {
  updateSpecificExpertSectionValues();
});
onBeforeUpdate(() => {
  updateSpecificExpertSectionValues();
});

// METHODS
const updateSpecificExpertSectionValues = () => {
  appStore.updateSpecificExpertSectionValues({
    name: "ecoResult",
    values: values.value,
    isValid: isSectionValid.value,
  });
};
const calculateStatus = () => {
  const qrisiIndexValue =
    appStore.formExpertSections.riverQuality.results.qrisiIndex.cat.value;
  const bioQualityIndexValue =
    appStore.formExpertSections.biological.results.bioQualityIndex.value;
  if (bioQualityIndexValue == 0) {
    return _getStatusForNoCalculable();
  }
  if (qrisiIndexValue === 3) {
    return _getStatusForGoodQrisi(bioQualityIndexValue);
  } else if (qrisiIndexValue === 2) {
    return _getStatusForIntermediateQrisi(bioQualityIndexValue);
  } else if (qrisiIndexValue === 1) {
    return _getStatusForBadQrisi(bioQualityIndexValue);
  }
};
const sendSampleData = async () => {
  isSendActive.value = true;
  values.value.ecoStatus = ecoStatusIndex.value;
  const sampleData = _prepareSampleObj();
  try {
    isSendingData.value = true;
    await saveSample(appStore.user.token, sampleData);
    Toast.open({
      message: "¡Enhorabuena! El formulario se ha enviado con éxito",
      type: "is-success",
      duration: 6000,
    });
    setTimeout(() => {
      isSendActive.value = false;
      appStore.clearExpertFormResponses();
      router.push("/");
    }, 6000);
  } catch (err) {
    Toast.open({
      message:
        "Ooops, se ha producido un error intentando enviar el formulario",
      type: "is-danger",
      duration: 6000,
    });
    setTimeout(() => {
      isSendActive.value = false;
    }, 6000);
  } finally {
    isSendingData.value = false;
  }
};
const _prepareSampleObj = () => {
  let formResults = {};
  for (const section of Object.keys(appStore.formExpertSections)) {
    formResults = {
      ...formResults,
      ...appStore.formExpertSections[section].results,
      user: appStore.user,
      ecoStatus: ecoStatusIndex.value,
    };
  }
  // Add sides prop to river margins values
  formResults.riverMarginConditions = _setupRiverMarginsValues(
    appStore.formExpertSections.basic.results.riverMarginConditionsLeft,
    appStore.formExpertSections.basic.results.riverMarginConditionsRight,
    appStore.formExpertSections.basic.data.riverSideOptions,
  );
  formResults.riverMarginLandUse = _setupRiverMarginsValues(
    appStore.formExpertSections.basic.results.riverMarginLandUseLeft,
    appStore.formExpertSections.basic.results.riverMarginLandUseRight,
    appStore.formExpertSections.basic.data.riverSideOptions,
  );

  return formResults;
};
const _setupRiverMarginsValues = (
  leftMarginValues,
  rightMarginValues,
  riverSides,
) => {
  const fullList = [];
  for (const item of leftMarginValues) {
    item.side = riverSides[0].id;
    fullList.push(item);
  }
  for (const item of rightMarginValues) {
    item.side = riverSides[1].id;
    fullList.push(item);
  }
  return fullList;
};
const _getStatusForGoodQrisi = (bioQualityIndexValue) => {
  if (bioQualityIndexValue === 5) return statusOptions.value[0];
  if (bioQualityIndexValue === 4) return statusOptions.value[1];
  if (bioQualityIndexValue === 3) return statusOptions.value[2];
  if (bioQualityIndexValue === 2) return statusOptions.value[3];
  return statusOptions.value[4];
};
const _getStatusForIntermediateQrisi = (bioQualityIndexValue) => {
  if (bioQualityIndexValue === 5) return statusOptions.value[1];
  if (bioQualityIndexValue === 4) return statusOptions.value[2];
  if (bioQualityIndexValue === 3) return statusOptions.value[3];
  if (bioQualityIndexValue === 2) return statusOptions.value[4];
  return statusOptions.value[4];
};
const _getStatusForBadQrisi = (bioQualityIndexValue) => {
  if (bioQualityIndexValue === 5) return statusOptions.value[2];
  if (bioQualityIndexValue === 4) return statusOptions.value[3];
  if (bioQualityIndexValue === 3) return statusOptions.value[4];
  if (bioQualityIndexValue === 2) return statusOptions.value[4];
  return statusOptions.value[4];
};
const _getStatusForNoCalculable = () => {
  return statusOptions.value[5];
};
</script>

<template>
  <div class="form-section">
    <div v-if="appStore.isFormExpertValid" class="block">
      <b-message
        title="Resumen"
        class="results-display"
        type="is-success"
        :closable="false"
      >
        <b-field label="Hábitat Fluvial">
          <b-tag type="is-info" size="is-medium">{{
            appStore.formExpertSections.habitat.results.habitatIndex.cat.name
          }}</b-tag>
        </b-field>
        <b-field label="Calidad Biológica del Agua">
          <b-tag type="is-info" size="is-medium">{{
            appStore.formExpertSections.biological.results.bioQualityIndex.name
          }}</b-tag>
        </b-field>
        <b-field label="Calidad del Bosque de Ribera">
          <b-tag type="is-info" size="is-medium">{{
            appStore.formExpertSections.riverQuality.results.qrisiIndex.cat.name
          }}</b-tag>
        </b-field>
      </b-message>
    </div>
    <h5 class="title is-5">8. Estado ecológico</h5>
    <div>
      <div v-if="appStore.isFormExpertValid" class="block">
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
      <div v-else class="block">
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
      <div v-if="!appStore.isOnline" class="block">
        <b-message
          v-if="!appStore.isFormExpertValid"
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
        v-model="values.observations"
        maxlength="300"
        type="textarea"
      ></b-input>
    </b-field>
    <div class="big-button">
      <b-button
        type="is-danger"
        size="is-medium"
        expanded
        :disabled="!isReadySend || isSendActive"
        @click="sendSampleData()"
        >Enviar Resultados</b-button
      >
    </div>
    <spinner :is-loading="isSendingData"></spinner>
  </div>
</template>

<style lang="scss" scoped>
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
