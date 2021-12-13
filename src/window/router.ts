import { isDevelopment } from "@/utility";
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";

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
  history: isDevelopment ? createWebHistory() : createWebHashHistory(),
  routes,
});

export default router;
