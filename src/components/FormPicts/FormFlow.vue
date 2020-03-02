<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-radio-button
        class="imgOption"
        v-model="values.waterFlow"
        :native-value="false"
      >
        <img :src="getImgUrl(1)" />
        <div
          :class="[
            'overlay',
            values.waterFlow == false ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div>
      </b-radio-button>
      <b-radio-button
        class="imgOption"
        v-model="values.waterFlow"
        :native-value="true"
      >
        <img :src="getImgUrl(2)" />
        <div
          :class="[
            'overlay',
            values.waterFlow == true ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div>
      </b-radio-button>
    </b-field>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { getBackground } from "@/utils/utils.js";
export default {
  data() {
    return {
      pdfLink: require("../../assets/pdfs/basico.pdf"),
      values: {
        waterFlow: 0
      }
    };
  },
  computed: {
    ...mapState({
      formFlow: state => state.formPictsSections.flow
    }),
    isSectionValid() {
      return true; //optional section
    }
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
    getImgUrl(iOption) {
      const imgfolder = require.context("@/assets/images/picts/flow");
      const optionImage = imgfolder(`./${getBackground(0, iOption)}`);
      return optionImage;
    },
    init() {
      this.values.waterFlow = null; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
