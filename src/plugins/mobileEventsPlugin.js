import { ref } from "vue";

export const mobileEventsPlugin = {
  install: (app) => {
    const backbuttonPulsed = ref(false);

    app.provide("$backbuttonPulsed", backbuttonPulsed);

    const handlePopState = () => {
      alert("handlePopState");
      backbuttonPulsed.value = true;
    };

    // Verifica si el usuario está en un dispositivo móvil
    const isMobileAndroid = /Android/i.test(navigator.userAgent);

    alert("isMobileAndroid: " + isMobileAndroid);

    if (isMobileAndroid) {
      window.addEventListener("popstate", handlePopState);
    }
  },
};
