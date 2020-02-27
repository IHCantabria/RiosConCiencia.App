<template>
  <div class="form-section">
    <div class="header-section">
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      pdfLink: require("../../assets/pdfs/basico.pdf"),
      values: {
        waterWidth: null
      }
    };
  },
  computed: {
    ...mapState({
      formWidth: state => state.formPictsSections.width
    }),
    riverWidthHasErrors() {
      return this.values.waterWidth === null;
    },
    isSectionValid() {
      return !this.riverWidthHasErrors;
    }
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
