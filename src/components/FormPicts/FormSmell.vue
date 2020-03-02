<template>
  <div class="form-section">
    <div class="header-section">
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field>
      <b-radio-button
        v-for="option in formSmell.data.smellRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterSmell"
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
        waterSmell: 0
      }
    };
  },
  computed: {
    ...mapState({
      formSmell: state => state.formPictsSections.smell
    }),
    waterSmellHasErrors() {
      return this.values.waterSmell === null;
    },
    isSectionValid() {
      return !this.waterSmellHasErrors;
    }
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
    init() {
      this.values.waterSmell = null; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
