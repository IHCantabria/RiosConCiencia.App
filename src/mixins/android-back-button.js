export const androidBackButtonMixin = {
  mounted() {
    document.addEventListener(
      "backbutton",
      function(e) {
        e.preventDefault();
      },
      false
    );
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", function() {}, false);
  }
};
