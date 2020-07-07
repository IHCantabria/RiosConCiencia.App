<template>
  <div class="form-section-picts form-section">
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
        <b-checkbox-button
          class="img-option"
          v-model="values.waterFlow"
          :native-value="false"
        >
          <img
            :class="
              isSelected(false) ? 'img-option__active' : 'img-option__inactive'
            "
            :src="$_getImgUrl(1, 1, 1)"
          />
          <div
            :class="[
              'overlay',
              isSelected(false) ? 'overlay__active' : 'overlay__inactive'
            ]"
          ></div>
        </b-checkbox-button>
      </div>
      <div class="img-container">
        <span class="img-option-text">SI SE MUEVE</span>
        <b-checkbox-button
          class="
          img-option"
          v-model="values.waterFlow"
          :native-value="true"
        >
          <img
            :class="
              isSelected(true) ? 'img-option__active' : 'img-option__inactive'
            "
            :src="$_getImgUrl(1, 2, 1)"
          />
          <div
            :class="[
              'overlay',
              isSelected(true) ? 'overlay__active' : 'overlay__inactive'
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
        waterFlow: null
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
  watch: {
    values: {
      deep: true,
      handler(newValue) {
        if (newValue.waterFlow.length > 1) {
          this.values.waterFlow.shift();
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
      waterFlow: this.values.waterFlow.length ? this.values.waterFlow[0] : null
    };
    this.updateSpecificPictsSectionValues({
      name: "flow",
      values: valuesFormated,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterFlow = []; //default value and make beforeUpdate hook jump
    },
    _loadAssests() {
      this.imgFolder = requireContext("@/assets/images/picts/flow", true);
    },
    isSelected(object) {
      return this.values.waterFlow
        ? this.values.waterFlow.findIndex(obj => obj == object) == -1
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
