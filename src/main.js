import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

/* Global mixins */
import { datesHelperMixin } from "@/mixins/dates-helper.js";
Vue.mixin(datesHelperMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
