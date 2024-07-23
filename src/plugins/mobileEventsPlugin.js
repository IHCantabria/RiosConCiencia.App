import { ref } from "vue";

export const mobileEventsPlugin = {
  install: (app) => {
    const backbuttonPulsed = ref(false);

    app.provide("$backbuttonPulsed", backbuttonPulsed);

    const handlePopState = (event) => {
      alert("handlepopstate before preventdefault");
      event.preventDefault();
      alert("handlepopstate after preventdefault");
      backbuttonPulsed.value = true;
      window.history.pushState(null, null, window.location.pathname); // Evita retroceder
    };

    // Verifica si el usuario está en un dispositivo móvil Android
    const isMobileAndroid = /Android/i.test(navigator.userAgent);

    if (isMobileAndroid) {
      window.addEventListener("popstate", handlePopState);
    }
  },
};
