import { createRouter, createWebHistory } from "vue-router";
import PrecioList from "../views/PrecioList.vue";

const routes = [
  {
    path: "/",
    name: "PrecioList",
    component: PrecioList,
  },
  {
    path: "/sigin",
    name: "SigIn",
    component: () => import("../views/SigIn.vue"),
  },
  {
    path: "/movimientos",
    name: "Movimientos",
    component: () => import("../views/Movimientos.vue"),
  },
  {
    path: "/transacciones",
    name: "Transacciones",
    component: () => import("../views/Transacciones.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
