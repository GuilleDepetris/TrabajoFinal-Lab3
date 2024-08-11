import { createRouter, createWebHistory } from "vue-router";
import PrecioList from "../views/PrecioList.vue";
import SigIn from "../views/SigIn.vue";
import Transacciones from "@/views/Transacciones.vue";
import Movimientos from "../views/Movimientos.vue";
import AnalisisEstado from "@/views/analisisEstado.vue";
import AnalisisDeInversion from "../views/analisisDeInversion.vue";

const routes = [
  {
    path: "/",
    name: "PrecioList",
    component: PrecioList,
  },
  {
    path: "/SigIn",
    name: "SigIn",
    component: SigIn,
  },
  {
    path: "/transacciones",
    name: "Transacciones",
    component: Transacciones,
  },
  {
    path: "/movimientos",
    name: "Movimientos",
    component: Movimientos,
  },
  {
    path: "/analisisEstado",
    name: "AnalisisEstado",
    component: AnalisisEstado,
  },
  {
    path: "/analisisDeInversion",
    name: "AnalisisDeInversion",
    component: AnalisisDeInversion,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
