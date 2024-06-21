<!-- eslint-disable no-unused-vars -->
<script setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { DialogProgrammatic as Dialog } from "@fantage9/buefy-vue3";

import init from "@/components/FormExpert/FormInit.vue";
import basic from "@/components/FormExpert/FormBasic.vue";
import habitat from "@/components/FormExpert/FormHabitat.vue";
import ecoSystem from "@/components/FormExpert/FormEcosystem.vue";
import biodiversity from "@/components/FormExpert/FormBioDiversity.vue";
import health from "@/components/FormExpert/FormHealth.vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const formReady = ref(false);

// LYFECYCLE
onMounted(() => {
  initFunction();
});

onBeforeRouteLeave(async (to) => {
  if (
    (to.path == "/" || to.path == "/about") &&
    (!appStore.formExpertSections.init.results ||
      Object.keys(appStore.formExpertSections.init.results).length !== 0)
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
    <KeepAlive>
      <init v-show="appStore.activeSectionName === 'init'" />
    </KeepAlive>
    <KeepAlive>
      <basic v-show="appStore.activeSectionName === 'basic'" />
    </KeepAlive>
    <KeepAlive>
      <habitat v-show="appStore.activeSectionName === 'habitat'" />
    </KeepAlive>
    <KeepAlive>
      <ecoSystem v-show="appStore.activeSectionName === 'ecoSystem'" />
    </KeepAlive>
    <KeepAlive>
      <biodiversity v-show="appStore.activeSectionName === 'biodiversity'" />
    </KeepAlive>
    <KeepAlive>
      <health v-show="appStore.activeSectionName === 'health'" />
    </KeepAlive>
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
