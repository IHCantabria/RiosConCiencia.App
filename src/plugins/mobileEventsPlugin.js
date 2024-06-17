import { ref } from "vue";

export const mobileEventsPlugin = {
  install: (app) => {
    const backbuttonPulsed = ref(false);

    app.provide("$backbuttonPulsed", backbuttonPulsed);

    const handlePopState = () => {
      backbuttonPulsed.value = true;
    };

    window.addEventListener("popstate", handlePopState);
  },
};
