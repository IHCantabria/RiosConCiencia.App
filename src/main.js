import { createApp } from "vue";
import { createPinia } from "pinia";
import Buefy from "@fantage9/buefy-vue3";
import FloatingVue from "floating-vue";
import App from "./App.vue";
import router from "./router";
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

app.use(pinia).use(router).use(Buefy).use(FloatingVue).mount("#app");
const appStore = useAppStore();

const updateSW = registerSW({
  immediate: true,
  onOfflineReady() {
    console.log("onOfflineReady");
  },
  onNeedRefresh() {
    console.log("onNeedRefresh");
    appStore.setDefaultStateStore();
    updateSW();
  },
});
