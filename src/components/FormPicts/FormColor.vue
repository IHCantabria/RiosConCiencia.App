<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>MIRAMOS EL COLOR DEL RÍO</span>
      </h5>
      <div class="header-section__help" @click="$_toggleHelp()">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      v-show="isHelpActive"
      message="Para conocer el color del río, utilizaremos una botella. Cogeremos agua del río y miraremos a través de la botella qué color tiene el agua."
    >
    </b-field>
    <div class="block guide-section">
      <div class="guide-step">
        <img :src="$_getImgUrl(formColor.id, 0, 1)" />
        <b-tag class="guide-step__text" type="is-info"
          >ESTO ES UNA BOTELLA
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formColor.id, 0, 2)" />
        <b-tag class="guide-step__text" type="is-info"
          >COGEMOS AGUA DEL RÍO
        </b-tag>
      </div>
      <div class="guide-step">
        <img :src="$_getImgUrl(formColor.id, 0, 3)" />
        <b-tag class="guide-step__text" type="is-info"
          >MIRAMOS QUÉ COLOR TIENE</b-tag
        >
      </div>
    </div>
    <div class="img-header">
      <img :src="$_getImgUrl(formColor.id, 0, 0)" class="img-header__pic" />
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
        v-for="option in formColor.data.colorRiverOptions"
      >
        <span class="img-option-text">{{ option.name | upperCase }}</span>
        <b-radio-button
          class="img-option"
          :native-value="option"
          v-model="values.waterColor"
          ><img
            :class="
              isSelected(option) ? 'img-option__active' : 'img-option__inactive'
            "
            :src="$_getImgUrl(formColor.id, option.id, 1)"/>
          <div
            :class="[
              'overlay',
              isSelected(option) ? 'overlay__active' : 'overlay__inactive'
            ]"
          ></div
        ></b-radio-button>
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
        waterColor: 0
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formColor: state => state.formPictsSections.color
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
      name: "color",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterColor = null; //default value and make beforeUpdate hook jump
    },
    _loadAssests() {
      this.imgFolder = requireContext("@/assets/images/picts/color", true);
    },
    isSelected(object) {
      return this.values.waterColor == object;
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
