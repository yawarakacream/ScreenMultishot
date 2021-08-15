import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/frame",
    name: "Frame",
    component: () => import("./frame/FrameRenderer.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import("./menu/MenuRenderer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
