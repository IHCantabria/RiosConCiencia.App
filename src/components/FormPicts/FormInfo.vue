<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>PROYECTO RÍOS</span>
      </h5>
      <div class="header-section__help">
        <a :href="pdfLinks[0]" target="_blank"
          ><b-icon icon="information-outline" type="is-info"></b-icon
        ></a>
      </div>
    </div>
    <div class="info-section">
      <div class="info-step">
        <div class="info-step__header">
          <b-field
            class="info-section__text"
            message="El Proyecto Ríos trata de averiguar el estado de los ríos. Para ello, realizaremos unas actividades en el río para conocer su estado."
          >
          </b-field>
        </div>
        <div class="info-step__body">
          <img :src="$_getImgUrl(0, 0, 1)" />
        </div>
      </div>
      <div class="info-step">
        <div class="info-step__header">
          <b-field
            class="info-section__text"
            label="EL RÍO"
            message="El río sirve para, por ejemplo: pescar peces y comerlos, regar las huertas donde cultivamos frutas y verduras y jugar y disfrutar en él."
          >
          </b-field>
          <div class="info-section__help">
            <a :href="pdfLinks[1]" target="_blank"
              ><b-icon icon="information-outline" type="is-info"></b-icon
            ></a>
          </div>
        </div>
        <div class="info-step__body">
          <img :src="$_getImgUrl(0, 0, 2)" />
        </div>
      </div>
      <div class="info-step">
        <div class="info-step__header">
          <b-field
            class="info-section__text"
            label="EL RÍO ESTÁ BIEN CUANDO..."
            message="Se puede considerar que el río está bien cuando: 1) el agua está limpia; 2) no encontramos basura en las márgenes y; 3) existen invertebrados que indican que la calidad del agua es buena."
          >
          </b-field>
          <div class="info-section__help">
            <a :href="pdfLinks[2]" target="_blank"
              ><b-icon icon="information-outline" type="is-info"></b-icon
            ></a>
          </div>
        </div>
        <div class="info-step__body">
          <img :src="$_getImgUrl(0, 0, 3)" />
          <img :src="$_getImgUrl(0, 0, 4)" />
        </div>
      </div>
      <div class="info-step">
        <div class="info-step__header">
          <b-field
            class="info-section__text"
            label="EL RÍO ESTÁ MAL CUANDO..."
            message="Se puede considerar que el río está mal cuando: 1) el agua está sucia; 2) encontramos basura en las márgenes y; 3) no hay invertebrados que indican que la calidad del agua es buena, viviendo en su lugar otro tipo de invertebrados menos exigentes."
          >
          </b-field>
          <div class="info-section__help">
            <a :href="pdfLinks[3]" target="_blank"
              ><b-icon icon="information-outline" type="is-info"></b-icon
            ></a>
          </div>
        </div>
        <div class="info-step__body">
          <img :src="$_getImgUrl(0, 0, 5)" />
          <img :src="$_getImgUrl(0, 0, 6)" />
        </div>
      </div>
      <div class="info-step">
        <div class="info-step__header">
          <b-field
            class="info-section__text"
            label="COMENZAMOS..."
            message="Comenzamos a realizar unas actividades para conocer el estado del río."
          >
          </b-field>
          <div class="info-section__help">
            <a :href="pdfLinks[0]" target="_blank"
              ><b-icon icon="information-outline" type="is-info"></b-icon
            ></a>
          </div>
        </div>
        <div class="info-step__body">
          <img :src="$_getImgUrl(0, 0, 7)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { pictsHelperMixin } from "@/mixins/picts-helper.js";
export default {
  mixins: [pictsHelperMixin],
  data() {
    return {
      pdfLinks: null
    };
  },
  computed: {
    ...mapState({
      formInfo: state => state.formPictsSections.info
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/info");
    this.pdfLinks = [
      require("../../assets/pdfs/RCC1.pdf"),
      require("../../assets/pdfs/RCC2.pdf"),
      require("../../assets/pdfs/RCC3.pdf"),
      require("../../assets/pdfs/RCC4.pdf")
    ];
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "info",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.updateSpecificPictsSectionValues({
        name: "info",
        values: this.values,
        isValid: this.isSectionValid
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>
