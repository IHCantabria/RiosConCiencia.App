<script setup>
import { ref, onBeforeMount } from "vue";
import { useSettingsStore } from "@/store/settingsStore.js";

// STORES & COMPOSABLES
const settingsStore = useSettingsStore();

// DATA
const menuOptions = ref([
  {
    id: 1,
    text: "Gestión de usuarios",
  },
  {
    id: 2,
    text: "Gestión de tramos",
  },
]);

// LYFECYCLE
onBeforeMount(() => {
  if (settingsStore.selectedMenuOption) return;
  settingsStore.selectedMenuOption = menuOptions.value[0];
});

// METHODS
const activeMenuOption = (option) => {
  settingsStore.selectedMenuOption = option;
};
</script>

<template>
  <div class="workplace-container">
    <div
      v-for="option in menuOptions"
      :key="option.id"
      class="menu-option"
      :class="
        settingsStore.selectedMenuOption?.id === option.id
          ? 'menu-option--selected'
          : ''
      "
      @click="activeMenuOption(option)"
    >
      <span class="icon-circle">
        <img
          v-if="option.id === 1"
          src="@/assets/icons/users-management.svg"
          alt="Option icon"
        />
        <img
          v-if="option.id === 2"
          src="@/assets/icons/sections-management.svg"
          alt="Option icon"
        />
      </span>
      <span class="text">{{ option.text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workplace-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-option {
  display: flex;
  width: 175px;
  height: 175px;
  padding: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  box-shadow: 8px 0 32px 0 rgb(0 0 0 / 15%);
  border-radius: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgb(235 235 235);
  }

  &--selected {
    background-color: app-variables.$color-primary-dark;
    color: white;

    &:hover {
      background-color: app-variables.$color-primary-dark;
    }
  }
}

.icon-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  font-size: 3rem;
  background-color: #f5f5f5;
}

@media (max-width: app-variables.$breakpoint-tablet-to-desktop) {
  .workplace-container {
    flex-direction: row;
    max-width: 90vw;
    margin-bottom: 1rem;
  }

  .menu-option {
    width: 100%;
    height: 65px;
    flex-direction: row;
    padding: 4px;
  }

  .icon-circle {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .text {
    font-size: 0.85rem;
  }
}
</style>
