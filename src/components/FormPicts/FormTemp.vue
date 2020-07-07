<template>
  <div class="form-section-picts form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>MEDIMOS LA TEMPERATURA DEL RÍO </span>
      </h5>
      <div class="header-section__help" @click="$_toggleHelp()">
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
        <img :src="$_getImgUrl(formTemp.id, 0, 1)" />
        <b-tag class="guide-step__text" type="is-info"
          >METEMOS EL TERMÓMETRO EN EL RÍO
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formTemp.id, 0, 2)" />
        <b-tag class="guide-step__text" type="is-info"
          >ESPERAMOS UN MINUTO
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formTemp.id, 0, 3)" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS QUÉ COLOR TENEMOS</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="$_getImgUrl(formTemp.id, 0, 0)" class="img-header__pic" />
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
        v-for="option in formTemp.data.tempRiverOptions"
      >
        <span class="img-option-text">{{ option.color | upperCase }}</span>
        <b-checkbox-button
          class="img-option"
          :native-value="option"
          v-model="values.waterTemp"
          ><img
            :class="
              isSelected(option) ? 'img-option__active' : 'img-option__inactive'
            "
            :src="$_getImgUrl(formTemp.id, option.id, 1)"/>
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
        waterTemp: null
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formTemp: state => state.formPictsSections.temp
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  watch: {
    values: {
      deep: true,
      handler(newValue) {
        if (newValue.waterTemp.length > 1) {
          this.values.waterTemp.shift();
        }
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
    const valuesFormated = {
      waterTemp: this.values.waterTemp.length ? this.values.waterTemp[0] : null
    };
    this.updateSpecificPictsSectionValues({
      name: "temp",
      values: valuesFormated,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterTemp = []; //default value and make beforeUpdate hook jump
    },
    _loadAssests() {
      this.imgFolder = requireContext("@/assets/images/picts/temp", true);
    },
    isSelected(object) {
      return this.values.waterTemp
        ? this.values.waterTemp.findIndex(obj => obj == object) == -1
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
