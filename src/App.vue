<template>
  <div class="app grid-container">
    <header class="app__header">
      <app-header></app-header>
    </header>
    <main class="app__main">
      <router-view />
      <app-data-loader
        @data-load-ready="onDataLoad"
        @data-load-error="onDataLoadError"
      />
    </main>
    <footer class="app__footer">
      <app-footer></app-footer>
    </footer>
  </div>
</template>
<script>
import { getMasterData } from "@/api/riosconciencia.js";
export default {
  name: "App",
  components: {
    AppHeader: () => import("@/components/layout/AppHeader"),
    AppFooter: () => import("@/components/layout/AppFooter"),
    AppDataLoader: () => import("@/components/renderless/AppDataLoader")
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      //TODO: Mover carga inicial de datos maestros al AppDataLoader(probar??)
      try {
        const masterData = await getMasterData();
        console.log(masterData);
      } catch (err) {
        console.error(err);
      }

      //this.initFormSections(); //contra la store, inicializar 'formSections'
    },
    onDataLoad() {},
    onDataLoadError(err) {
      //TODO: notificar error
      console.error(`Error inicializando app. ${err}`);
    }
  }
};
</script>
<style lang="scss">
/* Layout */
.grid-container {
  position: relative;
  display: grid;
  grid-template:
    "header"
    "main"
    "footer";
  grid-template-rows: $header-height 1fr $footer-height;
  grid-template-columns: 100%;
  height: 100vh;
  overflow-x: hidden;
}

.app {
  font-family: $app-font;
  font-size: $app-font-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  &__header {
    display: flex;
    grid-area: header;
  }

  &__main {
    grid-area: main;
  }

  &__footer {
    grid-area: footer;
    display: flex;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    z-index: 5;
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
