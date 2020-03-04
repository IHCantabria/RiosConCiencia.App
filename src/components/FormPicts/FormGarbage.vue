<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>RECOGEMOS BASURA</span>
      </h5>
      <div class="header-section__help">
        <b-icon icon="information-outline" type="is-info">> </b-icon>
      </div>
    </div>
    <b-field
      message="Cogemos una bolsa de basura, recogeremos la basura que encontremos cerca del río y la meteremos en la bolsa para posteriormente mirar y anotar la basura que nos hemos encontrado."
    >
    </b-field>
    <div class="block guideSection">
      <div class="guideStep">
        <img :src="$_getImgUrl(formGarbage.id, 0, 1)" />
        <b-tag class="guideStep__text" type="is-info">COGEMOS UNA BOLSA</b-tag>
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formGarbage.id, 0, 2)" />
        <b-tag class="guideStep__text" type="is-info"
          >PONEMOS LA BASURA DENTRO DE LA BOLSA</b-tag
        >
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formGarbage.id, 0, 3)" />
        <b-tag class="guideStep__text" type="is-info"
          >MIRAMOS LA BASURA QUE HEMOS ENCONTRADO</b-tag
        >
      </div>
    </div>
    <div class="imgHeader">
      <img :src="$_getImgUrl(formGarbage.id, 0, 0)" class="imgHeader__pic" />
      <b-field
        label="8. ¿Qué basura hemos encontrado?"
        class="imgHeader__text"
      ></b-field>
    </div>
    <b-field class="imgSection">
      <b-checkbox-button
        class="imgOption"
        v-for="option in formGarbage.data.garbageRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterGarbage"
        ><img
          :class="
            isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formGarbage.id, option.id, 1)"/>
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
        waterGarbage: null
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formGarbage: state => state.formPictsSections.garbage
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/garbage");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "garbage",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterGarbage = []; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterGarbage
        ? this.values.waterGarbage.findIndex(obj => obj.id == object.id) == -1
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
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  max-width: 50%;
  img {
    height: 100%;
    max-width: 120px;
    width: 100%;
  }
}
.imgHeader {
  &__pic {
    max-width: 100px;
  }
}
</style>
