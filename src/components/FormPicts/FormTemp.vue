<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import titleTemp from "@/assets/images/picts/temp/titleTemp.jpg";
import helpTemp1 from "@/assets/images/picts/temp/helpTemp1.jpg";
import helpTemp2 from "@/assets/images/picts/temp/helpTemp2.jpg";
import helpTemp3 from "@/assets/images/picts/temp/helpTemp3.jpg";
import greenTemp from "@/assets/images/picts/temp/greenTemp.jpg";
import redTemp from "@/assets/images/picts/temp/redTemp.jpg";
import blueTemp from "@/assets/images/picts/temp/blueTemp.jpg";
import yellowTemp from "@/assets/images/picts/temp/yellowTemp.jpg";
import blackTemp from "@/assets/images/picts/temp/blackTemp.jpg";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterTemp: null,
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
    waterTemp: values.value.waterTemp.length ? values.value.waterTemp[0] : null,
  };
  appStore.updateSpecificPictsSectionValues({
    name: "temp",
    values: valuesFormated,
    isValid: isSectionValid.value,
  });
});

// METHODS
const init = () => {
  values.value.waterTemp = []; //default value and make beforeUpdate hook jump
};
const isSelected = (object) => {
  return (
    values.value.waterTemp?.length && values.value.waterTemp[0].id === object.id
  );
};
const getOptionImg = (optionId) => {
  switch (optionId) {
    case 1:
      return greenTemp;
    case 2:
      return redTemp;
    case 3:
      return blueTemp;
    case 4:
      return yellowTemp;
    case 5:
      return blackTemp;
  }
};

// WATCHERS
watch(
  values.value,
  (newValue) => {
    if (newValue.waterTemp.length > 1) {
      values.value.waterTemp.shift();
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="form-section-picts form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>MEDIMOS LA TEMPERATURA DEL RÍO </span>
      </h5>
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Para conocer la temperatura del río, utilizaremos un termómetro. Introduciremos el termómetro en el agua del río y esperaremos un minuto para conocer el resultado. Finalmente, miraremos qué color alcanza."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpTemp1" alt="helpTemp1" />
        <b-tag class="guide-step__text" type="is-info"
          >METEMOS EL TERMÓMETRO EN EL RÍO
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpTemp2" alt="helpTemp2" />
        <b-tag class="guide-step__text" type="is-info"
          >ESPERAMOS UN MINUTO
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpTemp3" alt="helpTemp3" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS QUÉ COLOR TENEMOS</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="titleTemp" alt="titleTemp" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-section">
        <div
          v-for="option in appStore.formPictsSections.temp.data
            .tempRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <span class="img-option-text">{{ option.color.toUpperCase() }}</span>
          <b-checkbox-button
            v-model="values.waterTemp"
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
    max-width: 100px;
    width: 100%;
  }
}

.img-container {
  max-width: 100px;
}

.img-header {
  &__pic {
    max-width: 200px;
  }
}
</style>
