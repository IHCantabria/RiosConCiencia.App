<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>MIRAMOS AL RÍO</span>
      </h5>
      <div class="header-section__help">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      message="Observamos si el agua del río se mueve o si por el contrario, está estancada."
    >
    </b-field>
    <div class="imgHeader">
      <img :src="$_getImgUrl(1, 0, 0)" class="imgHeader__pic" />
      <b-field label="1. ¿El río se mueve?" class="imgHeader__text"></b-field>
      <b-icon
        class="imgHeader__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="imgSection">
      <div class="imgContainer">
        <span class="imgTexOption">NO FLUYE</span>
        <b-radio-button
          class="imgOption"
          v-model="values.waterFlow"
          :native-value="false"
        >
          <img
            :class="
              values.waterFlow == false
                ? 'imgOption__active'
                : 'imgOption__inactive'
            "
            :src="$_getImgUrl(1, 1, 1)"
          />
          <div
            :class="[
              'overlay',
              values.waterFlow == false
                ? 'overlay__active'
                : 'overlay__inactive'
            ]"
          ></div>
        </b-radio-button>
      </div>
      <div class="imgContainer">
        <span class="imgTexOption">FLUYE</span>
        <b-radio-button
          class="
          imgOption"
          v-model="values.waterFlow"
          :native-value="true"
        >
          <img
            :class="
              values.waterFlow == true
                ? 'imgOption__active'
                : 'imgOption__inactive'
            "
            :src="$_getImgUrl(1, 2, 1)"
          />
          <div
            :class="[
              'overlay',
              values.waterFlow == true ? 'overlay__active' : 'overlay__inactive'
            ]"
          ></div>
        </b-radio-button>
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
        waterFlow: 0
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formFlow: state => state.formPictsSections.flow
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/flow");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "flow",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterFlow = null; //default value and make beforeUpdate hook jump
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
    max-width: 300px;
    width: 100%;
  }
}
.imgContainer {
  max-width: 300px;
}
.imgHeader {
  &__pic {
    max-width: 120px;
  }
}
</style>
