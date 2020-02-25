export const routeGuardMixin = {
  mounted() {
    this.$root.$on("backbutton", () => {
      this.backbuttonPulsed = true;
    });
  },
  data() {
    return {
      backbuttonPulsed: false
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$nextTick(() => {
      if (!this.computedbackButtonPulsed) {
        next();
      } else {
        next(false);
        this.backbuttonPulsed = false;
      }
    });
  },
  computed: {
    computedbackButtonPulsed() {
      return this.backbuttonPulsed;
    }
  }
};
