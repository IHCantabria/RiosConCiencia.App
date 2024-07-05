import { createRouter, createWebHashHistory } from "vue-router";
import { useAppStore } from "../store/appStore";
import { inject } from "vue";

const routes = [
  {
    path: "/",
    name: "welcome",
    beforeEnter: () => {
      const appStore = useAppStore();
      if (!appStore.userIsLogged) {
        return { name: "login" };
      }
    },
    component: () => import("../views/WelcomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/formexpert",
    name: "formexpert",
    beforeEnter: () => {
      const appStore = useAppStore();

      if (!appStore.userIsLogged || !appStore.isExpertDataLoaded) {
        return { name: "login" };
      } else if (!appStore.userCanDoExpertForm) {
        return false;
      }
    },
    component: () => import("../views/FormView.vue"),
  },
  {
    path: "/formpicts",
    name: "formpicts",
    beforeEnter: () => {
      const appStore = useAppStore();
      //  same with isPictsDataLoaded
      if (!appStore.userIsLogged || !appStore.isExpertDataLoaded) {
        return { name: "login" };
      } else if (!appStore.userCanDoPictsForm) {
        return false;
      }
    },
    component: () => import("../views/PictsView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/SettingsView.vue"),
    // before enter
    beforeEnter: () => {
      const appStore = useAppStore();
      if (!appStore.userHasSettingsAccess) {
        return { name: "login" };
      }
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  const backbuttonPulsed = inject("$backbuttonPulsed");
  if (backbuttonPulsed.value) {
    backbuttonPulsed.value = false;
    return false;
  }
});

export default router;
