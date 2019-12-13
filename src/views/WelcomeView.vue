<template>
  <div class="welcome">
    <intro />
  </div>
</template>

<script>
export default {
  name: "welcome",
  components: {
    intro: () => import("@/components/Intro")
  }
};
</script>
<style lang="scss" scoped>
.welcome {
  margin: 1rem;
}
</style>
