<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, ref, inject, nextTick, computed } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { DialogProgrammatic as Dialog } from "@fantage9/buefy-vue3";

import init from "@/components/FormExpert/FormInit.vue";
import basic from "@/components/FormExpert/FormBasic.vue";
import habitat from "@/components/FormExpert/FormHabitat.vue";
import ecoSystem from "@/components/FormExpert/FormEcosystem.vue";
import biological from "@/components/FormExpert/FormBiological.vue";
import health from "@/components/FormExpert/FormHealth.vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const formReady = ref(false);
const backbuttonPulsed = ref(false);

// COMPUTED
const computedBackbuttonPulsed = computed(() => backbuttonPulsed.value);

// LYFECYCLE
onMounted(() => {
  initFunction();
  // Verifica si el usuario está en un dispositivo móvil Android
  const isMobileAndroid = /Android/i.test(navigator.userAgent);

  if (isMobileAndroid) {
    window.addEventListener("popstate", handlePopState);
  }
});

const handlePopState = () => {
  backbuttonPulsed.value = true;
};

onBeforeRouteLeave(async (to) => {
  await nextTick();
  if (computedBackbuttonPulsed.value) {
    backbuttonPulsed.value = false;
    return false;
  }
  if (
    (to.path == "/" || to.path == "/about" || to.path == "/settings") &&
    (!appStore.formExpertSections.init.results ||
      Object.keys(appStore.formExpertSections.init.results).length !== 0) &&
    !computedBackbuttonPulsed.value
  ) {
    const leave = await confirmDialog();
    if (!leave) {
      return false;
    } else {
      appStore.formExpertSections.init.results = {};
      appStore.formExpertSent = false;
      return true;
    }
  }
  return true;
});

// METHODS
const initFunction = () => {
  appStore.formExpertSent = false;
  resetValidForms();
  appStore.setActiveForm(0); // ExpertForm
  appStore.setActiveSection(0);
  formReady.value = true;
};
const confirmDialog = () => {
  return new Promise((resolve) => {
    Dialog.confirm({
      title: "Formulario Incompleto",
      message:
        "¿Seguro que deseas abandonar esta sección? El formulario no ha sido completado y las respuestas actuales no estarán guardadas cuando vuelvas a entrar.",
      confirmText: "Confirmar",
      cancelText: "No abandonar",
      type: "is-danger",
      hasIcon: true,
      onCancel: () => resolve(false),
      onConfirm: () => resolve(true),
    });
  });
};

const resetValidForms = async () => {
  for (const name of Object.keys(appStore.formExpertSections)) {
    appStore.formExpertSections[name].isValid = false;
  }
};
</script>

<template>
  <div v-if="formReady" class="section">
    <div v-show="appStore.activeSectionName === 'init'">
      <KeepAlive>
        <init />
      </KeepAlive>
    </div>
    <div v-show="appStore.activeSectionName === 'basic'">
      <KeepAlive>
        <basic />
      </KeepAlive>
    </div>
    <div v-show="appStore.activeSectionName === 'habitat'">
      <KeepAlive>
        <habitat />
      </KeepAlive>
    </div>
    <div v-show="appStore.activeSectionName === 'ecoSystem'">
      <KeepAlive>
        <ecoSystem />
      </KeepAlive>
    </div>
    <div v-show="appStore.activeSectionName === 'biological'">
      <KeepAlive>
        <biological />
      </KeepAlive>
    </div>
    <div v-show="appStore.activeSectionName === 'health'">
      <KeepAlive>
        <health />
      </KeepAlive>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
