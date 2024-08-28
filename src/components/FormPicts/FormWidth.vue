<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import { downloadPDF } from "@/utils/download-pdf";
import helpWidth1 from "@/assets/images/picts/width/helpWidth1.jpg";
import helpWidth2 from "@/assets/images/picts/width/helpWidth2.jpg";
import helpWidth3 from "@/assets/images/picts/width/helpWidth3.jpg";
import titleWidth from "@/assets/images/picts/width/titleWidth.jpg";
import yellowWidth from "@/assets/images/picts/width/yellowWidth.jpg";
import blueWidth from "@/assets/images/picts/width/blueWidth.jpg";
import greenWidth from "@/assets/images/picts/width/greenWidth.jpg";
import redWidth from "@/assets/images/picts/width/redWidth.jpg";
import turquoiseWidth from "@/assets/images/picts/width/turquoiseWidth.jpg";
import DistanciaPDF from "@/assets/pdfs/1_2_Distancia_rio.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterWidth: null,
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
    waterWidth: values.value.waterWidth.length
      ? values.value.waterWidth[0]
      : null,
  };
  appStore.updateSpecificPictsSectionValues({
    name: "width",
    values: valuesFormated,
    isValid: isSectionValid.value,
  });
});

// METHODS
const init = () => {
  values.value.waterWidth = []; //default value and make beforeUpdate hook jump
};
const isSelected = (object) => {
  return values.value.waterWidth
    ? values.value.waterWidth.findIndex((obj) => obj == object) == -1
      ? false
      : true
    : "";
};
const getOptionImg = (id) => {
  switch (id) {
    case 1:
      return yellowWidth;
    case 2:
      return blueWidth;
    case 3:
      return greenWidth;
    case 4:
      return redWidth;
    case 5:
      return turquoiseWidth;
    default:
      return "";
  }
};

// WATCHERS
watch(
  () => values.value,
  (newValue) => {
    if (newValue.waterWidth.length > 1) {
      values.value.waterWidth.shift();
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="form-section form-section-picts">
    <h5 class="title is-5 header-section__text">
      <span>Estudio del río</span>
    </h5>
    <div class="header-section">
      <b-field label="1.2 Distancia del río:" />
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
        <a @click="downloadPDF(DistanciaPDF, '1_2_Distancia_rio')"
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
      message="Para medir la distancia del río, utilizaremos una cuerda de colores. Cada color representa un tramo de distancia. Es necesario la participación de 2 personas. Nos situaremos cada una a un lado de la cuerda. Finalmente, miraremos qué distancia completa el color."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpWidth1" alt="helpWidth1" />
        <b-tag class="guide-step__text" type="is-info"
          >ESTO ES UNA CUERDA DE COLORES
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpWidth2" alt="helpWidth2" />
        <b-tag class="guide-step__text" type="is-info"
          >MEDIMOS LA DISTANCIA DEL RÍO
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpWidth3" alt="helpWidth3" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS EL COLOR DE LA CUERDA
        </b-tag>
      </div>
    </div>
    <div class="img-header">
      <img :src="titleWidth" alt="titleWidth" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-section">
        <div
          v-for="option in appStore.formPictsSections.width.data
            .widthRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <span class="img-option-text">{{ option.color.toUpperCase() }}</span>
          <b-checkbox-button
            v-model="values.waterWidth"
            class="img-option"
            :native-value="option"
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
    max-width: 300px;
    width: 100%;
  }
}

.img-container {
  max-width: 300px;
}

.img-header {
  &__pic {
    max-width: 200px;
  }
}
</style>
