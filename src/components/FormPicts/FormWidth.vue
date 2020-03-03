<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-radio-button
        class="imgOption"
        v-for="option in formWidth.data.widthRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterWidth"
        ><img
          :class="
            isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formWidth.id, option.id)"/>
        <div
          :class="[
            'overlay',
            isSelected(option) ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div
      ></b-radio-button>
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
        waterWidth: 0
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formWidth: state => state.formPictsSections.width
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/width");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "width",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterWidth = null; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterWidth == object;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.imgOption {
  width: 40%;
  img {
    width: 100%;
  }
}
</style>
