<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-checkbox-button
        class="imgOption"
        v-for="option in formGarbage.data.garbageRiverOptions"
        :key="option.id"
        :native-value="option"
        v-model="values.waterGarbage"
        ><img
          :class="
            isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
          "
          :src="$_getImgUrl(formGarbage.id, option.id)"/>
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
        waterGarbage: null
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formGarbage: state => state.formPictsSections.garbage
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/garbage");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "garbage",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterGarbage = []; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterGarbage
        ? this.values.waterGarbage.findIndex(obj => obj.id == object.id) == -1
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
  width: 30vw;
  display: flex;
  align-items: center;
  img {
    width: 100%;
  }
}
</style>
