<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>BUSCO ANIMALES EN EL RÍO</span>
      </h5>
      <div class="header-section__help">
        <b-icon icon="information-outline" type="is-info">> </b-icon>
      </div>
    </div>
    <b-field
      message="
        Para conocer los invertebrados que existen en el río, usaremos una red. Frotaremos las piedras y pondremos la red por debajo. A continuación, volcaremos la red en una bandeja blanca, y pondremos los invertebrados en un bote lupa para poder observarlos e identificarlos. 
"
    >
    </b-field>
    <div class="block guideSection">
      <div class="guideStep">
        <img :src="$_getImgUrl(formAnimals.id, 0, 1)" />
        <b-tag class="guideStep__text" type="is-info">COGEMOS UNA RED</b-tag>
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formAnimals.id, 0, 2)" />
        <b-tag class="guideStep__text" type="is-info"
          >PONEMOS LA RED EN EL RÍO Y FROTAMOS LAS PIEDRAS</b-tag
        >
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formAnimals.id, 0, 3)" />
        <b-tag type="is-info" class="guideStep__text"
          >VACIAMOS LA RED EN LA BANDEJA</b-tag
        >
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formAnimals.id, 0, 4)" />
        <b-tag class="guideStep__text" type="is-info"
          >MIRAMOS LOS ANIMALES CON EL BOTE-LUPA</b-tag
        >
      </div>
    </div>
    <div class="imgHeader">
      <img :src="$_getImgUrl(formAnimals.id, 0, 0)" class="imgHeader__pic" />
      <b-field
        label="10. ¿Qué animales has visto con la Lupa?"
        class="imgHeader__text"
      ></b-field>
    </div>
    <b-field class="imgSection">
      <b-checkbox-button
        class="imgOption"
        v-for="option in formAnimals.data.animalsRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterAnimals"
        ><img
          :class="
            isSelected(option)
              ? 'imgOption__active-left'
              : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formAnimals.id, option.id, 1)"/><img
          :class="
            isSelected(option)
              ? 'imgOption__active-right'
              : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formAnimals.id, option.id, 2)"/>
        <div
          :class="[
            'overlay',
            isSelected(option) ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div
      ></b-checkbox-button>
    </b-field>
  </div>
</template>
<script>
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
      formAnimals: state => state.formPictsSections.animals
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/animals");
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
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterAnimals = []; //default value and make beforeUpdate hook jump
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
.imgOption {
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 300px;
  img {
    height: 100%;
    width: 50%;
  }
}
.imgHeader {
  &__pic {
    max-width: 75px;
  }
}
</style>
