<script setup>
import { ref, computed, watch, onMounted, onBeforeUpdate } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import titleAnimals from "@/assets/images/picts/animals/titleAnimals.jpg";
import absenceImg from "@/assets/images/picts/animals/absence.jpg";
import helpAnimals1 from "@/assets/images/picts/animals/helpAnimals1.jpg";
import helpAnimals2 from "@/assets/images/picts/animals/helpAnimals2.jpg";
import helpAnimals3 from "@/assets/images/picts/animals/helpAnimals3.jpg";
import helpAnimals4 from "@/assets/images/picts/animals/helpAnimals4.jpg";
import caddisflyCoveredAnimals1 from "@/assets/images/picts/animals/caddisflyCoveredAnimals1.jpg";
import caddisflyCoveredAnimals2 from "@/assets/images/picts/animals/caddisflyCoveredAnimals2.jpg";
import mayflyAnimals1 from "@/assets/images/picts/animals/mayflyAnimals1.jpg";
import mayflyAnimals2 from "@/assets/images/picts/animals/mayflyAnimals2.jpg";
import caddisflyUncoveredAnimals1 from "@/assets/images/picts/animals/caddisflyUncoveredAnimals1.jpg";
import caddisflyUncoveredAnimals2 from "@/assets/images/picts/animals/caddisflyUncoveredAnimals2.jpg";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const values = ref({
  waterAnimals: null,
});

// COMPUTED
const absence = computed({
  get() {
    return appStore.goodAnimalsAbsence;
  },
  set(value) {
    appStore.setGoodAnimalsAbsence(value);
  },
});
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
    name: "animals",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// METHODS

const init = () => {
  values.value.waterAnimals = []; //default value and make beforeUpdate hook jump
  appStore.setGoodAnimalsAbsence(false);
};
const isSelected = (object) => {
  return values.value.waterAnimals
    ? values.value.waterAnimals.findIndex((obj) => obj.id == object.id) == -1
      ? false
      : true
    : "";
};
const getImgUrl = (id, index) => {
  switch (id) {
    case 1:
      return index == 1 ? caddisflyCoveredAnimals1 : caddisflyCoveredAnimals2;
    case 2:
      return index == 1 ? mayflyAnimals1 : mayflyAnimals2;
    case 3:
      return index == 1
        ? caddisflyUncoveredAnimals1
        : caddisflyUncoveredAnimals2;
  }
};

// WATCHERS
watch(
  () => absence.value,
  (newValue) => {
    if (newValue) {
      values.value.waterAnimals = [];
    }
  },
);
watch(
  () => values.value,
  () => {
    if (absence.value && values.value.waterAnimals.length > 0)
      absence.value = false;
  },
  { deep: true },
);
</script>

<template>
  <div class="form-section-picts form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>BUSCO ANIMALES EN EL RÍO</span>
      </h5>
      <div class="header-section__help" @click="toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="
        Para conocer los invertebrados que existen en el río, usaremos una red. Frotaremos las piedras y pondremos la red por debajo. A continuación, volcaremos la red en una bandeja blanca, y pondremos los invertebrados en un bote lupa para poder observarlos e identificarlos. 
"
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="helpAnimals1" alt="img" />
        <b-tag class="guide-step__text" type="is-info">COGEMOS UNA RED</b-tag>
      </div>
      <div class="guide-step">
        <img :src="helpAnimals2" alt="img" />
        <b-tag class="guide-step__text" type="is-info"
          >PONEMOS LA RED EN EL RÍO Y FROTAMOS LAS PIEDRAS</b-tag
        >
      </div>
      <div class="guide-step">
        <img :src="helpAnimals3" alt="img" />
        <b-tag type="is-info" class="guide-step__text"
          >VACIAMOS LA RED EN LA BANDEJA</b-tag
        >
      </div>
      <div class="guide-step">
        <img :src="helpAnimals4" alt="img" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS LOS ANIMALES CON EL BOTE-LUPA</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="titleAnimals" class="img-header__pic" alt="img" />
      <b-icon
        class="icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field>
      <div class="img-section">
        <div class="img-container">
          <span class="img-option-text">NO HAY ANIMALES BUENOS</span>
          <b-checkbox-button
            v-model="absence"
            class="img-option-center img-option"
            :native-value="false"
          >
            <img
              :class="absence ? 'img-option__active' : 'img-option__inactive'"
              :src="absenceImg"
              alt="img"
            />
            <div
              :class="[
                'overlay',
                absence ? 'overlay__active' : 'overlay__inactive',
              ]"
            ></div>
          </b-checkbox-button>
        </div>
        <div
          v-for="option in appStore.formPictsSections.animals.data
            .animalsRiverOptions"
          :key="option.id"
          class="img-container"
        >
          <span class="img-option-text">{{ option.name.toUpperCase() }}</span>
          <b-checkbox-button
            v-model="values.waterAnimals"
            class="img-option"
            :native-value="option"
          >
            <img
              :class="
                isSelected(option)
                  ? 'img-option__active-left'
                  : 'img-option__inactive'
              "
              :src="getImgUrl(option.id, 1)"
              alt="img"
            /><img
              :class="
                isSelected(option)
                  ? 'img-option__active-right'
                  : 'img-option__inactive'
              "
              :src="getImgUrl(option.id, 2)"
              alt="img"
            />
            <div
              :class="[
                'overlay',
                isSelected(option) ? 'overlay__active' : 'overlay__inactive',
              ]"
            ></div>
          </b-checkbox-button>
        </div>
      </div>
    </b-field>
  </div>
</template>

<style lang="scss" scoped>
.img-option {
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 300px;

  img {
    height: 100%;
    width: 50%;
  }
}

.img-option-center {
  max-width: 100px;

  img {
    max-height: 80px;
    width: 100%;
  }
}

.img-header {
  &__pic {
    max-width: 140px;
  }
}

.img-container {
  align-items: center;
  max-width: 300px;
}
</style>
