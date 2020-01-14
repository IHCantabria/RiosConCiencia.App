<template>
  <div class="section">
    <form-init v-show="activeSectionId === formSections.init.id"></form-init>
    <form-basic v-show="activeSectionId === formSections.basic.id"></form-basic>
    <form-spills
      v-show="activeSectionId === formSections.spills.id"
    ></form-spills>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {
    "form-init": () => import("@/components/FormInit"),
    "form-basic": () => import("@/components/FormBasic"),
    "form-spills": () => import("@/components/FormSpills")
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
