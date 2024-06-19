<script setup>
import { ref, computed, onMounted, onBeforeUpdate } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import titleEnv from "@/assets/images/picts/env/titleEnv.jpg";
import helpEnv1 from "@/assets/images/picts/env/helpEnv1.gif";
import forestEnv from "@/assets/images/picts/env/forestEnv.jpg";
import plantsEnv from "@/assets/images/picts/env/plantsEnv.jpg";
import roadsEnv from "@/assets/images/picts/env/roadsEnv.jpg";
import animalsEnv from "@/assets/images/picts/env/animalsEnv.jpg";
import houseEnv from "@/assets/images/picts/env/houseEnv.jpg";
import factoryEnv from "@/assets/images/picts/env/factoryEnv.jpg";
import parkingEnv from "@/assets/images/picts/env/parkingEnv.jpg";
import orchardEnv from "@/assets/images/picts/env/orchardEnv.jpg";
import treatmentEnv from "@/assets/images/picts/env/treatmentEnv.jpg";
import trainEnv from "@/assets/images/picts/env/trainEnv.jpg";
import recreationEnv from "@/assets/images/picts/env/recreationEnv.jpg";
import campingEnv from "@/assets/images/picts/env/campingEnv.jpg";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterEnv: null,
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
  appStore.updateSpecificPictsSectionValues({
    name: "env",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// METHODS
const init = () => {
  values.value.waterEnv = []; //default value and make beforeUpdate hook jump
};
const isSelected = (object) => {
  return values.value.waterEnv
    ? values.value.waterEnv.findIndex((obj) => obj.id == object.id) == -1
      ? false
      : true
    : "";
};
const getOptionImg = (id) => {
  switch (id) {
    case 1:
      return forestEnv;
    case 2:
      return plantsEnv;
    case 3:
      return roadsEnv;
    case 4:
      return animalsEnv;
    case 5:
      return houseEnv;
    case 6:
      return factoryEnv;
    case 7:
      return parkingEnv;
    case 8:
      return orchardEnv;
    case 9:
      return treatmentEnv;
    case 10:
      return trainEnv;
    case 11:
      return recreationEnv;
    case 12:
      return campingEnv;
  }
};
</script>

<template>
  <div class="form-section-picts form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>GÍRATE Y MIRA</span>
      </h5>
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Giraremos sobre nosotros mismos 180º para observar qué elementos encontramos en los alrededores del río."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpEnv1" alt="helpEnv1" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS A NUESTRO ALREDEDOR</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="titleEnv" alt="titleEnv" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-section">
        <div
          v-for="option in appStore.formPictsSections.env.data.envRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <b-checkbox-button
            v-model="values.waterEnv"
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
    max-width: 120px;
    width: 100%;
  }
}

.img-container {
  max-width: 120px;
}

.img-header {
  &__pic {
    max-width: 200px;
  }
}
</style>
