<template>
  <div class="loading">
    <b-loading :active.sync="computedIsLoading"
      ><b-icon
        type="is-primary"
        icon="loading"
        size="is-large"
        class="spinnner"
      ></b-icon
    ></b-loading>
  </div>
</template>
<script>
export default {
  name: "Loading",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
      default: () => {
        return false;
      }
    }
  },
  computed: {
    computedIsLoading() {
      return this.isLoading;
    }
  }
};
</script>
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
