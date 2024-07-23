<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { inject } from "vue";
import TheAbout from "@/components/layout/TheAbout.vue";

onBeforeRouteLeave(async () => {
  const backbuttonPulsed = inject("$backbuttonPulsed");
  if (backbuttonPulsed.value) {
    backbuttonPulsed.value = false;
    return false;
  }
  return true;
});
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
