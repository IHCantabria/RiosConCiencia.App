<template>
  <div class="form-section-picts form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>GÍRATE Y MIRA</span>
      </h5>
      <div class="header-section__help" @click="$_toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="
        Giraremos sobre nosotros mismos 180º para observar si encontramos en los alrededores del río las plantas que os mostramos a continuación. "
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="$_getImgUrl(formPlants.id, 0, 1)" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS A NUESTRO ALREDEDOR</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="$_getImgUrl(formPlants.id, 0, 0)" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-container">
        <span class="img-option-text">NO HAY PLANTAS BUENAS</span>
        <b-checkbox-button
          class="img-option"
          :native-value="false"
          v-model="absence"
          ><img
            :class="absence ? 'img-option__active' : 'img-option__inactive'"
            :src="$_getImgUrl(formPlants.id, 8, 1)"/>
          <div
            :class="[
              'overlay',
              absence ? 'overlay__active' : 'overlay__inactive'
            ]"
          ></div
        ></b-checkbox-button>
      </div>
      <div
        class="img-container"
        :key="option.id"
        v-for="option in formPlants.data.plantsRiverOptions"
      >
        <span class="img-option-text">{{ option.name | upperCase }}</span>
        <b-checkbox-button
          class="img-option"
          :native-value="option"
          v-model="values.waterPlants"
          ><img
            :class="
              isSelected(option) ? 'img-option__active' : 'img-option__inactive'
            "
            :src="$_getImgUrl(formPlants.id, option.id, 1)"/>
          <div
            :class="[
              'overlay',
              isSelected(option) ? 'overlay__active' : 'overlay__inactive'
            ]"
          ></div
        ></b-checkbox-button>
      </div>
    </b-field>
  </div>
</template>
<script>
import requireContext from "require-context.macro";
import { mapState, mapActions } from "vuex";
import { pictsHelperMixin } from "@/mixins/picts-helper.js";
export default {
  data() {
    return {
      values: {
        waterPlants: null
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formPlants: state => state.formPictsSections.plants,
      goodPlantsAbsence: state => state.goodPlantsAbsence
    }),
    absence: {
      get() {
        return this.goodPlantsAbsence;
      },
      set(value) {
        this.setGoodPlantsAbsence(value);
      }
    },
    isSectionValid() {
      return true; //optional section
    }
  },
  watch: {
    absence(newValue) {
      if (newValue) {
        this.removeGoodPlants();
      }
    },
    values: {
      deep: true,
      handler() {
        if (this.absence && this.checkGoodPlants()) this.absence = false;
      }
    }
  },
  created() {
    this._loadAssests();
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "plants",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues",
      setGoodPlantsAbsence: "setGoodPlantsAbsence"
    }),
    init() {
      this.values.waterPlants = []; //default value and make beforeUpdate hook jump
      this.setGoodPlantsAbsence(false);
    },
    checkGoodPlants() {
      return this.values.waterPlants.filter(plant => plant.isGood).length > 0
        ? true
        : false;
    },
    _loadAssests() {
      this.imgFolder = requireContext("@/assets/images/picts/plants", true);
    },
    isSelected(object) {
      return this.values.waterPlants
        ? this.values.waterPlants.findIndex(obj => obj.id == object.id) == -1
          ? false
          : true
        : "";
    },
    removeGoodPlants() {
      this.values.waterPlants = this.values.waterPlants.filter(
        plant => !plant.isGood
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
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
