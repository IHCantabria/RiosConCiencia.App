<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import { downloadPDF } from "@/utils/download-pdf";
import helpDepth1 from "@/assets/images/picts/depth/helpDepth1.jpg";
import helpDepth2 from "@/assets/images/picts/depth/helpDepth2.jpg";
import helpDepth3 from "@/assets/images/picts/depth/helpDepth3.jpg";
import titleDepth from "@/assets/images/picts/depth/titleDepth.jpg";
import yellowDepth from "@/assets/images/picts/depth/yellowDepth.jpg";
import blueDepth from "@/assets/images/picts/depth/blueDepth.jpg";
import greenDepth from "@/assets/images/picts/depth/greenDepth.jpg";
import redDepth from "@/assets/images/picts/depth/redDepth.jpg";
import ProfundidadPDF from "@/assets/pdfs/1_3_Profundidad_rio.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterDepth: null,
});

// COMPUTED
const isSectionValid = computed(() => {
  return true; //optional section
});

// LYFECYCLE
onMounted(() => {
  init();
});
onBeforeUpdate(() => {
  if (appStore.pictsFormSent) return;
  const valuesFormated = {
    waterDepth: values.value.waterDepth.length
      ? values.value.waterDepth[0]
      : null,
  };
  appStore.updateSpecificPictsSectionValues({
    name: "depth",
    values: valuesFormated,
    isValid: isSectionValid.value,
  });
});

// METHODS
const init = () => {
  values.value.waterDepth = []; //default value and make beforeUpdate hook jump
};
const isSelected = (object) => {
  return (
    values.value.waterDepth?.length &&
    values.value.waterDepth[0].id === object.id
  );
};
const getOptionImg = (id) => {
  switch (id) {
    case 1:
      return yellowDepth;
    case 2:
      return blueDepth;
    case 3:
      return greenDepth;
    case 4:
      return redDepth;
    default:
      return "";
  }
};
const updateSelectedOption = (option) => {
  values.value.waterDepth = [option]; // Establece el objeto seleccionado como el único elemento del array
};

// WATCHERS
watch(
  () => values.value,
  (newValue) => {
    if (newValue.waterDepth.length > 1) {
      values.value.waterDepth.shift();
    }
  },
);
</script>

<template>
  <div class="form-section-picts form-section">
    <h5 class="title is-5 header-section__text">
      <span>Estudio del río</span>
    </h5>
    <div class="header-section">
      <b-field label="1.3 Profundidad del río:" />
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
        <a @click="downloadPDF(ProfundidadPDF, '1_3_Profundidad_rio')"
          ><b-icon
            icon="book-information-variant"
            class="header-section__help-item"
            type="is-primary"
          ></b-icon
        ></a>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Para medir la profundidad del río, utilizaremos un palo de colores. Cada color representa un tramo de profundidad. Meteremos el palo en el río y observaremos hasta qué color se moja el palo."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpDepth1" alt="helpDepth1" />
        <b-tag class="guide-step__text" type="is-info"
          >ESTO ES UNA PALO DE COLORES
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpDepth2" alt="helpDepth2" />
        <b-tag class="guide-step__text" type="is-info"
          >METEMOS EL PALO EN EL RÍO
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpDepth3" alt="helpDepth3" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS EL COLOR DEL PALO</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="titleDepth" class="img-header__pic" alt="titleDepth" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-section">
        <div
          v-for="option in appStore.formPictsSections.depth.data
            .depthRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <span class="img-option-text">{{ option.color.toUpperCase() }}</span>
          <b-checkbox-button
            class="img-option"
            :native-value="option"
            @click="updateSelectedOption(option)"
            ><img
              :class="
                isSelected(option)
                  ? 'img-option__active'
                  : 'img-option__inactive'
              "
              :src="getOptionImg(option.id)"
              :alt="option.id + 'img'" />

            <div
              :class="[
                'overlay',
                isSelected(option) ? 'overlay__active' : 'overlay__inactive',
              ]"
            ></div
          ></b-checkbox-button>
        </div>
      </div>
    </b-field>
  </div>
</template>

<style lang="scss" scoped>
.img-option {
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  img {
    height: 100%;
    max-width: 220px;
    width: 100%;
  }
}

.img-container {
  max-width: 220px;
}

.img-header {
  &__pic {
    max-width: 220px;
  }
}
</style>
