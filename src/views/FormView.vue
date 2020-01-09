<template>
  <div class="section">
    <form-init v-show="activeSectionId === formSections.init.id"></form-init>
    <form-basic v-show="activeSectionId === formSections.basic.id"></form-basic>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {
    "form-init": () => import("@/components/FormInit"),
    "form-basic": () => import("@/components/FormBasic")
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
