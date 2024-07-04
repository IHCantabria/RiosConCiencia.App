<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import titleColor from "@/assets/images/picts/color/titleColor.jpg";
import helpColor1 from "@/assets/images/picts/color/helpColor1.jpg";
import helpColor2 from "@/assets/images/picts/color/helpColor2.jpg";
import helpColor3 from "@/assets/images/picts/color/helpColor3.jpg";
import riverColor from "@/assets/images/picts/color/riverColor.jpg";
import brownColor from "@/assets/images/picts/color/brownColor.jpg";
import greenColor from "@/assets/images/picts/color/greenColor.jpg";
import greyColor from "@/assets/images/picts/color/greyColor.jpg";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterColor: null,
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
    waterColor: values.value.waterColor.length
      ? values.value.waterColor[0]
      : null,
  };
  appStore.updateSpecificPictsSectionValues({
    name: "color",
    values: valuesFormated,
    isValid: isSectionValid.value,
  });
});

// METHODS
const init = () => {
  values.value.waterColor = []; //default value and make beforeUpdate hook jump
};
const isSelected = (object) => {
  return (
    values.value.waterColor?.length &&
    values.value.waterColor[0].id === object.id
  );
};
const getOptionImg = (id) => {
  switch (id) {
    case 2:
      return brownColor;
    case 3:
      return greenColor;
    case 4:
      return greyColor;
    case 5:
      return riverColor;
    default:
      return "";
  }
};
const updateSelectedOption = (option) => {
  values.value.waterColor = [option];
};

// WATCHERS
watch(
  () => values.value,
  (newValue) => {
    if (newValue.waterColor.length > 1) {
      values.value.waterColor.shift();
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
      <b-field label="1.6 Color del río:" />
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Para conocer el color del río, utilizaremos una botella. Cogeremos agua del río y miraremos a través de la botella qué color tiene el agua."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpColor1" alt="helpColor1" />
        <b-tag class="guide-step__text" type="is-info"
          >ESTO ES UNA BOTELLA
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpColor2" alt="helpColor2" />
        <b-tag class="guide-step__text" type="is-info"
          >COGEMOS AGUA DEL RÍO
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpColor3" alt="helpColor3" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS QUÉ COLOR TIENE</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="titleColor" alt="titleColor" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-section">
        <div
          v-for="option in appStore.formPictsSections.color.data
            .colorRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <span class="img-option-text">{{ option.name.toUpperCase() }}</span>
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
    max-width: 200px;
  }
}
</style>
