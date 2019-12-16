import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

/** Icons pack (MDI-Material design icons) */
import "@mdi/font/css/materialdesignicons.css";

/** Global mixins */
import { datesHelperMixin } from "@/mixins/dates-helper.js";
Vue.mixin(datesHelperMixin);

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
