<template>
  <div class="toolbar">
    <div id="nav" class="nav">
      <div class="nav__link">
        <router-link to="/"
          ><b-icon icon="home-circle" size="is-medium"> </b-icon
        ></router-link>
      </div>
      <div class="nav__link">
        <router-link to="/about"
          ><b-icon icon="help-circle" size="is-medium"> </b-icon
        ></router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  &__link {
    padding-right: 1rem;
  }
}
</style>
