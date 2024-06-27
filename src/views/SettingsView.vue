<script setup>
import { ref, onBeforeMount } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import SettingCards from "@/components/Settings/SettingCards.vue";
import SettingRiverSections from "../components/Settings/SettingRiverSections.vue";
import SettingUsers from "../components/Settings/SettingUsers.vue";
import { useSettingsStore } from "@/store/settingsStore.js";
import { useSettingsDataLoader } from "@/composables/useSettingsDataLoader.js";
import loading from "@/components/LoadingComponent.vue";
import { useDataLoader } from "@/composables/useDataLoader.js";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";

// STORES & COMPOSABLES
const settingsStore = useSettingsStore();
const router = useRouter();
const { initSettingsDataLoader } = useSettingsDataLoader();
const { updateRiverSections } = useDataLoader();

// DATA
const isDataLoading = ref(false);

// LIFECYCLE
onBeforeMount(async () => {
  if (settingsStore.isDataReady) return;
  init();
});
onBeforeRouteLeave(async () => {
  if (settingsStore.hasAdminUserRiverSectionsChanged) {
    await updateRiverSections();
    settingsStore.hasAdminUserRiverSectionsChanged = false;
  }
  return true;
});

// METHODS
const init = async () => {
  try {
    isDataLoading.value = true;
    await initSettingsDataLoader();
  } catch (error) {
    console.error(error);
    Toast.open({
      message: "Error loading data",
      type: "is-danger",
    });
    router.push({ name: "welcome" });
  } finally {
    isDataLoading.value = false;
  }
};
</script>

<template>
  <div class="settings-view">
    <div class="content">
      <SettingCards class="content__cards" />
      <div v-if="settingsStore.isDataReady" class="content__settings">
        <SettingRiverSections
          v-if="settingsStore.selectedMenuOption?.id === 1"
        />
        <SettingUsers v-if="settingsStore.selectedMenuOption?.id === 2" />
      </div>
      <loading :is-loading="isDataLoading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings-view {
  height: 100%;
  padding-top: 2rem;

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
../components/Settings/SettingRiverSections.vue
