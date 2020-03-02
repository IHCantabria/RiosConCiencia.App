<template>
  <div class="form-section">
    <div class="header-section">
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field>
      <b-radio-button
        v-for="option in formDepth.data.depthRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterDepth"
        >{{ option.name }}</b-radio-button
      >
    </b-field>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

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
    waterDepthHasErrors() {
      return this.values.waterFlow === null;
    },
    isSectionValid() {
      return !this.waterDepthHasErrors;
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
    init() {
      this.values.waterDepth = null; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
