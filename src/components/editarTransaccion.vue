<template>
  <div class="container-buttons">
    <button @click="datosTransaccion()">Editar</button>
    <button @click="confirmarEliminacion()">Eliminar</button>
    <button @click="cerrarTransaccion()">Cerrar</button>
  </div>
  <div class="container-buttons2" v-if="bandera1">
    <p>¿Estás seguro de que deseas eliminar esta transacción?</p>
    <button @click="eliminarTransaccion()">Aceptar</button>
    <button @click="cancelar()">Cancelar</button>
  </div>

  <div v-if="bandera" class="container-editar">
    <div>
      <h3>Editar Transaccion</h3>
      <select v-model="accionSeleccionada">
        <option disabled selected>Accion</option>
        <option>Comprar</option>
        <option>Vender</option>
      </select>

      <select v-model="cryptoSeleccionada">
        <option disabled selected>Criptomonedas</option>
        <option v-for="(nombreCrypto, index) of nombreCryptos" :key="index">
          {{ nombreCrypto }}
        </option>
      </select>

      <h4>Cantidad Recibida:</h4>
      <input
        type="number"
        v-model="cantidadRecibida"
        :placeholder="this.cantidadRecAnterior"
      />
      <h4>Cantidad Pagada:</h4>
      <input
        type="number"
        v-model="cantidadPagada"
        :placeholder="this.cantidadPagAnterior"
      />
      <h4>Fecha de Transaccion</h4>
      <input type="date" id="fecha" name="fecha" v-model="fechaCamb" />
      <button @click="editarTransaccion()">Aceptar</button>
      <button @click="cancelarEdicion()">Cancelar</button>
    </div>
  </div>
</template>
<script>
import EventServices from "@/services/EventServices";
export default {
  name: "editarTransaccion",
  props: {
    idTransaccion: String,
  },
  emits: ["cerrar-transaccion"],
  data() {
    return {
      nombreCryptos: [
        `btc`,
        `eth`,
        `doge`,
        `usdt`,
        `usdc`,
        `avax`,
        `bnb`,
        `ada`,
        `sol`,
        `dai`,
      ],
      cryptoSeleccionada: "",
      bandera: false,
      bandera1: false,
      transaccion: null,
      accionSeleccionada: "",
      cantidadRecAnterior: "",
      cantidadPagAnterior: "",
      fechaCamb: "",
      crypto: "",
      cantidadRecibida: "",
      cantidadPagada: "",
      login: "Guille16446",
    };
  },
  methods: {
    cerrarTransaccion() {
      this.$emit("cerrar-transaccion");
    },
    async datosTransaccion() {
      let idTransaccion = this.idTransaccion;
      try {
        const response = await EventServices.getTransaction(idTransaccion);
        this.crypto = response.data.crypto_code;
        this.cantidadRecAnterior = response.data.crypto_amount.toString();
        this.cantidadPagAnterior = response.data.money.toString();
      } catch (error) {
        console.log(error);
      }
      this.bandera = true;
    },
    confirmarEliminacion() {
      this.bandera1 = true;
    },
    async eliminarTransaccion() {
      let idTransaccion = this.idTransaccion;
      try {
        const response = await EventServices.deleteTransaction(idTransaccion);
        console.log("Transacción eliminada:", response.data);
        this.bandera1 = false;
        setInterval(() => {
          this.$emit("cerrar-transaccion");
        }, 2500);
      } catch (error) {
        console.log("Error al eliminar la transacción:", error);
      }
    },
    cancelar() {
      this.bandera1 = false;
    },
    async editarTransaccion() {
      if (
        this.accionSeleccionada !== undefined &&
        this.cantidadRecibida > 0 &&
        this.cantidadPagada > 0
      ) {
        let accion;
        if (this.accionSeleccionada === "Comprar") {
          accion = "purchase";
        } else {
          accion = "sale";
        }
        let idTransaccion = this.idTransaccion;

        const datos = {
          action: accion,
          crypto_amount: this.cantidadRecibida,
          money: this.cantidadPagada,
          datetime: this.fechaCamb,
        };
        try {
          const response = await EventServices.editarTransaction(
            idTransaccion,
            datos
          );
          console.log("Transacción actualizada:", response.data);
          setInterval(() => {
            this.$emit("cerrar-transaccion");
          }, 2500);
          this.bandera = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No se pueden editar la transacción. Verifique los datos.");
      }
    },
    cancelarEdicion() {
      this.bandera = false;
    },
  },
};
</script>
<style scoped>
.container-buttons {
  display: block;
  margin-top: 20px;
  text-align: center;
  z-index: 110;
}

.container-buttons button {
  background-color: #3498db;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s ease;
  margin: 1.2%;
}
.container-buttons button:hover {
  background-color: #2980b9;
}

.container-buttons2 {
  display: block;
  margin: 5px;
  text-align: center;
  font-weight: 600;
}

.container-buttons2 button {
  background-color: #3498db;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s ease;
  margin: 1.2%;
}

.container-buttons2 button:hover {
  background-color: #2980b9;
}
.container-editar {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  /* background-color: rgb(0, 0, 228); */
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
</style>
