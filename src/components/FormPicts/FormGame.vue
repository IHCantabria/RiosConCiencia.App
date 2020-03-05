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
      values: {}
    };
  },
  computed: {
    ...mapState({
      formGame: state => state.formPictsSections.game
    }),
    riverGameHasErrors() {
      return false;
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
      name: "game",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {}
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
