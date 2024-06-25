<script setup>
import { ref, onBeforeMount } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import SettingCards from "@/components/Settings/SettingCards.vue";
import SettingSections from "../components/Settings/SettingSections.vue";
import SettingUsers from "../components/Settings/SettingUsers.vue";
import { useSettingsStore } from "@/store/settingsStore.js";
import { useSettingsDataLoader } from "@/composables/useSettingsDataLoader.js";
import loading from "@/components/LoadingComponent.vue";
import { useDataLoader } from "@/composables/useDataLoader.js";

// STORES & COMPOSABLES
const settingsStore = useSettingsStore();
const { initDataLoader } = useSettingsDataLoader();
const { updateRiverSections } = useDataLoader();

// DATA
const isDataLoading = ref(false);

// LIFECYCLE
onBeforeMount(async () => {
  if (settingsStore.isDataReady) return;
  init();
});
onBeforeRouteLeave(async () => {
  await updateRiverSections();
  return true;
});

// METHODS
const init = async () => {
  try {
    isDataLoading.value = true;
    await initDataLoader();
  } catch (error) {
    console.error(error);
  } finally {
    isDataLoading.value = false;
  }
};
</script>

<template>
  <div class="settings-view">
    <h3 class="title">Gestión</h3>
    <div class="content">
      <SettingCards class="content__cards" />
      <div v-if="settingsStore.isDataReady" class="content__settings">
        <SettingSections v-if="settingsStore.selectedMenuOption?.id === 1" />
        <SettingUsers v-if="settingsStore.selectedMenuOption?.id === 2" />
      </div>
      <loading :is-loading="isDataLoading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-view {
  height: 100%;

  .title {
    font-size: 2rem;
    font-weight: 500;
    text-align: start;
    margin: 0.5rem 1.5rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;

    &__cards {
      order: 1;
    }

    &__settings {
      order: 2;
      width: 100%;
      height: 100%;
      padding: 0 2rem;
    }

    @media (min-width: app-variables.$breakpoint-tablet-to-desktop) {
      display: grid;
      grid-template-columns: auto 1fr;

      &__cards {
        grid-column: 1 / 2;
        left: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        height: 100%;
        margin-left: 3rem;
      }

      &__settings {
        grid-column: 2 / 3;
      }
    }
  }
}
</style>
