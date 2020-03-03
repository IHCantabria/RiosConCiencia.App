<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-radio-button
        :class="[
          'imgOption',
          isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
        ]"
        v-for="option in formDepth.data.depthRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterDepth"
        ><img :src="getImgUrl(formDepth.id, option.id)"/>
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
import { getBackground } from "@/utils/utils.js";
export default {
  data() {
    return {
      pdfLink: require("../../assets/pdfs/basico.pdf"),
      values: {
        waterDepth: 0
      }
    };
  },
  computed: {
    ...mapState({
      formDepth: state => state.formPictsSections.depth
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
      name: "depth",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    getImgUrl(idSection, iOption) {
      const imgfolder = require.context("@/assets/images/picts/depth");
      const optionImage = imgfolder(`./${getBackground(idSection, iOption)}`);
      return optionImage;
    },
    init() {
      this.values.waterDepth = null; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterDepth == object;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
