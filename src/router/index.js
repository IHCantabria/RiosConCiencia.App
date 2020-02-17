import Vue from "vue";
import VueRouter from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";
import LoginView from "../views/LoginView.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "welcome",
    beforeEnter: (to, from, next) => {
      console.log("welcome");
      !store.getters.userIsLogged ? next({ name: "login" }) : next();
    },
    component: WelcomeView
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/formfields",
    name: "formfields",
    beforeEnter: (to, from, next) => {
      !store.getters.userIsLogged ? next({ name: "login" }) : next();
    },
    component: () =>
      import(/* webpackChunkName: "formfields" */ "../views/FormView.vue")
  },
  {
    path: "/formpictos",
    name: "formpictos",
    beforeEnter: (to, from, next) => {
      !store.getters.userIsLogged ? next({ name: "login" }) : next();
    },
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
