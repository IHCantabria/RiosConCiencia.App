<template>
  <div class="login">
    <login-user />
  </div>
</template>

<script>
export default {
  name: "login",
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
