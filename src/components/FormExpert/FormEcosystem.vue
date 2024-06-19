<!-- eslint-disable promise/always-return -->
<script setup>
import { ref, onBeforeUpdate, computed, onMounted, watch } from "vue";
import { getUserGeolocation } from "@/api/geolocation.js";
import { useAppStore } from "@/store/appStore.js";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import { downloadPDF } from "@/utils/download-pdf";
import EcosystemPDF from "@/assets/pdfs/ecosistema.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const values = ref({
  samplePointCoords: {
    lon: 0,
    lat: 0,
  },
  samplePointWidth: null,
  samplePointDepth: null,
  samplePointWaterVelocity: null,
  samplePointWaterTemp: 0,
  waterTransparency: null,
  riverEcosystem: [],
  riverEcosystemInvPlantsCoverage: [],
  riverEcosystemSpecies: [],
});

// LYFECYCLE
onMounted(() => {
  init();
});
onBeforeUpdate(() => {
  if (appStore.formExpertSent) return;
  appStore.updateSpecificExpertSectionValues({
    name: "ecoSystem",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// COMPUTED
const invasorsComputed = computed(() => {
  const invasorsComputed =
    appStore.formExpertSections.ecoSystem.data.invasorPlantOptions;
  invasorsComputed.forEach((invasor) => {
    invasor.value =
      appStore.formExpertSections.ecoSystem.data.coverageOptions[2];
  });
  return invasorsComputed;
});
const flow = computed(() => {
  return (
    values.value.samplePointWidth *
    values.value.samplePointDepth *
    values.value.samplePointWaterVelocity
  );
});
const waterTempHasErrors = computed(() => {
  return values.value.samplePointWaterTemp === null;
});
const transparencyHasErrors = computed(() => {
  return values.value.waterTransparency === null;
});
const isSectionValid = computed(() => {
  return !waterTempHasErrors.value && !transparencyHasErrors.value;
});

// METHODS
// ...mapActions({
//   updateSpecificExpertSectionValues: "updateSpecificExpertSectionValues",
// }),
const init = () => {
  values.value.samplePointWaterTemp = null; //default value and make beforeUpdate hook jump
};
const InvasorSelectedIndex = (option) => {
  return values.value.riverEcosystemInvPlantsCoverage.indexOf(option);
};
const CategoryOrder = (item) => {
  return `eukaryote${item.id}`;
};
const getActualPosition = () => {
  return getUserGeolocation()
    .then((res) => {
      values.value.samplePointCoords.lon = parseFloat(
        res.coords.longitude,
      ).toFixed(7);
      values.value.samplePointCoords.lat = parseFloat(
        res.coords.latitude,
      ).toFixed(7);
    })
    .catch(() => {
      Toast.open({
        message: "No es posible geolocalizar la ubicación",
        type: "is-danger",
        duration: 4000,
      });
    });
};

// WATCHERS
watch(
  () => values.value,
  (newValue) => {
    if (newValue.samplePointWidth == 0) {
      values.value.samplePointWidth = null;
    }
    if (newValue.samplePointDepth == 0) {
      values.value.samplePointDepth = null;
    }
    if (newValue.samplePointWaterVelocity == 0) {
      values.value.samplePointWaterVelocity = null;
    }
  },
);
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>5. El ecosistema acuático (50 m)</span>
      </h5>
      <a
        class="header-section__help"
        @click="downloadPDF(EcosystemPDF, 'Ecosistema')"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field label="a. Descripción del punto de muestreo"> </b-field>
    <b-field label="Coordenadas (WGS84)" custom-class="is-small"></b-field>
    <div class="two-controls">
      <b-field label="Lon" custom-class="is-small">
        <b-input
          v-model="values.samplePointCoords.lon"
          placeholder="Number"
          type="number"
          min="-180"
          max="180"
          step="any"
          custom-class="is-small"
        >
        </b-input>
      </b-field>
      <b-field label="Lat" custom-class="is-small">
        <b-input
          v-model="values.samplePointCoords.lat"
          placeholder="Number"
          type="number"
          min="-90"
          max="90"
          step="any"
          custom-class="is-small"
        >
        </b-input>
      </b-field>
    </div>
    <b-field>
      <b-button
        type="is-primary"
        icon-left="map-marker"
        outlined
        size="is-small"
        expanded
        @click="getActualPosition()"
        >Obtener posición actual</b-button
      >
    </b-field>
    <b-field label="Anchura (m)" custom-class="is-small">
      <b-numberinput
        v-model="values.samplePointWidth"
        step="0.1"
        min="0"
      ></b-numberinput>
    </b-field>
    <b-field label="Profundidad media (m)" custom-class="is-small">
      <b-numberinput
        v-model="values.samplePointDepth"
        step="0.1"
        min="0"
      ></b-numberinput>
    </b-field>
    <b-field label="Velocidad del agua (m/s)" custom-class="is-small">
      <b-numberinput
        v-model="values.samplePointWaterVelocity"
        step="0.1"
        min="0"
      ></b-numberinput>
    </b-field>
    <b-field label="Caudal" custom-class="is-small"> </b-field>
    <label>{{ flow }}m³/s</label>
    <div class="is-divider"></div>
    <b-field label="b. Características físicas del agua"> </b-field>
    <b-field
      label="Temperatura (°C)"
      custom-class="is-small"
      :message="{
        '*Hay que definir la temperatura del agua': waterTempHasErrors,
      }"
      :type="{ 'is-danger': waterTempHasErrors }"
    >
      <b-numberinput
        v-model="values.samplePointWaterTemp"
        step="0.5"
      ></b-numberinput>
    </b-field>
    <b-field label="Transparencia" custom-class="is-small"> </b-field>
    <b-field
      label="(marcar solo los sectores que se ven en el disco, en el caso de no ver
        ninguno, marcar el 0)"
      custom-class="is-small"
      :message="{
        '*Al menos un sector debe estar marcado': transparencyHasErrors,
      }"
      :type="{ 'is-danger': transparencyHasErrors }"
    ></b-field>

    <div class="block">
      <div class="radio-rows">
        <div class="radio-rows__options-container">
          <b-field>
            <b-radio-button
              v-for="option in appStore.formExpertSections.ecoSystem.data
                .transparencyOptions"
              :key="option.id"
              v-model="values.waterTransparency"
              :native-value="option"
              >{{ option.name }}
            </b-radio-button>
          </b-field>
        </div>
      </div>
    </div>
    <div class="is-divider"></div>
    <b-field label="c. La vida en el río y las riberas"> </b-field>
    <div
      v-for="(category, indexCat) in appStore.formExpertSections.ecoSystem.data
        .eukaryoteComplexOptions"
      :key="indexCat + 10"
      :class="['block', CategoryOrder(category)]"
    >
      <div class="checkboxes-group">
        <label class="checkboxes-group__title">{{ category.name }}</label>
      </div>
      <div v-for="(group, indexGroup) in category.options" :key="indexGroup">
        <div class="checkboxes-group">
          <label class="checkboxes-group__subtitle">{{ group.name }}</label>
        </div>
        <div v-for="option in group.options" :key="option.id" class="field">
          <b-checkbox v-model="values.riverEcosystem" :native-value="option">{{
            option.name
          }}</b-checkbox>
          <div
            v-for="subOpt in option.options"
            :key="subOpt.id"
            class="field sub-check"
          >
            <b-checkbox
              v-model="values.riverEcosystemSpecies"
              size="is-small"
              :native-value="subOpt"
              >{{ subOpt.name }}</b-checkbox
            >
          </div>
        </div>
      </div>
      <template v-if="category.id == 2">
        <div key="20" class="block">
          <div class="checkboxes-group">
            <label class="checkboxes-group__subtitle"
              >Invasoras / Alóctonas (grado de cobertura)</label
            >
          </div>
          <div
            v-for="option in invasorsComputed"
            :key="option.id"
            class="field"
          >
            <b-checkbox
              v-model="values.riverEcosystemInvPlantsCoverage"
              :native-value="option"
              >{{ option.name }}</b-checkbox
            >
            <div
              v-if="InvasorSelectedIndex(option) != -1"
              class="radio-rows__options-container"
            >
              <b-field>
                <b-radio-button
                  v-for="type in appStore.formExpertSections.ecoSystem.data
                    .coverageOptions"
                  :key="type.id"
                  v-model="
                    values.riverEcosystemInvPlantsCoverage[
                      InvasorSelectedIndex(option)
                    ].value
                  "
                  class="radio-rows__options-container-item"
                  :native-value="type"
                  >{{ type.name }}</b-radio-button
                >
              </b-field>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div
      v-for="(category, indexCatSimple) in appStore.formExpertSections.ecoSystem
        .data.eukaryoteSimpleOptions"
      :key="indexCatSimple"
      :class="['block', CategoryOrder(category)]"
    >
      <div class="checkboxes-group">
        <label class="checkboxes-group__title">{{ category.name }}</label>
      </div>
      <div v-for="option in category.options" :key="option.id" class="field">
        <b-checkbox v-model="values.riverEcosystem" :native-value="option">{{
          option.name
        }}</b-checkbox>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-check {
  margin: 1rem;
}

.eukaryote1 {
  order: 1;
}

.eukaryote2 {
  order: 2;
}

.eukaryote3 {
  order: 3;
}

.eukaryote4 {
  order: 4;
}

.eukaryote5 {
  order: 5;
}

.eukaryote6 {
  order: 6;
}

.eukaryote7 {
  order: 7;
}

.eukaryote8 {
  order: 8;
}

.eukaryote9 {
  order: 9;
}
</style>
