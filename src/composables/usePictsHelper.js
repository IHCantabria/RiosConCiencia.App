import { ref, computed } from "vue";

export function usePictsHelper() {
  const helpActive = ref(false);

  const isHelpActive = computed(() => helpActive.value);

  const toggleHelp = () => {
    helpActive.value = !helpActive.value;
  };

  return {
    helpActive,
    isHelpActive,
    toggleHelp,
  };
}
