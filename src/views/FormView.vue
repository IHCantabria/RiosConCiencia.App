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
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    init: () => import("@/components/FormInit"),
    basic: () => import("@/components/FormBasic"),
    spills: () => import("@/components/FormSpills"),
    waste: () => import("@/components/FormWaste"),
    habitat: () => import("@/components/FormHabitat"),
    ecoSystem: () => import("@/components/FormEcosystem"),
    bioQuality: () => import("@/components/FormBiological"),
    riverQuality: () => import("@/components/FormRiverQuality"),
    ecoResult: () => import("@/components/FormEcoResult")
  },
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId,
      formSections: state => state.formSections
    }),
    ...mapGetters({
      activeSectionName: "activeSectionName"
    })
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
