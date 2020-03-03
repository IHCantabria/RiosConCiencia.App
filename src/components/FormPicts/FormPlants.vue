<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-checkbox-button
        :class="[
          'imgOption',
          isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
        ]"
        v-for="option in formPlants.data.plantsRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterPlants"
        ><img :src="$_getImgUrl(formPlants.id, option.id)"/>
        <div
          :class="[
            'overlay',
            isSelected(option) ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div
      ></b-checkbox-button>
    </b-field>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { pictsHelperMixin } from "@/mixins/picts-helper.js";
export default {
  data() {
    return {
      values: {
        waterPlants: null
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formPlants: state => state.formPictsSections.plants
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/plants");
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
    },
    isSelected(object) {
      return this.values.waterPlants
        ? this.values.waterPlants.findIndex(obj => obj.id == object.id) == -1
          ? false
          : true
        : "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.imgOption {
  width: 25%;
}
</style>
