<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>GÍRATE Y MIRA</span>
      </h5>
      <div class="header-section__help">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      message="Giraremos sobre nosotros mismos 180º para observar qué elementos encontramos en los alrededores del río."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="$_getImgUrl(formEnv.id, 0, 1)" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS A NUESTRO ALREDEDOR</b-tag
        >
      </div>
    </div>
    <div class="imgHeader">
      <img :src="$_getImgUrl(formEnv.id, 0, 0)" class="imgHeader__pic" />
      <b-field
        label="5. ¿Qué hay a tu alrededor?"
        class="imgHeader__text"
      ></b-field>
      <b-icon
        class="imgHeader__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="imgSection">
      <div
        class="imgContainer"
        :key="option.id"
        v-for="option in formEnv.data.envRiverOptions"
      >
        <b-checkbox-button
          class="imgOption"
          :native-value="option"
          v-model="values.waterEnv"
          ><img
            :class="
              isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
            "
            :src="$_getImgUrl(formEnv.id, option.id, 1)"/>
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
import { mapState, mapActions } from "vuex";
import { pictsHelperMixin } from "@/mixins/picts-helper.js";
export default {
  data() {
    return {
      values: {
        waterEnv: null
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formEnv: state => state.formPictsSections.env
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/env");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "env",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterEnv = []; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterEnv
        ? this.values.waterEnv.findIndex(obj => obj.id == object.id) == -1
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
  img {
    height: 100%;
    max-width: 120px;
    width: 100%;
  }
}
.imgContainer {
  max-width: 120px;
}
.imgHeader {
  &__pic {
    max-width: 120px;
  }
}
</style>
