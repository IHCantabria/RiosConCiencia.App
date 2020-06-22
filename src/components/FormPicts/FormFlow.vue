<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>MIRAMOS AL RÍO</span>
      </h5>
      <div class="header-section__help" @click="$_toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Observamos si el agua del río se mueve o si por el contrario, está estancada."
    >
    </b-field>
    <div class="img-header">
      <img :src="$_getImgUrl(1, 0, 0)" class="img-header__pic" />
      <b-icon
        class="img-header__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="img-section">
      <div class="img-container">
        <span class="img-option-text">NO SE MUEVE</span>
        <b-radio-button
          class="img-option"
          v-model="values.waterFlow"
          :native-value="false"
        >
          <img
            :class="
              values.waterFlow == false
                ? 'img-option__active'
                : 'img-option__inactive'
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
      <div class="img-container">
        <span class="img-option-text">SI SE MUEVE</span>
        <b-radio-button
          class="
          img-option"
          v-model="values.waterFlow"
          :native-value="true"
        >
          <img
            :class="
              values.waterFlow == true
                ? 'img-option__active'
                : 'img-option__inactive'
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
import requireContext from "require-context.macro";
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
    this._loadAssests();
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
    },
    _loadAssests() {
      this.imgFolder = requireContext("@/assets/images/picts/flow", true);
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
    max-width: 300px;
    width: 100%;
  }
}
.img-container {
  max-width: 300px;
}
.img-header {
  &__pic {
    max-width: 200px;
  }
}
</style>
