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
  updated() {
    console.log("New content is available; please refresh.");
    const registration = navigator.serviceWorker.register();
    EventBus.$on("launch_update", () => {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        location.reload();
      });
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
