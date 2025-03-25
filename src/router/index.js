import { createRouter, createWebHistory } from "vue-router";
import AlbumPage from "../views/AlbumPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/albums",
    },
    {
      path: "/albums",
      name: "albums",
      component: AlbumPage,
    },
    {
      path: "/photos",
      name: "photos",
      component: () => import("../views/PhotoPage.vue"),
    },
  ],
});

export default router;
