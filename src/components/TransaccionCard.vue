<template>
  <div class="transac">
    <p>{{ transaccion.crypto_code }}</p>
    <p v-if="transaccion.action === 'purchase'" class="accionC">Compra</p>
    <p v-else class="accionV">Venta</p>
    <p>{{ transaccion.crypto_amount }}</p>
    <p>{{ transaccion.money }}</p>
    <button @click="detalleId(transaccion._id)" class="boton-detalle">
      <i class="fa-solid fa-circle-info"></i>
    </button>
  </div>
  <div v-if="bandera">
    <div class="fondo-borroso"></div>
    <detalleTransaccion
      v-if="bandera"
      @cerrar-transaccion-final="cerrarTransaccion"
      :detalleTransaccion="detalleTransaccion"
    />
  </div>
</template>
<script>
import DetalleTransaccion from "@/components/detalleTransaccion.vue";
import EventServices from "@/services/EventServices.js";

export default {
  name: "TransaccionCard",
  props: {
    transaccion: Object,
  },
  components: {
    DetalleTransaccion,
  },
  data() {
    return {
      idTransaccion: null,
      detalleTransaccion: [],
      bandera: false,
    };
  },
  methods: {
    async detalleId(idTransaccion) {
      this.idTransaccion = idTransaccion;
      try {
        const response = await EventServices.getTransaction(this.idTransaccion);
        this.detalleTransaccion = response.data;
        this.bandera = true;
        const fechaCompleta = this.detalleTransaccion.datetime;
        const fechaSinTZ = fechaCompleta.replace("T", "/").replace("Z", "");
        this.detalleTransaccion.datetime = fechaSinTZ;
      } catch (error) {
        console.error(error);
      }
    },
    cerrarTransaccion() {
      this.bandera = false;
    },
  },
};
</script>
<style>
.transac {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 550;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  margin: 4px;
  padding: 4px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: transparent;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 1;
}
.transac:hover {
  background: rgb(214, 214, 214);
  transform: scale(1.01);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 2;
}
.accionC {
  color: rgb(69, 218, 0);
}

.accionV {
  color: red;
}
.boton-detalle {
  background-color: rgb(98, 98, 98);
  color: rgb(0, 0, 0);
  border: none;
  padding: 6px 14px;
  cursor: pointer;
  border-radius: 5px;
}

.boton-detalle:hover {
  background-color: rgb(144, 144, 144);
}
.fondo-borroso {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(1px);
  z-index: 9;
}
</style>
