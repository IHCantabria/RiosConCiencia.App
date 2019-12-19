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
    background-color: #ffffff;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    &.box {
      padding: 0.5rem;
    }
  }
}

#nav {
  a {
    font-weight: bold;
    color: $font-color-medium;

    &.router-link-exact-active {
      color: $color-primary;
    }
  }
}

//hack to avoid buefy step controller hide on mobile
@media screen and (max-width: 768px) {
  .b-steps .steps.is-small .step-items .step-item:not(.is-active) {
    display: block !important;
  }
  .b-steps .steps.is-small .step-items .step-item:not(:first-child)::before,
  .b-steps .steps.is-small .step-items .step-item:only-child::before {
    height: 0.2em !important;
    width: 100% !important;
    bottom: 0 !important;
    left: -50% !important;
    top: 0.75rem !important;
  }
}
</style>
