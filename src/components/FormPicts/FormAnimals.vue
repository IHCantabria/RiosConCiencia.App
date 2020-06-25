<template>
  <div class="form-section-picts form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>BUSCO ANIMALES EN EL RÍO</span>
      </h5>
      <div class="header-section__help" @click="$_toggleHelp()">
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
        <img :src="$_getImgUrl(formAnimals.id, 0, 1)" />
        <b-tag class="guide-step__text" type="is-info">COGEMOS UNA RED</b-tag>
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formAnimals.id, 0, 2)" />
        <b-tag class="guide-step__text" type="is-info"
          >PONEMOS LA RED EN EL RÍO Y FROTAMOS LAS PIEDRAS</b-tag
        >
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formAnimals.id, 0, 3)" />
        <b-tag type="is-info" class="guide-step__text"
          >VACIAMOS LA RED EN LA BANDEJA</b-tag
        >
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formAnimals.id, 0, 4)" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS LOS ANIMALES CON EL BOTE-LUPA</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="$_getImgUrl(formAnimals.id, 0, 0)" class="img-header__pic" />
      <b-icon
        class="icon "
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-container">
        <span class="img-option-text">NO HAY ANIMALES BUENOS</span>
        <b-checkbox-button
          class="img-option-center img-option"
          :native-value="false"
          v-model="absence"
        >
          <img
            :class="absence ? 'img-option__active' : 'img-option__inactive'"
            :src="$_getImgUrl(formAnimals.id, 4, 1)"
          />
          <div
            :class="[
              'overlay',
              absence ? 'overlay__active' : 'overlay__inactive'
            ]"
          ></div>
        </b-checkbox-button>
      </div>
      <div
        class="img-container"
        :key="option.id"
        v-for="option in formAnimals.data.animalsRiverOptions"
      >
        <span class="img-option-text">{{ option.name | upperCase }}</span>
        <b-checkbox-button
          class="img-option"
          :native-value="option"
          v-model="values.waterAnimals"
        >
          <img
            :class="
              isSelected(option)
                ? 'img-option__active-left'
                : 'img-option__inactive'
            "
            :src="$_getImgUrl(formAnimals.id, option.id, 1)"
          /><img
            :class="
              isSelected(option)
                ? 'img-option__active-right'
                : 'img-option__inactive'
            "
            :src="$_getImgUrl(formAnimals.id, option.id, 2)"
          />
          <div
            :class="[
              'overlay',
              isSelected(option) ? 'overlay__active' : 'overlay__inactive'
            ]"
          ></div>
        </b-checkbox-button>
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
        waterAnimals: null
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formAnimals: state => state.formPictsSections.animals,
      goodAnimalsAbsence: state => state.goodAnimalsAbsence
    }),
    absence: {
      get() {
        return this.goodAnimalsAbsence;
      },
      set(value) {
        this.setGoodAnimalsAbsence(value);
      }
    },
    isSectionValid() {
      return true; //optional section
    }
  },
  watch: {
    absence(newValue) {
      if (newValue) {
        this.values.waterAnimals = [];
      }
    },
    values: {
      deep: true,
      handler() {
        if (this.absence && this.values.waterAnimals.length > 0)
          this.absence = false;
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
      name: "animals",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues",
      setGoodAnimalsAbsence: "setGoodAnimalsAbsence"
    }),
    init() {
      this.values.waterAnimals = []; //default value and make beforeUpdate hook jump
    },
    _loadAssests() {
      this.imgFolder = requireContext("@/assets/images/picts/animals", true);
    },
    isSelected(object) {
      return this.values.waterAnimals
        ? this.values.waterAnimals.findIndex(obj => obj.id == object.id) == -1
          ? false
          : true
        : "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
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
