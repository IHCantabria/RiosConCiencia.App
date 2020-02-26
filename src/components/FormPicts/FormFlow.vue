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
        waterFlow: null
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
    this.updateSpecificSectionValues({
      name: "flow",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificSectionValues: "updateSpecificSectionValues"
    }),
    init() {
      //default init values
      this.values.waterColor = this.formBasic.data.waterColorOptions[0];
      this.values.waterSmell = this.formBasic.data.waterSmellOptions[0];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
