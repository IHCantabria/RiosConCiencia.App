import { createApp } from "vue";
import { createPinia } from "pinia";
import Buefy from "@fantage9/buefy-vue3";
import FloatingVue from "floating-vue";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// eslint-disable-next-line import/no-unresolved
import { registerSW } from "virtual:pwa-register";
import "@mdi/font/css/materialdesignicons.css";
import { useAppStore } from "./store/appStore";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = router;
});
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(router).use(Buefy).use(FloatingVue).mount("#app");
const appStore = useAppStore();

// TODO: Change intervalMS to 30 minutes
const intervalMS = 5000;
registerSW({
  inmediate: true,
  onRegisteredSW(swUrl, r) {
    r &&
      setInterval(async () => {
        if (r.installing || !navigator) return;
        if ("connection" in navigator && !navigator.onLine) return;
        const resp = await fetch(swUrl, {
          cache: "no-store",
          headers: {
            cache: "no-store",
            "cache-control": "no-cache",
          },
        });
        if (resp?.status === 200) await r.update();
      }, intervalMS);
  },
  onOfflineReady() {
    appStore.logout();
  },
});
