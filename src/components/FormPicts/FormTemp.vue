<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-radio-button
        class="imgOption"
        v-for="option in formTemp.data.tempRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterTemp"
        ><img
          :class="
            isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formTemp.id, option.id)"/>
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
        waterTemp: 0
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formTemp: state => state.formPictsSections.temp
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/temp");
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
    },
    isSelected(object) {
      return this.values.waterTemp == object;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.imgOption {
  width: 20%;
  img {
    width: 100%;
  }
}
</style>
