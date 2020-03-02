<template>
  <div class="form-section">
    <div class="header-section">
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <b-field>
      <b-checkbox-button
        v-for="option in formPlants.data.plantsRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterPlants"
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
        waterPlants: null
      }
    };
  },
  computed: {
    ...mapState({
      formPlants: state => state.formPictsSections.plants
    }),
    waterGarbageHasErrors() {
      return this.values.waterPlants.length === 0;
    },
    isSectionValid() {
      return !this.waterGarbageHasErrors;
    }
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "plants",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterPlants = []; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
