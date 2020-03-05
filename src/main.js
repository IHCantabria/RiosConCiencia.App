import Vue from "vue";
import VueOffline from "vue-offline";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";

/** Icons pack (MDI-Material design icons) */
import "@mdi/font/css/materialdesignicons.css";

//Import Filters
import "./filters";

/** Global mixins */
import { datesHelperMixin } from "@/mixins/dates-helper.js";
import { onlineHelperMixin } from "@/mixins/online-helper.js";

Vue.mixin(datesHelperMixin);
Vue.mixin(onlineHelperMixin);

Vue.use(VueOffline, {
  mixin: true,
  storage: false
});
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
