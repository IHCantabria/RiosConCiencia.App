<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-checkbox-button
        :class="[
          'imgOption',
          isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
        ]"
        v-for="option in formEnv.data.envRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterEnv"
        ><img :src="getImgUrl(formEnv.id, option.id)"/>
        <div
          :class="[
            'overlay',
            isSelected(option) ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div
      ></b-checkbox-button>
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
        waterEnv: null
      }
    };
  },
  computed: {
    ...mapState({
      formEnv: state => state.formPictsSections.env
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
      name: "env",
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
      console.log("init");
      this.imgFolder = require.context("@/assets/images/picts/env");
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
  width: 20%;
}
</style>
