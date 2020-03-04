<template>
  <div class="form-section">
    <b-field class="imgSection"> ZONA UNO</b-field>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { pictsHelperMixin } from "@/mixins/picts-helper.js";
export default {
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formInfo: state => state.formPictsSections.info
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/flow");
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "info",
      values: this.values,
      isValid: this.isSectionValid
    });
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
