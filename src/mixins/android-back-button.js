export const androidBackButtonMixin = {
  mounted() {
    console.log("android back online");
    window.addEventListener("load", function() {
      window.history.pushState({ noBackExitsApp: true }, "");
    });
    window.addEventListener("popstate", function(event) {
      if (event.state && event.state.noBackExitsApp) {
        window.history.pushState({ noBackExitsApp: true }, "");
      }
    });
    window.history.pushState(null, null, window.location.href);
    window.history.back();
    window.history.forward();
  }
};
