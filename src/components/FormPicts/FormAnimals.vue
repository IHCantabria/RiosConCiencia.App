<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-checkbox-button
        class="imgOption"
        v-for="option in formAnimals.data.animalsRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterAnimals"
        ><img
          :class="
            isSelected(option)
              ? 'imgOption__active-left'
              : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formAnimals.id, option.id)"/><img
          :class="
            isSelected(option)
              ? 'imgOption__active-right'
              : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formAnimals.id, option.id, 1)"/>
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
      pdfLink: require("../../assets/pdfs/basico.pdf"),
      values: {
        waterAnimals: null
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formAnimals: state => state.formPictsSections.animals
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/animals");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "animals",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterAnimals = []; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterAnimals
        ? this.values.waterAnimals.findIndex(obj => obj.id == object.id) == -1
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
  width: 70vw;
  display: flex;
  align-items: center;
  img {
    height: 100%;
    width: 35vw;
  }
}
</style>
