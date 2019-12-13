<template>
  <div class="app">
    <header class="app__header">
      <app-header></app-header>
    </header>
    <section class="app__main">
      <router-view />
      <app-data-loader
        @data-load-ready="onDataLoad"
        @data-load-error="onDataLoadError"
      />
    </section>
    <footer class="app__footer">
      <app-footer></app-footer>
    </footer>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {
    AppHeader: () => import("@/components/layout/AppHeader"),
    AppFooter: () => import("@/components/layout/AppFooter"),
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
.app {
  display: flex;
  height: 100%;
  flex-flow: row wrap;
  font-family: $app-font;
  font-size: $app-font-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  &__header {
    flex: 1 100%;
    height: $header-height;
  }

  &__main {
    flex: 1 100%;
  }

  &__footer {
    padding: 1rem;
    border: 1px solid;
    background-color: $app-background-color;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
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
