<script setup>
import { getPictsMasterData } from "@/api/riosconciencia.js";
import { useAppStore } from "@/store/appStore.js";
import { nextTick, onMounted } from "vue";

// STORES & COMPOSABLES
const appStore = useAppStore();

// EMITS
const emit = defineEmits(["data-load-ready", "data-load-error"]);

// LYFECYCLE
onMounted(async () => {
  await nextTick();
  init();
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
  const masterData = await getPictsMasterData(appStore.user.token);
  // prepare form data
  for (const name of Object.keys(masterData)) {
    masterData[name].isValid = false;
  }
  appStore.loadPictsFormData(masterData);
};
</script>

<template><div /></template>
