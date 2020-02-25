<template>
  <div class="welcome">
    <intro />
  </div>
</template>
<script>
import { routeGuardMixin } from "@/mixins/route-guard.js";
export default {
  name: "WelcomeView",
  components: {
    intro: () => import("@/components/Intro")
  },
  mixins: [routeGuardMixin]
};
</script>
<style lang="scss" scoped>
.welcome {
  margin: 1rem;
}
</style>
