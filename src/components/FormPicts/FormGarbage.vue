<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import titleGarbage from "@/assets/images/picts/garbage/titleGarbage.jpg";
import helpGarbage1 from "@/assets/images/picts/garbage/helpGarbage1.jpg";
import helpGarbage2 from "@/assets/images/picts/garbage/helpGarbage2.jpg";
import helpGarbage3 from "@/assets/images/picts/garbage/helpGarbage3.jpg";
import plasticBagGarbage from "@/assets/images/picts/garbage/plasticBagGarbage.jpg";
import plasticBottleGarbage from "@/assets/images/picts/garbage/plasticBottleGarbage.jpg";
import paperGarbage from "@/assets/images/picts/garbage/paperGarbage.jpg";
import canGarbage from "@/assets/images/picts/garbage/canGarbage.jpg";
import glassBottleGarbage from "@/assets/images/picts/garbage/glassBottleGarbage.jpg";
import clothesGarbage from "@/assets/images/picts/garbage/clothesGarbage.jpg";
import cigaretteGarbage from "@/assets/images/picts/garbage/cigaretteGarbage.jpg";
import brickGarbage from "@/assets/images/picts/garbage/brickGarbage.jpg";
import absenceImg from "@/assets/images/picts/garbage/absence.jpg";
import otherGarbage from "@/assets/images/picts/garbage/otherGarbage.jpg";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterGarbage: null,
});

// COMPUTED
const isSectionValid = computed(() => {
  return true; //optional section
});
const absence = computed({
  get: () => appStore.garbageAbsence,
  set: (value) => appStore.setGarbageAbsence(value),
});

// LYFECYCLE
onMounted(() => {
  init();
});
onBeforeUpdate(() => {
  if (appStore.pictsFormSent) return;
  appStore.updateSpecificPictsSectionValues({
    name: "garbage",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// METHODS
const init = () => {
  values.value.waterGarbage = []; //default value and make beforeUpdate hook jump
  appStore.setGarbageAbsence(false);
};
const isSelected = (object) => {
  return (
    values.value.waterGarbage?.findIndex((obj) => obj.id == object.id) != -1
  );
};
const getOptionImg = (id) => {
  switch (id) {
    case 1:
      return plasticBagGarbage;
    case 2:
      return plasticBottleGarbage;
    case 3:
      return paperGarbage;
    case 4:
      return canGarbage;
    case 5:
      return glassBottleGarbage;
    case 6:
      return clothesGarbage;
    case 7:
      return cigaretteGarbage;
    case 8:
      return brickGarbage;
    case 9:
      return otherGarbage;
  }
};

// WATCHERS
watch(
  () => values.value,
  () => {
    if (absence.value && values.value.waterGarbage.length > 0) {
      absence.value = false;
    }
  },
  { deep: true },
);
watch(absence, (newValue) => {
  if (newValue) {
    values.value.waterGarbage = [];
  }
});
</script>

<template>
  <div class="form-section-picts form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>RECOGEMOS BASURA</span>
      </h5>
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Cogemos una bolsa de basura, recogeremos la basura que encontremos cerca del río y la meteremos en la bolsa para posteriormente mirar y anotar la basura que nos hemos encontrado."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpGarbage1" alt="helpGarbage1" />
        <b-tag class="guide-step__text" type="is-info">COGEMOS UNA BOLSA</b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpGarbage2" alt="helpGarbage2" />
        <b-tag class="guide-step__text" type="is-info"
          >PONEMOS LA BASURA DENTRO DE LA BOLSA</b-tag
        >
      </div>
      <div class="guide-step">
        <img :src="helpGarbage3" alt="helpGarbage3" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS LA BASURA QUE HEMOS ENCONTRADO</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="titleGarbage" alt="titleGarbage" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field>
      <div class="img-section">
        <div class="img-container">
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
          v-for="option in appStore.formPictsSections.garbage.data
            .garbageRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <b-checkbox-button
            v-model="values.waterGarbage"
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
    max-width: 140px;
    min-width: 124px;
    width: 100%;
  }
}

.img-container {
  max-width: 140px;
}

.img-header {
  &__pic {
    max-width: 160px;
  }
}
</style>
