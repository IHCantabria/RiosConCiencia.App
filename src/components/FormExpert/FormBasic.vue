<script setup>
import { ref, onMounted, onBeforeUpdate, computed, watch } from "vue";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import { getUserGeolocation } from "@/api/geolocation.js";
import { useAppStore } from "@/store/appStore.js";
import { downloadPDF } from "@/utils/download-pdf";
import BasicoPDF from "@/assets/pdfs/basico.pdf";
import VertidosPDF from "@/assets/pdfs/vertidos.pdf";
import residuosPDF from "@/assets/pdfs/residuos.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const values = ref({
  waterFlow: true,
  waterLevel: null,
  waterColor: "",
  waterSmell: "",
  waterElements: [],
  waterLevelCriticalProblem: "",
  riverBedWidth: null,
  riverBedDepth: null,
  riverSideWidthLeft: null,
  riverSideWidthRight: null,
  riverMarginConditionsLeft: [],
  riverMarginConditionsRight: [],
  riverMarginLandUseLeft: [],
  riverMarginLandUseRight: [],
  spillsList: null,
  wasteList: [],
});
const spillDiameter = ref(null);
const spillFlow = ref(null);
const spillColor = ref(null);
const spillLongitude = ref(0);
const spillLatitude = ref(0);
const spillSmell = ref(null);
const spillSource = ref(null);
const spillsTable = ref({
  selectedRows: [],
  columns: [
    {
      field: "position.longitude",
      label: "Longitud",
    },
    {
      field: "position.latitude",
      label: "Latitud",
    },
    {
      field: "diameter.name",
      label: "Diámetro",
    },
    {
      field: "flow.name",
      label: "Caudal",
    },
    {
      field: "color.name",
      label: "Color",
    },
    {
      field: "smell.name",
      label: "Olor",
    },
    {
      field: "source.name",
      label: "Origen",
    },
  ],
});
const selectedWaste = ref({});
const units = ref(1);
const wasteTable = ref({
  selectedRows: [],
  columns: [
    {
      field: "name",
      label: "Residuo",
    },
    {
      field: "units",
      label: "Unidades",
    },
  ],
});

// LYFECYCLE
onMounted(() => {
  init();
  updateSpecificExpertSectionValues();
});
onBeforeUpdate(() => {
  updateSpecificExpertSectionValues();
});

// COMPUTED
const landUseHasErrors = computed(() => {
  return (
    values.value.riverMarginLandUseLeft.length === 0 &&
    values.value.riverMarginLandUseRight.length === 0
  );
});
const riverConditionsHasErrors = computed(() => {
  return (
    values.value.riverMarginConditionsLeft.length === 0 &&
    values.value.riverMarginConditionsRight.length === 0
  );
});
const waterLevelHasErrors = computed(() => {
  return values.value.waterLevel === null;
});
const riverBedWidthHasErrors = computed(() => {
  return values.value.riverBedWidth === null;
});
const riverBedDepthHasErrors = computed(() => {
  return values.value.riverBedDepth === null;
});
const riverSideWidthRightHasErrors = computed(() => {
  return values.value.riverSideWidthRight === null;
});
const riverSideWidthLeftHasErrors = computed(() => {
  return values.value.riverSideWidthLeft === null;
});
const spillDisabled = computed(() => {
  return spillSource.value === null || spillDiameter.value === null;
});
const isSectionValid = computed(() => {
  return (
    !landUseHasErrors.value &&
    !riverConditionsHasErrors.value &&
    !waterLevelHasErrors.value &&
    !riverBedWidthHasErrors.value &&
    !riverBedDepthHasErrors.value &&
    !riverSideWidthRightHasErrors.value &&
    !riverSideWidthLeftHasErrors.value
  );
});

// METHODS
const init = () => {
  //default init values
  values.value.waterColor =
    appStore.formExpertSections.basic.data.waterColorOptions[0];
  values.value.waterSmell =
    appStore.formExpertSections.basic.data.waterSmellOptions[0];
  selectedWaste.value =
    appStore.formExpertSections.waste.data.wasteOptions[0].options[0];
};
const updateSpecificExpertSectionValues = () => {
  if (appStore.formExpertSent) return;
  appStore.updateSpecificExpertSectionValues({
    name: "basic",
    values: values.value,
    isValid: isSectionValid.value,
  });
};
const getActualPosition = () => {
  getUserGeolocation()
    .then((res) => {
      spillLongitude.value = parseFloat(res.coords.longitude).toFixed(7);
      spillLatitude.value = parseFloat(res.coords.latitude).toFixed(7);
      return;
    })
    .catch(() => {
      Toast.open({
        message: "No es posible geolocalizar la ubicación",
        type: "is-danger",
        duration: 4000,
      });
    });
};
const saveNewSpill = () => {
  const newSpill = {
    position: {
      longitude: spillLongitude.value,
      latitude: spillLatitude.value,
    },
    diameter: spillDiameter.value,
    flow: spillFlow.value,
    color: spillColor.value,
    smell: spillSmell.value,
    source: spillSource.value,
  };
  resetSpillValues();
  values.value.spillsList.push(newSpill);
  appStore.updateSectionValues({
    values: values.value,
    isValid: true,
  });
};
const resetSpillValues = () => {
  spillDiameter.value = null;
  spillFlow.value = null;
  spillColor.value = null;
  spillLongitude.value = 0;
  spillLatitude.value = 0;
  spillSmell.value = null;
  spillSource.value = null;
};
const removeSelectedSpills = () => {
  for (const spill of spillsTable.value.selectedRows) {
    const filtered = values.value.spillsList.filter((value) => {
      return value !== spill;
    });
    values.value.spillsList = filtered;
  }
  spillsTable.value.selectedRows = [];
  appStore.updateSectionValues({ values: values.value, isValid: true });
};
const saveNewWaste = () => {
  const newWaste = {
    ...selectedWaste.value,
    units: units.value,
  };
  const indexWaste = checkWasteExist(newWaste);
  addWaste(newWaste, indexWaste);
  units.value = 1;
  appStore.updateSectionValues({ values: values.value, isValid: true });
};
const checkWasteExist = (newWaste) => {
  return values.value.wasteList.findIndex((waste) => waste.id == newWaste.id);
};
const addWaste = (newWaste, index) => {
  index == -1
    ? values.value.wasteList.push(newWaste)
    : (values.value.wasteList[index].units =
        values.value.wasteList[index].units + newWaste.units);
};
const removeSelectedWaste = () => {
  for (const element of wasteTable.value.selectedRows) {
    const filtered = values.value.wasteList.filter((value) => {
      return value !== element;
    });
    values.value.wasteList = filtered;
  }
  wasteTable.value.selectedRows = [];
  appStore.updateSectionValues({ values: values.value, isValid: true });
};

// WATCHERS
watch(
  () => selectedWaste.value,
  () => {
    units.value = 1;
  },
);
</script>

<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>1. Inspección básica del tramo (500 m)</span>
      </h5>
      <a class="header-section__help" @click="downloadPDF(BasicoPDF, 'Basico')"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field label="1.1 ¿El agua del río fluye?"> </b-field>
    <b-field>
      <b-radio-button
        v-model="values.waterFlow"
        :native-value="false"
        type="is-danger"
      >
        <b-icon icon="close"></b-icon>
        <span>No</span>
      </b-radio-button>
      <b-radio-button
        v-model="values.waterFlow"
        :native-value="true"
        type="is-success"
      >
        <b-icon icon="check"></b-icon>
        <span>Sí</span>
      </b-radio-button>
    </b-field>
    <b-field
      label="1.2 Según vuestra opinión, ¿el nivel del agua es el habitual para la época del año?"
      :message="{
        '*Hay que seleccionar una opción': waterLevelHasErrors,
      }"
      :type="{ 'is-danger': waterLevelHasErrors }"
    >
      <b-select
        v-model="values.waterLevel"
        icon="arrow-expand-vertical"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .waterLevelOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Si hay algún problema crítico, intenta explicar su causa:">
      <b-input
        v-model="values.waterLevelCriticalProblem"
        maxlength="200"
        type="textarea"
      ></b-input>
    </b-field>
    <b-field
      label="1.3. Anchura media del cauce (m.):"
      :message="{
        '*Hay que seleccionar una opción': riverBedWidthHasErrors,
      }"
      :type="{ 'is-danger': riverBedWidthHasErrors }"
    >
      <b-select
        v-model="values.riverBedWidth"
        icon="arrow-expand-horizontal"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .riverBedWidthOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="1.4. Profundidad media del cauce (cm.):"
      :message="{
        '*Hay que seleccionar una opción': riverBedDepthHasErrors,
      }"
      :type="{ 'is-danger': riverBedDepthHasErrors }"
      river-side-width-has-errors
    >
      <b-select
        v-model="values.riverBedDepth"
        icon="arrow-expand-down"
        placeholder="Seleccione una opción"
      >
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .riverBedDepthOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="1.5. Anchura media de la zona de ribera (m.):"> </b-field>
    <div class="two-controls">
      <b-field
        label="Izquierda"
        :message="{
          '*Hay que seleccionar una opción': riverSideWidthLeftHasErrors,
        }"
        :type="{ 'is-danger': riverSideWidthLeftHasErrors }"
        custom-class="is-small"
      >
        <b-select
          v-model="values.riverSideWidthLeft"
          icon="arrow-expand-horizontal"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="(option, index) in appStore.formExpertSections.basic.data
              .riverSideWidthOptions"
            :key="index"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field
        label="Derecha"
        :message="{
          '*Hay que seleccionar una opción': riverSideWidthRightHasErrors,
        }"
        :type="{ 'is-danger': riverSideWidthRightHasErrors }"
        custom-class="is-small"
      >
        <b-select
          v-model="values.riverSideWidthRight"
          icon="arrow-expand-horizontal"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="(option, index) in appStore.formExpertSections.basic.data
              .riverSideWidthOptions"
            :key="index"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
    </div>
    <b-field label="1.6. ¿Cuál es el color del agua?">
      <b-select v-model="values.waterColor" icon="invert-colors">
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .waterColorOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="1.7. ¿Qué olor tiene el agua?">
      <b-select v-model="values.waterSmell" icon="grain">
        <option
          v-for="(option, index) in appStore.formExpertSections.basic.data
            .waterSmellOptions"
          :key="index"
          :value="option"
        >
          {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="1.8. ¿Hay indicios de?"></b-field>
    <div class="block">
      <b-checkbox
        v-for="(option, index) in appStore.formExpertSections.basic.data
          .waterElementsOptions"
        :key="index"
        v-model="values.waterElements"
        :native-value="option"
      >
        {{ option.name }}
      </b-checkbox>
    </div>
    <b-field
      label="1.9. ¿En qué condiciones se encuentran las márgenes de nuestro tramo del río?"
      :message="{
        '*Selecciona, al menos, una condición en las márgenes':
          riverConditionsHasErrors,
      }"
      type="is-danger"
    >
    </b-field>
    <div class="checkboxes-rows">
      <label class="checkboxes-rows__title">izq.</label>
      <label class="checkboxes-rows__title">der.</label>
    </div>
    <div
      v-for="(option, index) in appStore.formExpertSections.basic.data
        .riverMarginConditionOptions"
      :key="index"
      class="checkboxes-rows"
    >
      <b-checkbox
        v-model="values.riverMarginConditionsLeft"
        :native-value="option"
      >
      </b-checkbox>
      <b-checkbox
        v-model="values.riverMarginConditionsRight"
        :native-value="option"
      >
      </b-checkbox>
      {{ option.name }}
    </div>
    <div class="checks-container">
      <b-field
        label="1.10. ¿Cuáles son los usos del suelo en las márgenes del río?"
        :message="{
          '*Selecciona, al menos, un uso del suelo en las márgenes':
            landUseHasErrors,
        }"
        type="is-danger"
      >
      </b-field>
      <div class="checkboxes-rows">
        <label class="checkboxes-rows__title">izq.</label>
        <label class="checkboxes-rows__title">der.</label>
      </div>
      <div
        v-for="(option, index) in appStore.formExpertSections.basic.data
          .riverMarginLandUseOptions"
        :key="index"
        class="checkboxes-rows"
      >
        <b-checkbox
          v-model="values.riverMarginLandUseLeft"
          :native-value="option"
        >
        </b-checkbox>
        <b-checkbox
          v-model="values.riverMarginLandUseRight"
          :native-value="option"
        >
        </b-checkbox>
        {{ option.name }}
      </div>
    </div>
  </div>
  <!-- SPILLS -->
  <div class="form-section">
    <div class="header-section mt-5">
      <b-field label="1.11. Inspección de vertidos (500 m)"> </b-field>
      <a
        class="header-section__help"
        @click="downloadPDF(VertidosPDF, 'vertidos')"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <div class="form-section__block form-section__block-spills">
      <b-field label="Coordenadas (WGS84)"></b-field>
      <div class="two-controls">
        <b-field label="Lon" custom-class="is-small">
          <b-input
            v-model="spillLongitude"
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
            v-model="spillLatitude"
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
      <b-field
        label="Diámetro"
        message="*Este campo es obligatorio al añadir un vertido"
      >
        <b-select
          v-model="spillDiameter"
          icon="diameter-outline"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="(option, index) in appStore.formExpertSections.spills.data
              .spillDiameterOptions"
            :key="index"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Caudal">
        <b-select
          v-model="spillFlow"
          icon="elevation-rise"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="option in appStore.formExpertSections.spills.data
              .spillFlowOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Color">
        <b-select
          v-model="spillColor"
          icon="invert-colors"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="option in appStore.formExpertSections.spills.data
              .spillColorOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Olor">
        <b-select
          v-model="spillSmell"
          icon="grain"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="option in appStore.formExpertSections.spills.data
              .spillSmellOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field
        label="Origen"
        message="*Este campo es obligatorio al añadir un vertido"
      >
        <b-select
          v-model="spillSource"
          icon="source-commit-start"
          placeholder="Seleccione una opción"
        >
          <option
            v-for="option in appStore.formExpertSections.spills.data
              .spillSourceOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-button
        type="is-primary"
        :disabled="spillDisabled"
        @click="saveNewSpill"
      >
        Guardar
      </b-button>
    </div>

    <div
      v-if="values.spillsList && values.spillsList.length > 0"
      class="table-container"
    >
      <b-table
        v-model:checked-rows="spillsTable.selectedRows"
        :data="values.spillsList"
        :columns="spillsTable.columns"
        :narrowed="true"
        :mobile-cards="true"
        class="table-spills"
        checkable
      ></b-table>
    </div>
    <div v-else>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="pipe-leak" size="is-large"> </b-icon>
          </p>
          <p>No hay vertidos</p>
        </div>
      </section>
    </div>

    <b-field v-if="spillsTable.selectedRows.length > 0">
      <b-button
        type="is-primary"
        icon-left="delete"
        outlined
        size="is-small"
        expanded
        @click="removeSelectedSpills()"
        >Eliminar vertidos seleccionados</b-button
      >
    </b-field>
  </div>
  <!-- WASTE -->
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>3. Inspección de residuos (100 m)</span>
      </h5>
      <a
        class="header-section__help"
        target="_blank"
        @click="downloadPDF(residuosPDF, 'residuos')"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <div class="form-section__block form-section__block-waste">
      <b-field>
        <b-select
          v-model="selectedWaste"
          placeholder="Seleccione tipo de residuo"
          icon="delete-variant"
          expanded=""
        >
          <optgroup
            v-for="(group, index) in appStore.formExpertSections.waste.data
              .wasteOptions"
            :key="index"
            :label="group.material.toUpperCase()"
          >
            <option
              v-for="(option, indexOption) in group.options"
              :key="indexOption"
              :value="option"
            >
              {{ option.name }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
      <b-field>
        <b-numberinput v-model="units" min="1"></b-numberinput>
      </b-field>
      <b-button type="is-primary" @click="saveNewWaste"> Guardar </b-button>
    </div>
    <div v-if="values.wasteList.length > 0" class="table-container">
      <b-table
        v-model:checked-rows="wasteTable.selectedRows"
        :data="values.wasteList"
        :columns="wasteTable.columns"
        :narrowed="true"
        :mobile-cards="false"
        checkable
      ></b-table>
    </div>
    <div v-else>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="delete-variant" size="is-large"> </b-icon>
          </p>
          <p>No hay residuos</p>
        </div>
      </section>
    </div>
    <b-field v-if="wasteTable.selectedRows.length > 0">
      <b-button
        type="is-primary"
        icon-left="delete"
        outlined
        size="is-small"
        expanded
        @click="removeSelectedWaste()"
        >Eliminar residuos seleccionados</b-button
      >
    </b-field>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  padding: 1rem;
}
</style>
