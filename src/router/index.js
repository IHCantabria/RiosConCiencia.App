import { createRouter, createWebHashHistory } from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";
import LoginView from "../views/LoginView.vue";
import { useAppStore } from "../store/appStore";
import { inject } from "vue";

const routes = [
  {
    path: "/",
    name: "welcome",
    beforeEnter: (to, from, next) => {
      const appStore = useAppStore();
      !appStore.userIsLogged ? next({ name: "login" }) : next();
    },
    component: WelcomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/formexpert",
    name: "formexpert",
    beforeEnter: (to, from, next) => {
      const appStore = useAppStore();
      !appStore.userIsLogged ? next({ name: "login" }) : next();
      appStore.userCanDoExpertForm ? next() : next(false);
    },
    component: () => import("../views/FormView.vue"),
  },
  {
    path: "/formpicts",
    name: "formpicts",
    beforeEnter: (to, from, next) => {
      const appStore = useAppStore();
      !appStore.userIsLogged ? next({ name: "login" }) : next();
      appStore.userCanDoPictsForm ? next() : next(false);
    },
    component: () => import("../views/PictsView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// const waitForStorageToBeReady = async (to, from, next) => {
//   const appStore = useAppStore();
//   // TODO: Check this for pinia
//   await appStore.restored;
//   next();
// };

router.beforeEach((to, from, next) => {
  const backbuttonPulsed = inject("$backbuttonPulsed");
  // waitForStorageToBeReady();
  if (!backbuttonPulsed.value) {
    next();
  } else {
    next(false);
    backbuttonPulsed.value = false;
  }
});

export default router;
