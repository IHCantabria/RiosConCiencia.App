export const androidBackButtonMixin = {
  mounted() {
    console.log("android back online");
    window.addEventListener("load", () => {
      history.pushState(null, null, location.href);
      history.back();
      history.forward();
    });

    window.addEventListener("popstate", () => {
      history.go(1);
    });
  }
};
