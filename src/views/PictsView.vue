<template>
  <div class="section">
    <keep-alive
      v-for="(section, index) in Object.keys(formSections)"
      :key="index"
    >
      <component
        :is="section"
        v-show="activeSectionName(formSections) === section"
      ></component>
    </keep-alive>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { routeGuardMixin } from "@/mixins/route-guard.js";
export default {
  name: "PictsView",
  components: {
    flow: () => import("@/components/FormPicts/FormFlow"),
    width: () => import("@/components/FormExpert/FormInit")
  },
  mixins: [routeGuardMixin],
  beforeRouteLeave(to, from, next) {
    if (
      (to.path == "/" || to.path == "/about") &&
      Object.keys(this.formSections.init.results).length !== 0
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
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId,
      formSections: state => state.formSections
    }),
    ...mapGetters({
      activeSectionName: "activeSectionName",
      isMasterDataLoaded: "isMasterDataLoaded"
    })
  },
  methods: {
    onDataLoad() {
      this.dataReady = true;
    },
    onDataLoadError() {
      let error = this.isComputedOnline
        ? "No ha sido posible cargar datos maestros del formulario, el servidor esta caido"
        : " No es posible cargar datos maestros del formulario si no dispones de conexión a internet";
      this.$buefy.toast.open({
        message: error,
        type: "is-danger"
      });
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
