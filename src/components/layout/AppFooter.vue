<template>
  <div>
    <form-navigation></form-navigation>
  </div>
</template>
<script>
export default {
  components: {
    "form-navigation": () => import("@/components/FormNavigation")
  }
};
</script>
<style lang="scss" scoped></style>
