<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import manualRiosPDF from "@/assets/pdfs/Manual_PR_2024.pdf";
import { useAppStore } from "@/store/appStore.js";
import { downloadPDF } from "@/utils/download-pdf";
import { useRouter } from "vue-router";
import { saveSample } from "@/api/riosconciencia.js";
import spinner from "@/components/LoadingComponent.vue";

// STORES & COMPOSABLES
const router = useRouter();
const appStore = useAppStore();

// DATA
const values = ref({
  bioQualityIndex: null,
  riverbankNaturalness: null,
  riverbankConections: null,
  riverbankVegetations: null,
  qrisiIndex: null,
  riverbankInvasive: null,
  ecoStatus: {},
});
const isSendingData = ref(false);
const isSendActive = ref(false);

// LYFECYCLE
onMounted(() => {
  updateSpecificExpertSectionValues();
});

// COMPUTED
const qrisiIndexTotalPoints = computed(() => {
  if (areBiologicalAndRiverQualityValid.value) {
    const summatory =
      parseInt(values.value.riverbankNaturalness?.value) +
      parseInt(values.value.riverbankVegetations?.value) +
      parseInt(values.value.riverbankConections?.value);
    const invasiveValue = values.value.riverbankInvasive?.value;
    if (invasiveValue) {
      return summatory + invasiveValue;
    }
    return summatory;
  }
  return 0;
});
const qrisiIndex = computed(() => {
  return {
    cat: getRiverQualityCategory(qrisiIndexTotalPoints.value),
    totalPoints: qrisiIndexTotalPoints.value,
  };
});
const bioQualityHasErrors = computed(() => {
  return values.value.bioQualityIndex === null;
});
const naturalnessHasErrors = computed(() => {
  return values.value.riverbankNaturalness === null;
});
const vegetationsHasErrors = computed(() => {
  return values.value.riverbankVegetations === null;
});
const connectionsHasErrors = computed(() => {
  return values.value.riverbankConections === null;
});
const areBiologicalAndRiverQualityValid = computed(() => {
  return (
    !bioQualityHasErrors.value &&
    !naturalnessHasErrors.value &&
    !vegetationsHasErrors.value &&
    !connectionsHasErrors.value
  );
});
const ecoStatusIndex = computed(() => {
  if (!appStore.isFormExpertValid) return null;
  return calculateStatus();
});
const isReadySend = computed(() => {
  return appStore.isFormExpertValid && appStore.isOnline;
});
const isSectionValid = computed(() => {
  return areBiologicalAndRiverQualityValid.value !== null;
});
const statusOptions = computed(() => {
  return appStore.formExpertSections.health.data.ecologicalStateOptions;
});

// METHODS
const getRiverQualityCategory = (totalPoints) => {
  if (totalPoints <= 4)
    return appStore.formExpertSections.health.data.qrisiCategoriesOptions[2];
  if (totalPoints > 4 && totalPoints <= 8)
    return appStore.formExpertSections.health.data.qrisiCategoriesOptions[1];
  return appStore.formExpertSections.health.data.qrisiCategoriesOptions[0];
};
const updateSpecificExpertSectionValues = () => {
  if (appStore.formExpertSent) return;
  values.value.qrisiIndex = qrisiIndex.value;
  appStore.updateSpecificExpertSectionValues({
    name: "health",
    values: values.value,
    isValid: areBiologicalAndRiverQualityValid.value && isSectionValid.value,
  });
};
const calculateStatus = () => {
  const qrisiIndexValue =
    appStore.formExpertSections.health.results.qrisiIndex.cat.value;
  const bioQualityIndexValue =
    appStore.formExpertSections.health.results.bioQualityIndex.value;
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
      appStore.clearExpertFormResponses();
      isSendActive.value = false;
      appStore.formExpertSent = true;
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
    const newItem = { ...item, side: riverSides[0].id };
    fullList.push(newItem);
  }
  for (const item of rightMarginValues) {
    const newItem = { ...item, side: riverSides[1].id };
    fullList.push(newItem);
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

// WATCHERS
watch(
  () => values.value,
  async () => {
    await nextTick();
    updateSpecificExpertSectionValues();
  },
  { deep: true },
);
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>5. ESTADO DE SALUD DEL RÍO </span>
      </h5>
      <a
        class="header-section__help"
        target="_blank"
        @click="downloadPDF(manualRiosPDF, 'manual-rios')"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <!-- BIOLOGICAL -->
    <div class="header-section mt-3">
      <b-field
        label="5.1  Calidad biológica del agua"
        :message="{
          '*Seleccione una opción': bioQualityHasErrors,
        }"
        :type="{ 'is-danger': bioQualityHasErrors }"
      ></b-field>
    </div>
    <b-field>
      <b-select
        v-model="values.bioQualityIndex"
        placeholder="Selecciona calidad biológica del agua"
        icon="thumbs-up-down"
        expanded=""
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.health.data
            .bioQualityOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <div v-if="values.bioQualityIndex !== null" class="results">
      <div class="block">
        <b-message
          class="results-display"
          :title="values.bioQualityIndex.name"
          type="is-info"
          :closable="false"
        >
          {{ values.bioQualityIndex.description }}
          <div class="results__rate">
            <b-rate
              v-model="values.bioQualityIndex.value"
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
    <!-- RIVER QUALITY -->
    <div class="header-section mt-3">
      <b-field label="5.2 Calidad del bosque de ribera"></b-field>
      <div class="header-section__help"></div>
    </div>
    <b-field label="a. Estructura y complejidad de la ribera"> </b-field>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': naturalnessHasErrors,
      }"
      :type="{ 'is-danger': naturalnessHasErrors }"
    >
      <b-select
        v-model="values.riverbankNaturalness"
        icon="tree"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.health.data
            .riverbankNaturalnessOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="b. Conexión con las formas vegetales adyacentes"> </b-field>
    <b-field
      :message="{
        '*Hay que seleccionar una opción': connectionsHasErrors,
      }"
      :type="{ 'is-danger': connectionsHasErrors }"
    >
      <b-select
        v-model="values.riverbankConections"
        icon="transition"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.health.data
            .riverbankConectionsOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>

    <b-field
      label="c. Continuidad de la vegetación de ribera a lo largo del río"
      :message="{
        '*Hay que seleccionar una opción': vegetationsHasErrors,
      }"
      :type="{ 'is-danger': vegetationsHasErrors }"
    >
      <b-select
        v-model="values.riverbankVegetations"
        icon="transit-connection"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.health.data
            .riverbankVegetationsOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="d. Grado de cobertura de especies exóticas invasoras">
      <b-select
        v-model="values.riverbankInvasive"
        icon="sprout"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.health.data
            .riverbankInvasiveOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <div v-if="areBiologicalAndRiverQualityValid">
      <b-field label="Interpretación"> </b-field>
      <div class="results">
        <div class="block">
          <b-message
            :title="qrisiIndex.cat.name"
            class="results-display"
            type="is-info"
            :closable="false"
          >
            {{ qrisiIndex.cat.description }}
            <div class="results__rate">
              <b-rate
                v-model="qrisiIndex.cat.value"
                icon-pack="mdi"
                icon="star"
                :max="3"
                size="is-medium"
                :show-text="false"
                :disabled="true"
              >
              </b-rate>
            </div>
            <div class="block">{{ qrisiIndexTotalPoints }} puntos</div>
          </b-message>
        </div>
      </div>
    </div>
    <!-- ECO RESULT -->
    <div class="form-section">
      <div v-if="appStore.isFormExpertValid" class="block">
        <b-message
          title="Resumen"
          class="results-display"
          type="is-success"
          :closable="false"
        >
          <b-field label="Calidad Biológica del Agua">
            <b-tag type="is-info" size="is-medium">{{
              appStore.formExpertSections.health.results.bioQualityIndex.name
            }}</b-tag>
          </b-field>
          <b-field label="Calidad del Bosque de Ribera">
            <b-tag type="is-info" size="is-medium">{{
              appStore.formExpertSections.health.results.qrisiIndex.cat.name
            }}</b-tag>
          </b-field>
        </b-message>
      </div>
      <b-field label="5.3 Estado de salud "></b-field>
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
            No podrás enviar el formulario hasta que completes todas las
            secciones que están incompletas.
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
            Actualmente te encuentras sin conexión a internet, no podras enviar
            el formulario hasta que dispongas de conexión.
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
        >
          Enviar Resultados
        </b-button>
      </div>
      <spinner :is-loading="isSendingData"></spinner>
    </div>
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
