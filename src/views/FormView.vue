<template>
  <div>
    <div class="section" v-if="dataReady">
      <!-- TODO:Carga dinámica de components con v-for -->
      <form-init v-show="activeSectionId === formSections.init.id"></form-init>
      <form-basic
        v-show="activeSectionId === formSections.basic.id"
      ></form-basic>
      <form-spills
        v-show="activeSectionId === formSections.spills.id"
      ></form-spills>
      <form-waste
        v-show="activeSectionId === formSections.waste.id"
      ></form-waste>
      <form-habitat
        v-show="activeSectionId === formSections.habitat.id"
      ></form-habitat>
      <form-ecosystem
        v-show="activeSectionId === formSections.ecoSystem.id"
      ></form-ecosystem>
      <form-biological
        v-show="activeSectionId === formSections.bioQuality.id"
      ></form-biological>
      <form-riverQuality
        v-show="activeSectionId === formSections.riverQuality.id"
      ></form-riverQuality>
    </div>
    <app-data-loader
      @data-load-ready="onDataLoad"
      @data-load-error="onDataLoadError"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "FormView",
  components: {
    "form-init": () => import("@/components/FormInit"),
    "form-basic": () => import("@/components/FormBasic"),
    "form-spills": () => import("@/components/FormSpills"),
    "form-waste": () => import("@/components/FormWaste"),
    "form-habitat": () => import("@/components/FormHabitat"),
    "form-ecosystem": () => import("@/components/FormEcosystem"),
    "form-biological": () => import("@/components/FormBiological"),
    "form-riverQuality": () => import("@/components/FormRiverQuality"),
    "app-data-loader": () => import("@/components/renderless/AppDataLoader")
  },
  data() {
    return {
      dataReady: false
    };
  },
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId,
      formSections: state => state.formSections
    })
  },
  methods: {
    onDataLoad() {
      this.dataReady = true;
      console.log("Form ready");
    },
    onDataLoadError(err) {
      //TODO: notificar error
      console.error(`Error inicializando app. ${err}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
