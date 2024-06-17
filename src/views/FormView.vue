<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import {
  ToastProgrammatic as Toast,
  DialogProgrammatic as Dialog,
} from "@fantage9/buefy-vue3";

import init from "@/components/FormExpert/FormInit.vue";
import basic from "@/components/FormExpert/FormBasic.vue";
import spills from "@/components/FormExpert/FormSpills.vue";
import waste from "@/components/FormExpert/FormWaste.vue";
import habitat from "@/components/FormExpert/FormHabitat.vue";
import ecoSystem from "@/components/FormExpert/FormEcosystem.vue";
import biological from "@/components/FormExpert/FormBiological.vue";
import riverQuality from "@/components/FormExpert/FormRiverQuality.vue";
import ecoResult from "@/components/FormExpert/FormEcoResult.vue";
import AppExpertDataLoader from "@/components/renderless/AppExpertDataLoader.vue";
import spinner from "@/components/LoadingComponent.vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();
const router = useRouter();

onBeforeRouteLeave((to, from, next) => {
  //if the load master data fail let the router go back to main page
  if (!appStore.formSections.init) {
    next();
    //if the user try to leave the form shwo a warm
  } else if (
    (to.path == "/" || to.path == "/about") &&
    Object.keys(appStore.formSections.init.results).length !== 0
  ) {
    Dialog.confirm({
      title: "Formulario Incompleto",
      message:
        "¿Seguro que deseas abandonar esta sección? El formulario no ha sido completado y las respuestas actuales no estarán guardadas cuando vuelvas a entrar.",
      confirmText: "Confirmar",
      cancelText: "No abandonar",
      type: "is-danger",
      hasIcon: true,
      onCancel: () => next(false),
      onConfirm: () => next(),
    });
  } else {
    next();
  }
});

// DATA
const dataReady = ref(false);

// LYFECYCLE
onMounted(() => {
  initFunction();
});

const onDataLoad = () => {
  dataReady.value = true;
};
const initFunction = () => {
  appStore.setActiveForm(0); // ExpertForm
  appStore.setActiveSection(0);
};
const onDataLoadError = () => {
  //dataReady switch to hide spinner
  dataReady.value = true;
  const error = appStore.isOnline
    ? "No ha sido posible cargar datos maestros del formulario. El servidor está caído."
    : " No es posible cargar datos maestros del formulario si no dispones de conexión a internet.";
  Toast.open({
    message: error,
    type: "is-danger",
    duration: 4000,
  });
  dataReady.value = false;
  router.push("/");
};
</script>

<template>
  <component :is="'FormInit'" />
  <div class="section">
    <AppExpertDataLoader
      v-if="!appStore.isExpertDataLoaded"
      @data-load-ready="onDataLoad"
      @data-load-error="onDataLoadError"
    />
    <template v-else>
      <KeepAlive>
        <init v-if="appStore.activeSectionName === 'init'" />
      </KeepAlive>
      <KeepAlive>
        <basic v-if="appStore.activeSectionName === 'basic'" />
      </KeepAlive>
      <KeepAlive>
        <spills v-if="appStore.activeSectionName === 'spills'" />
      </KeepAlive>
      <KeepAlive>
        <waste v-if="appStore.activeSectionName === 'waste'" />
      </KeepAlive>
      <KeepAlive>
        <habitat v-if="appStore.activeSectionName === 'habitat'" />
      </KeepAlive>
      <KeepAlive>
        <ecoSystem v-if="appStore.activeSectionName === 'ecoSystem'" />
      </KeepAlive>
      <KeepAlive>
        <biological v-if="appStore.activeSectionName === 'biological'" />
      </KeepAlive>
      <KeepAlive>
        <riverQuality v-if="appStore.activeSectionName === 'riverQuality'" />
      </KeepAlive>
      <KeepAlive>
        <ecoResult v-if="appStore.activeSectionName === 'ecoResult'" />
      </KeepAlive>
    </template>
    <spinner v-if="!appStore.isExpertDataLoaded" :is-loading="!dataReady" />
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
