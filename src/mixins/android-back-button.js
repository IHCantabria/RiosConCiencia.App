export const androidBackButtonMixin = {
  mounted() {
    window.addEventListener("popstate", () => {
      this.$root.$emit("backbutton");
    });
  }
};
