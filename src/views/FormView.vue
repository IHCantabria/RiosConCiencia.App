<template>
  <div class="section">
    <!-- TODO:Carga dinámica de components con v-for -->
    <form-init v-show="activeSectionId === formSections.init.id"></form-init>
    <form-basic v-show="activeSectionId === formSections.basic.id"></form-basic>
    <form-spills
      v-show="activeSectionId === formSections.spills.id"
    ></form-spills>
    <form-waste v-show="activeSectionId === formSections.waste.id"></form-waste>
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
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {
    "form-init": () => import("@/components/FormInit"),
    "form-basic": () => import("@/components/FormBasic"),
    "form-spills": () => import("@/components/FormSpills"),
    "form-waste": () => import("@/components/FormWaste"),
    "form-habitat": () => import("@/components/FormHabitat"),
    "form-ecosystem": () => import("@/components/FormEcosystem"),
    "form-biological": () => import("@/components/FormBiological"),
    "form-riverQuality": () => import("@/components/FormRiverQuality")
  },
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId,
      formSections: state => state.formSections
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
