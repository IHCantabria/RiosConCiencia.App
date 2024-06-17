<script setup>
import { ref, onMounted } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import {
  ToastProgrammatic as Toast,
  DialogProgrammatic as Dialog,
} from "@fantage9/buefy-vue3";
import { useAppStore } from "@/store/appStore.js";

import info from "@/components/FormPicts/FormInfo.vue";
import flow from "@/components/FormPicts/FormFlow.vue";
import width from "@/components/FormPicts/FormWidth.vue";
import depth from "@/components/FormPicts/FormDepth.vue";
import temp from "@/components/FormPicts/FormTemp.vue";
import env from "@/components/FormPicts/FormEnv.vue";
import color from "@/components/FormPicts/FormColor.vue";
import smell from "@/components/FormPicts/FormSmell.vue";
import garbage from "@/components/FormPicts/FormGarbage.vue";
import plants from "@/components/FormPicts/FormPlants.vue";
import animals from "@/components/FormPicts/FormAnimals.vue";
import game from "@/components/FormPicts/FormGame.vue";
import AppDataLoader from "@/components/renderless/AppPictsDataLoader.vue";
import spinner from "@/components/LoadingComponent.vue";

// STORES & COMPOSABLES
const router = useRouter();
const appStore = useAppStore();

// LYFECYCLE
onMounted(() => {
  init();
});
onBeforeRouteLeave((to, from, next) => {
  //if the load master data fail let the router go back to main page
  if (!appStore.formPictsSections.width) {
    next();
    //if the user try to leave the form shwo a warm
  } else if (
    (to.path == "/" || to.path == "/about") &&
    Object.keys(appStore.formPictsSections.width.results).length !== 0
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

// METHODS
const onDataLoad = () => {
  dataReady.value = true;
};
const init = () => {
  appStore.setActiveForm(1); // PictsForm
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
  <div class="section">
    <AppDataLoader
      v-if="!appStore.isPictsDataLoaded"
      @data-load-ready="onDataLoad"
      @data-load-error="onDataLoadError"
    />
    <template v-else>
      <KeepAlive>
        <info v-show="appStore.activeSectionName === 'info'" />
      </KeepAlive>
      <KeepAlive>
        <flow v-show="appStore.activeSectionName === 'flow'" />
      </KeepAlive>
      <KeepAlive>
        <width v-show="appStore.activeSectionName === 'width'" />
      </KeepAlive>
      <KeepAlive>
        <depth v-show="appStore.activeSectionName === 'depth'" />
      </KeepAlive>
      <KeepAlive>
        <temp v-show="appStore.activeSectionName === 'temp'" />
      </KeepAlive>
      <KeepAlive>
        <env v-show="appStore.activeSectionName === 'env'" />
      </KeepAlive>
      <KeepAlive>
        <color v-show="appStore.activeSectionName === 'color'" />
      </KeepAlive>
      <KeepAlive>
        <smell v-show="appStore.activeSectionName === 'smell'" />
      </KeepAlive>
      <KeepAlive>
        <garbage v-show="appStore.activeSectionName === 'garbage'" />
      </KeepAlive>
      <KeepAlive>
        <plants v-show="appStore.activeSectionName === 'plants'" />
      </KeepAlive>
      <KeepAlive>
        <animals v-show="appStore.activeSectionName === 'animals'" />
      </KeepAlive>
      <KeepAlive>
        <game v-show="appStore.activeSectionName === 'game'" />
      </KeepAlive>
    </template>
    <spinner
      v-if="!appStore.isPictsDataLoaded"
      :is-loading="!dataReady"
    ></spinner>
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
