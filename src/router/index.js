import { createRouter, createWebHistory } from "vue-router";
import PrecioList from "../views/PrecioList.vue";
// import PrecioList from "../views/PrecioList.vue";

const routes = [
  {
    path: "/",
    name: "PrecioList",
    component: PrecioList,
  },
  {
    path: "/SigIn",
    name: "SigIn",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SigIn.vue"),
  },
  {
    path: "/transacciones",
    name: "Transacciones",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Transacciones.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
