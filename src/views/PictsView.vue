<script setup>
import { onMounted, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { DialogProgrammatic as Dialog } from "@fantage9/buefy-vue3";
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

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const formReady = ref(false);

// LYFECYCLE
onMounted(() => {
  appStore.pictsFormSent = false;
  init();
});
onBeforeRouteLeave(async (to) => {
  if (
    (to.path == "/" || to.path == "/about") &&
    (!appStore.formPictsSections.width.results ||
      Object.keys(appStore.formPictsSections.width.results).length !== 0)
  ) {
    const leave = await confirmDialog();
    if (!leave) {
      return false;
    } else {
      appStore.formPictsSections.width.results = {};
      appStore.pictsFormSent = false;
      return { name: to.name };
    }
  }
  return true;
});

// METHODS
const init = () => {
  resetValidForms();
  appStore.setActiveForm(1); // PictsForm
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
  for (const name of Object.keys(appStore.formPictsSections)) {
    appStore.formPictsSections[name].isValid = false;
  }
};
</script>

<template>
  <div v-if="formReady" class="section">
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
