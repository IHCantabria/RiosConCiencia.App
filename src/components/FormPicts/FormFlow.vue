<template>
  <div class="form-section">
    <b-field class="imgSection">
      <b-radio-button
        :class="[
          'imgOption',
          values.waterFlow == false
            ? 'imgOption__active'
            : 'imgOption__inactive'
        ]"
        v-model="values.waterFlow"
        :native-value="false"
      >
        <img :src="$_getImgUrl(0, 1)" />
        <div
          :class="[
            'overlay',
            values.waterFlow == false ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div>
      </b-radio-button>
      <b-radio-button
        :class="[
          'imgOption',
          values.waterFlow == true ? 'imgOption__active' : 'imgOption__inactive'
        ]"
        v-model="values.waterFlow"
        :native-value="true"
      >
        <img :src="$_getImgUrl(0, 2)" />
        <div
          :class="[
            'overlay',
            values.waterFlow == true ? 'overlay__active' : 'overlay__inactive'
          ]"
        ></div>
      </b-radio-button>
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
        waterFlow: 0
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formFlow: state => state.formPictsSections.flow
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/flow");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "flow",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterFlow = null; //default value and make beforeUpdate hook jump
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.imgOption {
  width: 40%;
}
</style>
