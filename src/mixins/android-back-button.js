export const androidBackButtonMixin = {
  mounted() {
    console.log("android back online");
    window.addEventListener("load", () => {
      window.history.pushState({}, "");
    });
    window.addEventListener("popstate", () => {
      window.history.pushState({}, "");
    });
    window.history.pushState(null, null, window.location.href);
    window.history.back();
    window.history.forward();
  }
};
