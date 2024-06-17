<script setup>
import { computed } from "vue";
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: () => {
      return false;
    },
  },
});
const computedIsLoading = computed(() => {
  return props.isLoading;
});
</script>

<template>
  <div class="loading">
    <b-loading v-model="computedIsLoading"
      ><b-icon
        type="is-primary"
        icon="loading"
        size="is-large"
        class="spinnner"
      ></b-icon
    ></b-loading>
  </div>
</template>

<style lang="scss" scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.spinnner {
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
