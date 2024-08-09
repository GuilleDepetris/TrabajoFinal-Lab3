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
  {
    path: "/movimientos",
    name: "Movimientos",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Movimientos.vue"),
  },
  {
    path: "/analisisEstado",
    name: "AnalisisEstado",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/analisisEstado.vue"),
  },
  {
    path: "/analisisDeInversion",
    name: "AnalisisDeInversion",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/analisisDeInversion.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
