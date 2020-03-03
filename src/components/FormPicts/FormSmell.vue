<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-radio-button
        :class="[
          'imgOption',
          isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
        ]"
        v-for="option in formSmell.data.smellRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterSmell"
        ><img :src="getImgUrl(formSmell.id, option.id)"/>
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
      imgFolder: null,
      values: {
        waterSmell: 0
      }
    };
  },
  computed: {
    ...mapState({
      formSmell: state => state.formPictsSections.smell
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.loadImgs();
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "smell",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    getImgUrl(idSection, iOption) {
      return this.imgFolder
        ? this.imgFolder(`./${getBackground(idSection, iOption)}`)
        : "";
    },
    init() {
      this.values.waterSmell = null; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterSmell == object;
    },
    loadImgs() {
      this.imgFolder = require.context("@/assets/images/picts/smell");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.imgOption {
  width: 40%;
}
</style>
