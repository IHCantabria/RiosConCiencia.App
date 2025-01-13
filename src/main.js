import { createApp } from "vue";
import { createPinia } from "pinia";
import Buefy, { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import FloatingVue from "floating-vue";
import App from "./App.vue";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueMatomo from "vue-matomo";

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

app
  .use(VueMatomo, {
    host: "https://analytics.ihcantabria.com/",
    siteId: 20,
  })
  .use(pinia)
  .use(router)
  .use(Buefy)
  .use(FloatingVue)
  .mount("#app");
const appStore = useAppStore();

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
        if (resp?.status === 200) {
          await r.update();
          // Check if a new service worker is being installed
          if (r.installing) {
            console.log("A new service worker is installing...");

            // Wait for the installing service worker to complete installation
            const newWorker = r.installing;

            newWorker.onstatechange = async function () {
              console.log("New service worker state:", this.state);

              // When the service worker is installed, move to next step
              if (this.state === "installed") {
                console.log(
                  "New service worker installed, skipping waiting...",
                );
                r.addEventListener("install", () => {
                  console.log("B Service Worker installing...");
                  self.skipWaiting(); // Immediately activate the new service worker
                });
                r.addEventListener("activate", (event) => {
                  console.log("B Service Worker activating...");
                  event.waitUntil(self.clients.claim()); // Claim control of the clients
                });
                r.addEventListener("message", (event) => {
                  console.log("B Service Worker message");
                  if (event.data && event.data.action === "skipWaiting") {
                    console.log("B Service Worker skipWaiting");
                    self.skipWaiting();
                  }
                });

                // Force the new worker to activate immediately by calling skipWaiting
                await newWorker.postMessage({ action: "skipWaiting" });

                // Force the new service worker to take control immediately
                await navigator.serviceWorker.ready;
                r.active.postMessage({ action: "claim" });

                // Now that the new service worker is active, call the method
                ClearPersistenceData();
              } else {
                console.log("Service Worker not installed...");
              }
            };
          }
        }
      }, intervalMS);
  },
});

navigator.serviceWorker.controller?.addEventListener("install", () => {
  console.log("A Service Worker installing...");
  self.skipWaiting(); // Immediately activate the new service worker
});

navigator.serviceWorker.controller?.addEventListener("activate", (event) => {
  console.log("A Service Worker activating...");
  event.waitUntil(self.clients.claim()); // Claim control of the clients
});

navigator.serviceWorker.controller?.addEventListener("message", (event) => {
  console.log("A Service Worker message");
  if (event.data && event.data.action === "skipWaiting") {
    console.log("A Service Worker skipWaiting");
    self.skipWaiting();
  }
});

function ClearPersistenceData() {
  console.log("Limpio datos de persistencia y me deslogueo");
  appStore.logout();
  Toast.open({
    message: "Se ha actualizado la versión de la aplicación",
    type: "is-info",
    duration: 4000,
  });
}
