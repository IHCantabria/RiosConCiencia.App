<script setup>
import { ref, onMounted, watch } from "vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import { useGeoLoader } from "@/composables/useGeoLoader.js";
import {
  ToastProgrammatic as Toast,
  DialogProgrammatic as Dialog,
} from "@fantage9/buefy-vue3";
import { useOfflineManager } from "@/composables/useOfflineManager.js";

// COMPOSABLES & STORES
const { isGeoDataReady, geoDataError } = useGeoLoader();
useOfflineManager();

// DATA
const geolocationReady = ref(false);
const isInstallerReady = ref(false);

// LIFECYCLE
onMounted(() => {
  setupPWAInstaller();
});

// METHODS
const onGeolocation = () => {
  geolocationReady.value = true;
};
const onGeolocationError = () => {
  Toast.open({
    message: "No es posible geolocalizar la ubicación",
    type: "is-danger",
    duration: 4000,
  });
};
//for now just Chrome
const setupPWAInstaller = () => {
  let installPrompt;
  const installer = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt = null;
    }
  };

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installPrompt = e;
    if (!isInstallerReady.value) {
      isInstallerReady.value = true;
      Dialog.confirm({
        title: "Instalar App",
        message: "¿Deseas instalar RíosConCienciApp en tu dispositivo?",
        cancelText: "No",
        confirmText: "Sí",
        type: "is-primary",
        onConfirm: () => {
          installer();
        },
        onCancel: () => {
          installPrompt = null;
        },
      });
    }
  });
};

// WATCHERS
watch(isGeoDataReady, (value) => {
  if (value) {
    onGeolocation();
  }
});
watch(geoDataError, (value) => {
  if (value !== null) {
    onGeolocationError();
  }
});
</script>

<template>
  <div class="app grid-container">
    <header class="app__header">
      <TheHeader />
    </header>
    <main class="app__main">
      <router-view />
    </main>
    <footer class="app__footer">
      <TheFooter />
    </footer>
  </div>
</template>

<style lang="scss">
@use "@/styles";

/* Layout */
.grid-container {
  position: relative;
  display: grid;
  grid-template:
    "header"
    "main"
    "footer";
  grid-template-rows: app-variables.$header-height 1fr app-variables.$footer-height;
  grid-template-columns: minmax(300px, 1fr);
  height: 100%;
  overflow-x: hidden;
}

.app {
  font-family: app-variables.$app-font;
  font-size: app-variables.$app-font-size;
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
    box-shadow:
      0 4px 8px 0 rgb(0 0 0 / 20%),
      0 6px 20px 0 rgb(0 0 0 / 19%);
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
    color: app-variables.$font-color-medium;

    &.router-link-exact-active {
      color: app-variables.$color-primary;
    }
  }
}

// hack to avoid buefy step controller hide on mobile
@media screen and (width <= 768px) {
  .b-steps .steps.is-small .step-items .step-item:not(.is-active) {
    /* stylelint-disable-next-line declaration-no-important */
    display: block !important;
  }

  .b-steps .steps.is-small .step-items .step-item:not(:first-child)::before,
  .b-steps .steps.is-small .step-items .step-item:only-child::before {
    /* stylelint-disable-next-line declaration-no-important */
    height: 0.2em !important;
    /* stylelint-disable-next-line declaration-no-important */
    width: 100% !important;
    /* stylelint-disable-next-line declaration-no-important */
    bottom: 0 !important;
    /* stylelint-disable-next-line declaration-no-important */
    left: -50% !important;
    /* stylelint-disable-next-line declaration-no-important */
    top: 0.75rem !important;
  }
}
</style>
