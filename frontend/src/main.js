import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "vue-query";
import Toast, { POSITION } from "vue-toastification";
import { vfmPlugin } from "vue-final-modal";

import App from "./App.vue";
import { routes } from "@/router";
import { isAuthenticated } from "@/utils/auth-util";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

app.use(router);
app.use(createPinia());
app.use(VueQueryPlugin);
app.use(Toast, {
  // Setting the global default position
  position: POSITION.BOTTOM_RIGHT,
});
app.use(vfmPlugin);

app.mount("#app");
