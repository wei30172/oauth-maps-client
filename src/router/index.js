import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import ProfileView from "@/views/ProfileView.vue";
import MapView from "@/views/MapView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      guest: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      auth: true,
    },
  },
  {
    path: "/map",
    name: "map",
    component: MapView,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authOnly = to.matched.some((record) => record.meta.auth);
  const guestOnly = to.matched.some((record) => record.meta.guest);
  const user = store.state.user;
  if (authOnly) {
    if (!user) {
      next("/login");
    } else {
      next();
    }
  } else if (guestOnly) {
    if (user) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
