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
    path: "/formexpert",
    name: "formexpert",
    beforeEnter: (to, from, next) => {
      !store.getters.userIsLogged ? next({ name: "login" }) : next();
      store.getters.userCanDoExpertForm ? next() : next(false);
    },
    component: () =>
      import(/* webpackChunkName: "formexpert" */ "../views/FormView.vue")
  },
  {
    path: "/formpicts",
    name: "formpicts",
    beforeEnter: (to, from, next) => {
      !store.getters.userIsLogged ? next({ name: "login" }) : next();
      store.getters.userCanDoPictsForm ? next() : next(false);
    },
    component: () =>
      import(/* webpackChunkName: "formpicts" */ "../views/PictsView.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue")
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

//avoid vuex restore override after update in async
const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored;
  next();
};

router.beforeEach(waitForStorageToBeReady);

export default router;
