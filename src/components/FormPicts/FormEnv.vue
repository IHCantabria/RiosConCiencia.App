<template>
  <div class="form-section">
    <div class="header-section">
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field>
      <b-checkbox-button
        v-for="option in formEnv.data.envRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterEnv"
        >{{ option.name }}</b-checkbox-button
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
        waterEnv: null
      }
    };
  },
  computed: {
    ...mapState({
      formEnv: state => state.formPictsSections.env
    }),
    waterEnvHasErrors() {
      return this.values.waterEnv.length === 0;
    },
    isSectionValid() {
      return !this.waterEnvHasErrors;
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
    init() {
      this.values.waterEnv = []; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
