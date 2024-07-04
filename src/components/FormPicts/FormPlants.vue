<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import titlePlants from "@/assets/images/picts/plants/titlePlants.jpg";
import helpPlants1 from "@/assets/images/picts/plants/helpPlants1.jpg";
import nettlePlants from "@/assets/images/picts/plants/nettlePlants.jpg";
import hazelPlants from "@/assets/images/picts/plants/hazelPlants.jpg";
import ashTreePlants from "@/assets/images/picts/plants/ashTreePlants.jpg";
import oakPlants from "@/assets/images/picts/plants/oakPlants.jpg";
import pampasGrassPlants from "@/assets/images/picts/plants/pampasGrassPlants.jpg";
import saintJosephPlants from "@/assets/images/picts/plants/saintJosephPlants.jpg";
import bambuPlants from "@/assets/images/picts/plants/bambuPlants.jpg";
import absenceImg from "@/assets/images/picts/plants/absence.jpg";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterPlants: null,
});

// COMPUTED
const isSectionValid = computed(() => {
  return true; //optional section
});
const absence = computed({
  get: () => appStore.goodPlantsAbsence,
  set: (value) => appStore.setGoodPlantsAbsence(value),
});

// LYFECYCLE
onMounted(() => {
  init();
});
onBeforeUpdate(() => {
  if (appStore.pictsFormSent) return;
  appStore.updateSpecificPictsSectionValues({
    name: "plants",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// WATCHERS
watch(
  () => values.value,
  () => {
    if (absence.value && checkGoodPlants()) absence.value = false;
  },
  { deep: true },
);
watch(absence, (newValue) => {
  if (newValue) {
    removeGoodPlants();
  }
});

// METHODS

const init = () => {
  values.value.waterPlants = []; //default value and make beforeUpdate hook jump
  appStore.setGoodPlantsAbsence(false);
};
const checkGoodPlants = () => {
  return values.value.waterPlants.filter((plant) => plant.isGood).length > 0
    ? true
    : false;
};
const isSelected = (object) => {
  return values.value.waterPlants
    ? values.value.waterPlants.findIndex((obj) => obj.id == object.id) == -1
      ? false
      : true
    : "";
};
const removeGoodPlants = () => {
  values.value.waterPlants = values.value.waterPlants.filter(
    (plant) => !plant.isGood,
  );
};
const getOptionImg = (id) => {
  switch (id) {
    case 1:
      return nettlePlants;
    case 2:
      return hazelPlants;
    case 3:
      return ashTreePlants;
    case 4:
      return oakPlants;
    case 5:
      return pampasGrassPlants;
    case 6:
      return saintJosephPlants;
    case 7:
      return bambuPlants;
    default:
      return "";
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
      message="
        Giraremos sobre nosotros mismos 180º para observar si encontramos en los alrededores del río las plantas que os mostramos a continuación. Pueden ser plantas autóctonas y que se consideran buenas (p.e. ortigas, avellanos, fresnos y robles) o plantas exóticas invasoras que se consideran malas (p.e. plumero, vara de San José y bambú japonés)."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpPlants1" alt="helpPlants1" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS A NUESTRO ALREDEDOR</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="titlePlants" alt="titlePlants" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field>
      <div class="img-section">
        <div class="img-container">
          <span class="img-option-text">NO HAY PLANTAS BUENAS</span>
          <b-checkbox-button
            v-model="absence"
            class="img-option"
            :native-value="false"
            ><img
              :class="absence ? 'img-option__active' : 'img-option__inactive'"
              :src="absenceImg"
              alt="absenceImg" />
            <div
              :class="[
                'overlay',
                absence ? 'overlay__active' : 'overlay__inactive',
              ]"
            ></div
          ></b-checkbox-button>
        </div>
        <div
          v-for="option in appStore.formPictsSections.plants.data
            .plantsRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <span class="img-option-text">{{ option.name.toUpperCase() }}</span>
          <b-checkbox-button
            v-model="values.waterPlants"
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
    max-width: 220px;
    max-height: 188px;
    width: 100%;
  }
}

.img-container {
  max-width: 220px;
}

.img-header {
  &__pic {
    max-width: 200px;
  }
}
</style>
