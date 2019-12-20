<template>
  <div class="container">
    <div class="section">
      <form-init></form-init>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    "form-init": () => import("@/components/FormInit")
  }
};
</script>
<style lang="scss" scoped></style>
