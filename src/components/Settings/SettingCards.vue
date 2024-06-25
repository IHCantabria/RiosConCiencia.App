<script setup>
import { ref } from "vue";
import { useSettingsStore } from "@/store/settingsStore.js";

// STORES & COMPOSABLES
const settingsStore = useSettingsStore();

// DATA
const menuOptions = ref([
  {
    id: 1,
    text: "Gestión de tramos",
  },
  {
    id: 2,
    text: "Gestión de usuarios",
  },
]);

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
      :class="
        settingsStore.selectedMenuOption?.id === option.id
          ? 'menu-option-selected'
          : 'menu-option'
      "
      @click="activeMenuOption(option)"
    >
      <span class="icon-circle">
        <img
          v-if="option.id === 1"
          src="@/assets/icons/sections-management.svg"
          alt="Option icon"
        />
        <img
          v-if="option.id === 2"
          src="@/assets/icons/users-management.svg"
          alt="Option icon"
        />
      </span>
      <span>{{ option.text }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workplace-container {
  height: 100%;
  display: flex;
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
}

.menu-option:hover {
  background-color: #f5f5f5;
}

.menu-option-selected {
  display: flex;
  width: 175px;
  height: 175px;
  padding: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: black;
  box-shadow: 8px 0 32px 0 rgb(0 0 0 / 15%);
  border-radius: 16px;
  cursor: pointer;
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

@media (min-width: app-variables.$breakpoint-tablet-to-desktop) {
  .workplace-container {
    flex-direction: column;
  }
}
</style>
