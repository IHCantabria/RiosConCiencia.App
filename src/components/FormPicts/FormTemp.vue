<template>
  <div class="form-section">
    <div class="header-section">
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field>
      <b-radio-button
        v-for="option in formTemp.data.tempRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterTemp"
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
        waterTemp: 0
      }
    };
  },
  computed: {
    ...mapState({
      formTemp: state => state.formPictsSections.temp
    }),
    waterTempHasErrors() {
      return this.values.waterFlow === null;
    },
    isSectionValid() {
      return !this.waterTempHasErrors;
    }
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "temp",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterTemp = null; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
