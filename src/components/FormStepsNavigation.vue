<script setup>
import { computed, ref } from "vue";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();

// DATA
const stepItemCfg = ref({
  isStepsClickable: true,
  isAnimated: true,
  hasNavigation: true,
  mobileMode: null,
  customNavigation: true,
  prevIcon: "chevron-left",
  nextIcon: "chevron-right",
  isProfileSuccess: true,
});

// COMPUTED
const stepControl = computed({
  get: () => {
    return appStore.activeSectionId;
  },
  set: (value) => {
    window.scrollTo(0, 0); // go to init page when change the stepNavigator
    appStore.setActiveSection(value);
  },
});

const sections = computed(() => {
  return appStore.activeFormId == 0
    ? appStore.formExpertSections
    : appStore.formPictsSections;
});
</script>

<template>
  <b-steps
    v-model="stepControl"
    size="is-small"
    :mobile-mode="stepItemCfg.mobileMode"
    :animated="stepItemCfg.isAnimated"
    :has-navigation="stepItemCfg.hasNavigation"
  >
    <b-step-item
      v-for="(section, index) in Object.keys(sections)"
      :key="index"
      :label="index.toString()"
      :clickable="stepItemCfg.isStepsClickable"
      :type="sections[section].isValid ? 'is-success' : 'is-danger'"
    >
    </b-step-item>

    <template
      v-if="stepItemCfg.customNavigation"
      #navigation="{ previous, next }"
    >
      <div class="custom-nav-buttons">
        <b-button
          type="is-primary"
          icon-pack="mdi"
          icon-left="less-than"
          :disabled="appStore.isFirstSection"
          @click.prevent="previous.action"
          >Anterior
        </b-button>
        <b-button
          type="is-primary"
          icon-pack="mdi"
          icon-right="greater-than"
          :disabled="appStore.isLastSection(sections)"
          @click.prevent="next.action"
        >
          Siguiente
        </b-button>
      </div>
    </template>
  </b-steps>
</template>

<style lang="scss" scoped>
.custom-nav-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
