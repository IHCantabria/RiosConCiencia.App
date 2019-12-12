<template>
  <div id="app">
    <app-header></app-header>
    <router-view />
    <app-data-loader
      @data-load-ready="onDataLoad"
      @data-load-error="onDataLoadError"
    />
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    AppHeader: () => import("@/components/layout/AppHeader"),
    AppDataLoader: () => import("@/components/renderless/AppDataLoader")
  },
  methods: {
    onDataLoad() {},
    onDataLoadError(err) {
      //TODO: notificar error
      console.error(`Error inicializando app. ${err}`);
    }
  }
};
</script>
<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: $app-font;
  font-size: $app-font-size;
  background-color: $app-background-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: $font-color-medium;

    &.router-link-exact-active {
      color: $font-color-light;
    }
  }
}
</style>
