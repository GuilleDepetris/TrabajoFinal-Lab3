<template>
  <div class="detalles-compra">
    <p>Moneda</p>
    <p>Accion</p>
    <p>Cantidad</p>
    <p>Precio</p>
    <p>Info</p>
  </div>

  <div v-if="cargando">
    <h4 class="verificando">Cargando transacciones...</h4>
  </div>

  <div
    v-else-if="this.transacciones.length > 0"
    v-for="(transaccion, index1) in transacciones"
    :key="transaccion._id"
    class="transac"
  >
    <p>{{ transaccion.crypto_code }}</p>
    <p v-if="transaccion.action === 'purchase'" class="accionC">Compra</p>
    <p v-else class="accionV">Venta</p>
    <p>{{ transaccion.crypto_amount }}</p>
    <p>{{ transaccion.money }}</p>
    <button @click="detalleId(transaccion._id)" class="boton-detalle">
      <i class="fa-solid fa-circle-info"></i>
    </button>
  </div>
  <div v-else-if="!cargando">
    <h4 class="verificando">No hay transacciones</h4>
  </div>
  <div v-if="bandera" class="fondo-borroso"></div>
  <div v-if="bandera" class="container-detalles">
    <div class="infoTransaccion">
      <h3>Detalles de Transacción</h3>
      <h3>{{ tipoTransaccion }}</h3>
      <p>{{ detalleTransaccion.crypto_code }}</p>
      <h4>Pagado</h4>
      <p>{{ detalleTransaccion.money }}</p>
      <h4>Cantidad</h4>
      <p>{{ detalleTransaccion.crypto_amount }}</p>
      <h4>Fecha de Transaccion</h4>
      <p>{{ detalleTransaccion.datetime }}</p>
    </div>
    <editarTransaccion
      :idTransaccion="idTransaccion"
      @cerrar-transaccion="cerrarTransaccion"
    ></editarTransaccion>
  </div>
</template>

<script>
import EventServices from "@/services/EventServices";

export default {
  name: "MovimientosList",
  components: {},
  data() {
    return {
      transacciones: [],
      detalleTransaccion: null,
      idTransaccion: null,
      bandera: false,
      cargando: true,
    };
  },
  created() {
    this.mostrarTransacciones();
  },
  methods: {
    async mostrarTransacciones() {
      //   const usuario = localStorage.getItem("usuarioId");
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
    cerrarTransaccion() {
      this.bandera = false;
    },
    async detalleId(idTransaccion) {
      this.idTransaccion = idTransaccion;
      //   const apiClient = this.axiosBD();
      try {
        const response = await EventServices.getTransaction(this.idTransaccion);
        this.bandera = true;
        this.bandera1 = true;
        this.detalleTransaccion = response.data;
        const fechaCompleta = this.detalleTransaccion.datetime;
        const fechaSinTZ = fechaCompleta.replace("T", "/").replace("Z", "");
        this.detalleTransaccion.datetime = fechaSinTZ;
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    tipoTransaccion() {
      if (
        this.detalleTransaccion &&
        this.detalleTransaccion.action === "purchase"
      ) {
        return "Crypto Comprada";
      } else {
        return "Crypto Vendida";
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
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 1;
}

.transac:hover {
  background: rgb(214, 214, 214);
  transform: scale(1.07);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.accionC {
  color: rgb(69, 218, 0);
}

.accionV {
  color: red;
}

.paginaDetalles {
  overflow-x: hidden;
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

.container-detalles {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: rgb(0, 0, 228);
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border: 1px solid black;
  text-align: center;
  width: 330px;
  max-width: 500px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  background-color: #f4f4f4;
}

/* Backdrop */
.fondo-borroso {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 9;
}

.infoTransaccion {
  text-align: left;
  color: #333;
}

.infoTransaccion h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5em;
  color: #2c3e50;
}

.infoTransaccion h4 {
  margin: 10px 0 5px;
  font-size: 1.2em;
  color: #34495e;
}

.infoTransaccion p {
  margin: 0 0 15px;
  font-size: 1em;
  color: #7f8c8d;
}
</style>
