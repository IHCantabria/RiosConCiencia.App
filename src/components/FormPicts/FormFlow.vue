<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";

import titleFlowImg from "@/assets/images/picts/flow/titleFlow.jpg";
import riverImg from "@/assets/images/picts/flow/river.jpg";
import riverFlow from "@/assets/images/picts/flow/riverFlow.gif";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  riverSection: null,
  waterFlow: null,
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
    riverSection: appStore.userRiverSectionsPicts[0],
    waterFlow: values.value.waterFlow.length ? values.value.waterFlow[0] : null,
  };
  appStore.updateSpecificPictsSectionValues({
    name: "flow",
    values: valuesFormated,
    isValid: isSectionValid.value,
  });
});

// METHODS

const init = () => {
  values.value.waterFlow = []; //default value and make beforeUpdate hook jump
};
const isSelected = (object) => {
  return values.value.waterFlow
    ? values.value.waterFlow.findIndex((obj) => obj == object) == -1
      ? false
      : true
    : "";
};

// WATCHERS
watch(
  () => values.value,
  (newValue) => {
    if (newValue.waterFlow.length > 1) {
      values.value.waterFlow.shift();
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="form-section-picts form-section">
    <h5 class="title is-5 header-section__text">
      <span>Estudio del río</span>
    </h5>
    <div class="header-section">
      <b-field label="1.1 Movimiento del agua del río:" />
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Observamos si el agua del río se mueve o si por el contrario, está estancada."
    >
    </b-field>
    <div class="img-header">
      <img :src="titleFlowImg" class="img-header__pic" alt="TitleFlow Img" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-container">
        <span class="img-option-text">NO SE MUEVE</span>
        <b-checkbox-button
          v-model="values.waterFlow"
          class="img-option"
          :native-value="false"
        >
          <img
            :class="
              isSelected(false) ? 'img-option__active' : 'img-option__inactive'
            "
            :src="riverImg"
            alt="River Img"
          />
          <div
            :class="[
              'overlay',
              isSelected(false) ? 'overlay__active' : 'overlay__inactive',
            ]"
          ></div>
        </b-checkbox-button>
      </div>
      <div class="img-container">
        <span class="img-option-text">SI SE MUEVE</span>
        <b-checkbox-button
          v-model="values.waterFlow"
          class="img-option"
          :native-value="true"
        >
          <img
            :class="
              isSelected(true) ? 'img-option__active' : 'img-option__inactive'
            "
            :src="riverFlow"
            alt="River Flow"
          />
          <div
            :class="[
              'overlay',
              isSelected(true) ? 'overlay__active' : 'overlay__inactive',
            ]"
          ></div>
        </b-checkbox-button>
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
