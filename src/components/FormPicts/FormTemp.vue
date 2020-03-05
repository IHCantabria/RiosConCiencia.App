<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>MEDIMOS LA TEMPERATURA DEL RÍO </span>
      </h5>
      <div class="header-section__help">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      message="Para conocer la temperatura del río, utilizaremos un termómetro. Introduciremos el termómetro en el agua del río y esperaremos un minuto para conocer el resultado. Finalmente, miraremos qué color alcanza."
    >
    </b-field>
    <div class="block guideSection">
      <div class="guideStep">
        <img :src="$_getImgUrl(formTemp.id, 0, 1)" />
        <b-tag class="guideStep__text" type="is-info"
          >METEMOS EL TERMÓMETRO EN EL RÍO
        </b-tag>
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formTemp.id, 0, 2)" />
        <b-tag class="guideStep__text" type="is-info"
          >ESPERAMOS UN MINUTO
        </b-tag>
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formTemp.id, 0, 3)" />
        <b-tag class="guideStep__text" type="is-info"
          >MIRAMOS QUÉ COLOR TENEMOS</b-tag
        >
      </div>
    </div>
    <div class="imgHeader">
      <img :src="$_getImgUrl(formTemp.id, 0, 0)" class="imgHeader__pic" />
      <b-field
        label="4. ¿Hasta que color llega el termómetro?"
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
        v-for="option in formTemp.data.tempRiverOptions"
      >
        <span class="imgTexOption">{{ option.color | upperCase }}</span>
        <b-radio-button
          class="imgOption"
          :native-value="option"
          v-model="values.waterTemp"
          ><img
            :class="
              isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
            "
            :src="$_getImgUrl(formTemp.id, option.id, 1)"/>
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
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  img {
    height: 100%;
    max-width: 100px;
    width: 100%;
  }
}
.imgContainer {
  max-width: 100px;
}
.imgHeader {
  &__pic {
    max-width: 120px;
  }
}
</style>
