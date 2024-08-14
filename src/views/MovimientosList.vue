<template>
  <div class="detalles-compra">
    <p>Moneda</p>
    <p>Acción</p>
    <p>Cantidad</p>
    <p>Precio</p>
    <p>Info</p>
  </div>
  <div v-if="cargando">
    <h4 class="verificando">Cargando transacciones...</h4>
  </div>
  <TransaccionCard
    v-else-if="this.transacciones.length > 0"
    v-for="transaccion in transacciones"
    :key="transaccion._id"
    :transaccion="transaccion"
  />
  <div v-else-if="!cargando">
    <h4 class="verificando">No hay transacciones</h4>
  </div>
</template>

<script>
import EventServices from "@/services/EventServices";
import TransaccionCard from "@/components/TransaccionCard.vue";

export default {
  name: "MovimientosList",
  components: {
    TransaccionCard,
  },
  data() {
    return {
      transacciones: [],
      detalleTransaccion: null,
      idTransaccion: null,
      cargando: true,
    };
  },
  created() {
    this.mostrarTransacciones();
  },
  methods: {
    async mostrarTransacciones() {
      try {
        const response = await EventServices.getTransactions();
        if (response.data.length > 0) {
          this.transacciones = response.data;
        } else {
          console.log("No hay transacciones");
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.cargando = false;
      }
    },
  },
};
</script>
<style scoped>
.detalles-compra {
  border-bottom: 2px solid rgb(7, 0, 216);
  height: 34px;
  align-items: center;
  width: 97%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 550;
  margin: auto;
}
.verificando {
  font-family: "Poppins", sans-serif;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
