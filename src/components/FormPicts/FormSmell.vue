<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-radio-button
        class="imgOption"
        v-for="option in formSmell.data.smellRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterSmell"
        ><img
          :class="
            isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formSmell.id, option.id, 1)"/>
        <div
          :class="[
            'overlay',
            isSelected(option) ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div
      ></b-radio-button>
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
        waterSmell: 0
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formSmell: state => state.formPictsSections.smell
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/smell");
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
    },
    isSelected(object) {
      return this.values.waterSmell == object;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.imgOption {
  width: 40%;
  img {
    width: 100%;
  }
}
</style>
