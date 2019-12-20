import Vue from "vue";
import VueRouter from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "welcome",
    component: WelcomeView
  },
  {
    path: "/formfields",
    name: "formfields",
    component: () =>
      import(/* webpackChunkName: "formfields" */ "../views/FormView.vue")
  },
  {
    path: "/formpictos",
    name: "formpictos",
    component: () =>
      import(/* webpackChunkName: "formpictos" */ "../views/PictosView.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
