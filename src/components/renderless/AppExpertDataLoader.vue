<script setup>
import { onMounted, nextTick } from "vue";
import { getExpertMasterData } from "@/api/riosconciencia.js";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// EMITS
const emit = defineEmits(["data-load-ready", "data-load-error"]);

// LYFECYCLE
onMounted(async () => {
  await nextTick();
  if (appStore.user.token) init();
});

// METHODS
const init = async () => {
  try {
    await initForm();
    emit("data-load-ready");
  } catch (e) {
    emit("data-load-error", `Error loading data. Detail: ${e}`);
  }
};

const initForm = async () => {
  const masterData = await getExpertMasterData(appStore.user.token);
  // prepare form data
  for (const name of Object.keys(masterData)) {
    masterData[name].isValid = false;
  }
  appStore.loadExpertFormData(masterData);
};
</script>

<template><div /></template>
