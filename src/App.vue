<template>
  <div class="app grid-container">
    <header class="app__header">
      <app-header></app-header>
    </header>
    <main class="app__main">
      <router-view />
      <app-notification-update />
      <app-geo-loader
        @geo-data-ready="onGeolocation"
        @geo-data-error="onGeolocationError"
      />
      <app-offline-manager />
      <app-reset-state />
    </main>
    <footer class="app__footer">
      <app-footer></app-footer>
    </footer>
  </div>
</template>
<script>
import { androidBackButtonMixin } from "@/mixins/android-back-button.js";
export default {
  name: "App",
  components: {
    AppHeader: () => import("@/components/layout/AppHeader"),
    AppFooter: () => import("@/components/layout/AppFooter"),
    AppGeoLoader: () => import("@/components/renderless/AppGeoLoader"),
    AppResetState: () => import("@/components/renderless/AppResetState"),
    AppOfflineManager: () =>
      import("@/components/renderless/AppOfflineManager"),
    AppNotificationUpdate: () =>
      import("@/components/layout/AppNotificationUpdate")
  },
  data() {
    return {
      geolocationReady: false,
      isStateReady: false,
      installer: undefined,
      isInstallerReady: false
    };
  },
  mixins: [androidBackButtonMixin],
  created() {
    this.setupPWAInstaller();

    this.$store._vm.$root.$on("storageReady", () => {
      this.isStateReady = true;
    });
  },
  methods: {
    onGeolocation() {
      this.geolocationReady = true;
    },
    onGeolocationError() {
      this.$buefy.toast.open({
        message: "No es posible geolocalizar la ubicación",
        type: "is-danger",
        duration: 4000
      });
    },
    //for now just Chrome
    setupPWAInstaller() {
      let installPrompt;
      window.addEventListener("beforeinstallprompt", e => {
        //Prevent Chrome 67 an earlier from automatically showing the prompt
        e.preventDefault();
        //Stash the event so it can be triggered later.
        installPrompt = e;
        // workaround (for mobiles) to prevent multiple events beforeinstallPrompt
        if (!this.isInstallerReady) {
          this.isInstallerReady = true;
          this.$buefy.dialog.confirm({
            title: "Instalar App",
            message: "¿Deseas instalar RíosConCienciApp en tu dispositivo?",
            cancelText: "No",
            confirmText: "Sí",
            type: "is-primary",
            onConfirm: () => {
              this.installer();
            },
            onCancel: () => {
              installPrompt = null;
            }
          });
        }
      });

      this.installer = () => {
        installPrompt.prompt();
        installPrompt = null;
      };
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
  grid-template-columns: minmax(300px, 1fr);
  height: 100%;
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

    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;

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
