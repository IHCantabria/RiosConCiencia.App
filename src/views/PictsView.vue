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
      v-if="!isPictsDataLoaded"
      @data-load-ready="onDataLoad"
      @data-load-error="onDataLoadError"
    />
    <spinner v-if="!isPictsDataLoaded" :is-loading="!dataReady"></spinner>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { routeGuardMixin } from "@/mixins/route-guard.js";
export default {
  name: "PictsView",
  components: {
    info: () => import("@/components/FormPicts/FormInfo"),
    flow: () => import("@/components/FormPicts/FormFlow"),
    width: () => import("@/components/FormPicts/FormWidth"),
    depth: () => import("@/components/FormPicts/FormDepth"),
    temp: () => import("@/components/FormPicts/FormTemp"),
    env: () => import("@/components/FormPicts/FormEnv"),
    color: () => import("@/components/FormPicts/FormColor"),
    smell: () => import("@/components/FormPicts/FormSmell"),
    garbage: () => import("@/components/FormPicts/FormGarbage"),
    plants: () => import("@/components/FormPicts/FormPlants"),
    animals: () => import("@/components/FormPicts/FormAnimals"),
    game: () => import("@/components/FormPicts/FormGame"),
    "app-data-loader": () =>
      import("@/components/renderless/AppPictsDataLoader"),
    spinner: () => import("@/components/Loading")
  },
  mixins: [routeGuardMixin],
  data() {
    return {
      dataReady: false
    };
  },
  beforeRouteLeave(to, from, next) {
    //if the load master data fail let the router go back to main page
    if (!this.formSections.width) {
      next();
      //if the user try to leave the form shwo a warm
    } else if (
      (to.path == "/" || to.path == "/about") &&
      Object.keys(this.formSections.width.results).length !== 0
    ) {
      this.$buefy.dialog.confirm({
        title: "Formulario Incompleto",
        message:
          "¿Seguro que desea abandonar esta sección? El formulario no ha sido completado y las respuestas actuales no estarán guardadas cuando vuelva a entrar.",
        confirmText: "Confirmar",
        cancelText: "No Abandonar",
        type: "is-danger",
        hasIcon: true,
        onCancel: () => next(false),
        onConfirm: () => next()
      });
    } else {
      next();
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId,
      formSections: state => state.formPictsSections
    }),
    ...mapGetters({
      activeSectionName: "activeSectionName",
      isPictsDataLoaded: "isPictsDataLoaded"
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
      this.setActiveForm(1); // PictsForm
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
