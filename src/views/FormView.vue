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
      v-if="!isMasterDataLoaded"
      @data-load-ready="onDataLoad"
      @data-load-error="onDataLoadError"
    />
    <spinner v-if="!isMasterDataLoaded" :is-loading="!dataReady"></spinner>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "FormView",
  components: {
    init: () => import("@/components/FormInit"),
    basic: () => import("@/components/FormBasic"),
    spills: () => import("@/components/FormSpills"),
    waste: () => import("@/components/FormWaste"),
    habitat: () => import("@/components/FormHabitat"),
    ecoSystem: () => import("@/components/FormEcosystem"),
    biological: () => import("@/components/FormBiological"),
    riverQuality: () => import("@/components/FormRiverQuality"),
    ecoResult: () => import("@/components/FormEcoResult"),
    "app-data-loader": () => import("@/components/renderless/AppDataLoader"),
    spinner: () => import("@/components/Loading")
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
