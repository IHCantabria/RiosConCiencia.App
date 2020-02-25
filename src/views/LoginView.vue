<template>
  <div class="login">
    <login-user />
  </div>
</template>
<script>
import { routeGuardMixin } from "@/mixins/route-guard.js";
export default {
  name: "LoginView",
  mixins: [routeGuardMixin],
  components: {
    "login-user": () => import("@/components/LoginUser")
  }
};
</script>
<style lang="scss" scoped>
.login {
  margin: 1rem;
}
</style>
