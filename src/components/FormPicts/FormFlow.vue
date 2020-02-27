<template>
  <div class="form-section">
    <div class="header-section">
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field>
      <b-radio-button v-model="values.waterFlow" :native-value="false">
        <b-icon icon="close"></b-icon>
        <span>No</span>
      </b-radio-button>
      <b-radio-button v-model="values.waterFlow" :native-value="true">
        <b-icon icon="check"></b-icon>
        <span>Si</span>
      </b-radio-button>
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
        waterFlow: 0
      }
    };
  },
  computed: {
    ...mapState({
      formFlow: state => state.formPictsSections.flow
    }),
    waterFlowHasErrors() {
      return this.values.waterFlow === null;
    },
    isSectionValid() {
      return !this.waterFlowHasErrors;
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
    init() {
      this.values.waterFlow = null; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
