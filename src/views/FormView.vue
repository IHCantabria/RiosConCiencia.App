<template>
  <div class="section">
    <keep-alive
      v-for="(section, index) in Object.keys(formSections)"
      :key="index"
    >
      <component
        :is="section"
        v-show="activeSectionName === section"
      ></component>
    </keep-alive>
    <app-data-loader
      v-if="!isExpertDataLoaded"
      @data-load-ready="onDataLoad"
      @data-load-error="onDataLoadError"
    />
    <spinner v-if="!isExpertDataLoaded" :is-loading="!dataReady"></spinner>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { routeGuardMixin } from "@/mixins/route-guard.js";
export default {
  name: "FormView",
  components: {
    init: () => import("@/components/FormExpert/FormInit"),
    basic: () => import("@/components/FormExpert/FormBasic"),
    spills: () => import("@/components/FormExpert/FormSpills"),
    waste: () => import("@/components/FormExpert/FormWaste"),
    habitat: () => import("@/components/FormExpert/FormHabitat"),
    ecoSystem: () => import("@/components/FormExpert/FormEcosystem"),
    biological: () => import("@/components/FormExpert/FormBiological"),
    riverQuality: () => import("@/components/FormExpert/FormRiverQuality"),
    ecoResult: () => import("@/components/FormExpert/FormEcoResult"),
    "app-data-loader": () =>
      import("@/components/renderless/AppExpertDataLoader"),
    spinner: () => import("@/components/Loading")
  },
  mixins: [routeGuardMixin],
  data() {
    return {
      dataReady: false
    };
  },
  mounted() {
    this.init();
  },
  beforeRouteLeave(to, from, next) {
    //if the load master data fail let the router go back to main page
    if (!this.formSections.init) {
      next();
      //if the user try to leave the form shwo a warm
    } else if (
      (to.path == "/" || to.path == "/about") &&
      Object.keys(this.formSections.init.results).length !== 0
    ) {
      this.$buefy.dialog.confirm({
        title: "Formulario Incompleto",
        message:
          "¿Seguro que deseas abandonar esta sección? El formulario no ha sido completado y las respuestas actuales no estarán guardadas cuando vuelvas a entrar.",
        confirmText: "Confirmar",
        cancelText: "No abandonar",
        type: "is-danger",
        hasIcon: true,
        onCancel: () => next(false),
        onConfirm: () => next()
      });
    } else {
      next();
    }
  },
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId,
      formSections: state => state.formExpertSections
    }),
    ...mapGetters({
      activeSectionName: "activeSectionName",
      isExpertDataLoaded: "isExpertDataLoaded"
    })
  },
  methods: {
    ...mapActions({
      setActiveForm: "setActiveForm",
      setActiveSection: "setActiveSection"
    }),
    onDataLoad() {
      this.dataReady = true;
    },
    init() {
      this.setActiveForm(0); // ExpertForm
      this.setActiveSection(0);
    },
    onDataLoadError() {
      //dataReady switch to hide spinner
      this.dataReady = true;
      let error = this.isComputedOnline
        ? "No ha sido posible cargar datos maestros del formulario, el servidor esta caido"
        : " No es posible cargar datos maestros del formulario si no dispones de conexión a internet";
      this.$buefy.toast.open({
        message: error,
        type: "is-danger",
        duration: 4000
      });
      this.dataReady = false;
      this.$router.push("/");
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
