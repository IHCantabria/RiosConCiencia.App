<script setup>
import TheAbout from "@/components/layout/TheAbout.vue";
</script>

<template>
  <div class="aboutView">
    <TheAbout />
  </div>
</template>

<style lang="scss" scoped>
a,
a:link,
a:visited,
a:focus,
a:hover,
a:active {
  color: app-variables.$color-primary;
  text-decoration: none;
  cursor: pointer;
}

.about {
  margin: 1rem;
}
</style>
