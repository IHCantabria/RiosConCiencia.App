<template>
  <div class="section">
    <form-init v-show="activeSectionId === formSections.init.id"></form-init>
    <form-basic v-show="activeSectionId === formSections.basic.id"></form-basic>
    <form-spills
      v-show="activeSectionId === formSections.spills.id"
    ></form-spills>
    <form-waste v-show="activeSectionId === formSections.waste.id"></form-waste>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {
    "form-init": () => import("@/components/FormInit"),
    "form-basic": () => import("@/components/FormBasic"),
    "form-spills": () => import("@/components/FormSpills"),
    "form-waste": () => import("@/components/FormWaste")
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
