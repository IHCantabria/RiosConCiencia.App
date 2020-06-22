/* eslint-disable no-console */
import EventBus from "./utils/event-bus";
import { register } from "register-service-worker";

register(`${process.env.BASE_URL}service-worker.js`, {
  ready() {
    console.log(
      "App is being served from cache by a service worker.\n" +
        "For more details, visit https://goo.gl/AFskqB"
    );
  },
  registered() {
    console.log("Service worker has been registered.");
  },
  cached() {
    console.log("Content has been cached for offline use.");
  },
  updatefound() {
    console.log("New content is downloading.");
  },
  updated(registration) {
    console.log("New content is available; please refresh.");
    EventBus.$on("launch_update", () => {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    });
    EventBus.$emit("update_available");
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  }
});

var refreshing;
navigator.serviceWorker.addEventListener("controllerchange", async () => {
  if (refreshing) return;
  await clearCache(); //clear cache
  EventBus.$emit("clear_store"); //clear store
  location.reload();
  refreshing = true;
});

//Clear all the cache after update
const clearCache = async () => {
  await caches.keys().then(function(keyList) {
    return Promise.all(
      keyList.map(function(key) {
        return caches.delete(key);
      })
    );
  });
};
