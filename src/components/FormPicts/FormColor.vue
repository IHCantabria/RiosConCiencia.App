<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>MIRAMOS EL COLOR DEL RÍO</span>
      </h5>
      <div class="header-section__help">
        <b-icon icon="information-outline" type="is-info"></b-icon>
      </div>
    </div>
    <b-field
      message="Para conocer el color del río, utilizaremos una botella. Cogeremos agua del río y miraremos a través de la botella qué color tiene el agua."
    >
    </b-field>
    <div class="block guideSection">
      <div class="guideStep">
        <img :src="$_getImgUrl(formColor.id, 0, 1)" />
        <b-tag class="guideStep__text" type="is-info"
          >ESTO ES UNA BOTELLA
        </b-tag>
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formColor.id, 0, 2)" />
        <b-tag class="guideStep__text" type="is-info"
          >COGEMOS AGUA DEL RÍO
        </b-tag>
      </div>
      <div class="guideStep">
        <img :src="$_getImgUrl(formColor.id, 0, 3)" />
        <b-tag class="guideStep__text" type="is-info"
          >MIRAMOS QUÉ COLOR TIENE</b-tag
        >
      </div>
    </div>
    <div class="imgHeader">
      <img :src="$_getImgUrl(formColor.id, 0, 0)" class="imgHeader__pic" />
      <b-field
        label="6. ¿De qué color es el agua?"
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
        v-for="option in formColor.data.colorRiverOptions"
      >
        <span class="imgTexOption">{{ option.name | upperCase }}</span>
        <b-radio-button
          class="imgOption"
          :native-value="option"
          v-model="values.waterColor"
          ><img
            :class="
              isSelected(option) ? 'imgOption__active' : 'imgOption__inactive'
            "
            :src="$_getImgUrl(formColor.id, option.id, 1)"/>
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
        waterColor: 0
      }
    };
  },
  mixins: [pictsHelperMixin],
  computed: {
    ...mapState({
      formColor: state => state.formPictsSections.color
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/color");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "color",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.values.waterColor = null; //default value and make beforeUpdate hook jump
    },
    isSelected(object) {
      return this.values.waterColor == object;
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
