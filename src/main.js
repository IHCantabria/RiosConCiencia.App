import { createApp } from "vue";
import { createPinia } from "pinia";
import Buefy from "@fantage9/buefy-vue3";
import App from "./App.vue";
import router from "./router";
import { mobileEventsPlugin } from "./plugins/mobileEventsPlugin";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { registerSW } from "virtual:pwa-register";
import "@mdi/font/css/materialdesignicons.css";
import { useAppStore } from "./store/appStore";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = router;
});
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(mobileEventsPlugin).use(router).use(Buefy).mount("#app");
const appStore = useAppStore();

const updateSW = registerSW({
  inmediate: true,
  onNeedRefresh() {
    updateSW();
  },
  onRegistered(r) {
    r &&
      r.addEventListener("updatefound", () => {
        const newWorker = r.installing;
        newWorker &&
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                appStore.setDefaultStateStore();
                window.location.reload();
              }
            }
          });
      });
  },
});
