<script setup>
import { ref, computed, onMounted, onBeforeUpdate, watch } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import titleSmell from "@/assets/images/picts/smell/titleSmell.jpg";
import helpSmell1 from "@/assets/images/picts/smell/helpSmell1.jpg";
import helpSmell2 from "@/assets/images/picts/smell/helpSmell2.jpg";
import helpSmell3 from "@/assets/images/picts/smell/helpSmell3.jpg";
import riverSmell from "@/assets/images/picts/smell/riverSmell.jpg";
import garbageSmell from "@/assets/images/picts/smell/garbageSmell.jpg";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterSmell: null,
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
  const valuesFormated = {
    waterSmell: values.value.waterSmell.length
      ? values.value.waterSmell[0]
      : null,
  };
  appStore.updateSpecificPictsSectionValues({
    name: "smell",
    values: valuesFormated,
    isValid: isSectionValid.value,
  });
});

// METHODS
const init = () => {
  values.value.waterSmell = []; //default value and make beforeUpdate hook jump
};
const isSelected = (object) => {
  return (
    values.value.waterSmell?.length &&
    values.value.waterSmell[0].id === object.id
  );
};
const getOptionImg = (id) => {
  switch (id) {
    case 1:
      return riverSmell;
    case 2:
      return garbageSmell;
  }
};

// WATCHERS
watch(
  () => values.value,
  (newValue) => {
    if (newValue.waterSmell.length > 1) {
      values.value.waterSmell.shift();
    }
  },
);
</script>

<template>
  <div class="form-section-picts form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>OLEMOS EL RÍO</span>
      </h5>
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Para conocer el olor del río, utilizaremos una botella. Cogeremos agua del río y oleremos el contenido de la botella para conocer el olor que tiene el agua."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpSmell1" alt="helpSmell1" />
        <b-tag class="guide-step__text" type="is-info"
          >ESTO ES UNA BOTELLA
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpSmell2" alt="helpSmell2" />
        <b-tag class="guide-step__text" type="is-info"
          >COGEMOS AGUA DEL RÍO</b-tag
        >
      </div>
      <div class="guide-step">
        <img :src="helpSmell3" alt="helpSmell3" />
        <b-tag class="guide-step__text" type="is-info">OLEMOS EL AGUA</b-tag>
      </div>
    </div>
    <div class="img-header">
      <img :src="titleSmell" alt="titleSmell" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-section">
        <div
          v-for="option in appStore.formPictsSections.smell.data
            .smellRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <b-checkbox-button
            class="img-option"
            :native-value="option"
            @click="values.waterSmell = [option]"
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
    max-width: 130px;
    width: 100%;
  }
}

.img-container {
  max-width: 130px;
}

.img-header {
  &__pic {
    max-width: 200px;
  }
}
</style>
