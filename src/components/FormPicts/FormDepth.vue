<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>MEDIMOS LA PROFUNDIDAD DEL RÍO</span>
      </h5>
      <div class="header-section__help">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      message="Para medir la profundidad del río, utilizaremos un palo de colores. Cada color representa un tramo de profundidad. Meteremos el palo en el río y observaremos hasta qué color se moja el palo."
    >
    </b-field>
    <div class="block guideSection">
      <div class="guideStep">
        <img :src="$_getImgUrl(formDepth.id, 0, 1)" />
        <b-tag class="guideStep__text" type="is-info"
          >ESTO ES UNA PALO DE COLORES
        </b-tag>
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formDepth.id, 0, 2)" />
        <b-tag class="guideStep__text" type="is-info"
          >METEMOS EL PALO EN EL RÍO
        </b-tag>
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formDepth.id, 0, 3)" />
        <b-tag class="guideStep__text" type="is-info"
          >MIRAMOS EL COLOR DEL PALO</b-tag
        >
      </div>
    </div>
    <div class="imgHeader">
      <img :src="$_getImgUrl(formDepth.id, 0, 0)" class="imgHeader__pic" />
      <b-field
        label="3. ¿Hasta que color esta mojado el palo?"
        class="imgHeader__text"
      ></b-field>
      <b-icon
        class="imgHeader__icon"
        icon="checkbox-marked-circle-outline"
        type="is-info"
      ></b-icon>
    </div>
    <b-field class="imgSection">
      <div
        class="imgContainer"
        :key="option.id"
        v-for="option in formDepth.data.depthRiverOptions"
      >
        <span class="imgTexOption">{{ option.color | upperCase }}</span>
        <b-radio-button
          class="imgOption"
          :native-value="option"
          v-model="values.waterDepth"
          ><img
            :class="
              isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
            "
            :src="$_getImgUrl(formDepth.id, option.id, 1)"/>
          <div
            :class="[
              'overlay',
              isSelected(option) ? 'overlay__active' : 'overlay__inactive'
            ]"
          ></div
        ></b-radio-button>
      </div>
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
        waterDepth: 0
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formDepth: state => state.formPictsSections.depth
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/depth");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "depth",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterDepth = null; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterDepth == object;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.imgOption {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  img {
    height: 100%;
    max-width: 220px;
    width: 100%;
  }
}
.imgContainer {
  max-width: 220px;
}
.imgHeader {
  &__pic {
    max-width: 120px;
  }
}
</style>
