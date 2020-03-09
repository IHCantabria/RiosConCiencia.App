<template>
  <div class="aboutView">
    <about />
  </div>
</template>
<script>
import { routeGuardMixin } from "@/mixins/route-guard.js";
export default {
  name: "AboutView",
  components: {
    about: () => import("@/components/layout/AppAbout")
  },
  mixins: [routeGuardMixin]
};
</script>
<style lang="scss" scoped>
a,
a:link,
a:visited,
a:focus,
a:hover,
a:active {
  color: $color-primary;
  text-decoration: none;
  cursor: pointer;
}
.about {
  margin: 1rem;
}
</style>
