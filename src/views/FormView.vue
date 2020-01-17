<template>
  <div class="section">
    <!-- TODO:Carga dinámica de components con v-for -->
    <form-init
      v-show="activeSectionId === formSections.initSection.id"
    ></form-init>
    <form-basic
      v-show="activeSectionId === formSections.basicSection.id"
    ></form-basic>
    <form-spills
      v-show="activeSectionId === formSections.spillsSection.id"
    ></form-spills>
    <form-waste
      v-show="activeSectionId === formSections.wasteSection.id"
    ></form-waste>
    <form-habitat
      v-show="activeSectionId === formSections.habitatSection.id"
    ></form-habitat>
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
    "form-habitat": () => import("@/components/FormHabitat")
  },
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId,
      formSections: state => state.formSections
    })
  }
};
</script>
<style lang="scss" scoped></style>
