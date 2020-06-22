<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>RECOGEMOS BASURA</span>
      </h5>
      <div class="header-section__help" @click="$_toggleHelp()">
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
        <img :src="$_getImgUrl(formGarbage.id, 0, 1)" />
        <b-tag class="guide-step__text" type="is-info">COGEMOS UNA BOLSA</b-tag>
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formGarbage.id, 0, 2)" />
        <b-tag class="guide-step__text" type="is-info"
          >PONEMOS LA BASURA DENTRO DE LA BOLSA</b-tag
        >
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formGarbage.id, 0, 3)" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS LA BASURA QUE HEMOS ENCONTRADO</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="$_getImgUrl(formGarbage.id, 0, 0)" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div
        class="img-container"
        :key="option.id"
        v-for="option in formGarbage.data.garbageRiverOptions"
      >
        <b-checkbox-button
          class="img-option"
          :native-value="option"
          v-model="values.waterGarbage"
          ><img
            :class="
              isSelected(option) ? 'img-option__active' : 'img-option__inactive'
            "
            :src="$_getImgUrl(formGarbage.id, option.id, 1)"/>
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
    this._loadAssests();
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
    _loadAssests() {
      this.imgFolder = requireContext("@/assets/images/picts/garbage", true);
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
.img-option {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  img {
    height: 100%;
    max-width: 140px;
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
