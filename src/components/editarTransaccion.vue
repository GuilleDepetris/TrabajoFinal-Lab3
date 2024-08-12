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
      <h3>Editar Transacción</h3>
      <select v-model="accionSeleccionada" class="input-select-accion" required>
        <option value="" disabled selected>Acción</option>
        <option>Comprar</option>
        <option>Vender</option>
      </select>

      <select v-model="cryptoSeleccionada" class="input-select-crypto" required>
        <option value="" disabled selected>Criptomonedas</option>
        <option v-for="(nombreCrypto, index) of nombreCryptos" :key="index">
          {{ nombreCrypto }}
        </option>
      </select>

      <div class="container-cantidades">
        <div>
          <h4>Cantidad</h4>
          <input
            type="number"
            v-model="cantidadRecibida"
            :placeholder="this.cantidadRecAnterior"
          />
        </div>
        <div>
          <h4>Pagado</h4>
          <input
            type="number"
            v-model="cantidadPagada"
            :placeholder="this.cantidadPagAnterior"
            class="input-number"
          />
        </div>
      </div>
      <h4>Fecha de Transaccion</h4>
      <input type="date" id="fecha" name="fecha" v-model="fechaCamb" />
      <div class="container-buttons3">
        <button @click="editarTransaccion()">Aceptar</button>
        <button @click="cancelarEdicion()">Cancelar</button>
        <p class="edicionExitosa">
          {{ msj }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import EventServices from "@/services/EventServices";
import { mapState } from "vuex";
export default {
  name: "editarTransaccion",
  props: {
    idTransaccion: String,
  },
  emits: ["cerrar-transaccion"],
  data() {
    return {
      cryptoSeleccionada: "",
      bandera: false,
      bandera1: false,
      msj: "",
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
  computed: {
    ...mapState(["nombreCryptos"]),
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
        this.accionSeleccionada !== "" &&
        this.cryptoSeleccionada !== undefined &&
        this.cryptoSeleccionada !== "" &&
        this.cantidadRecibida > 0 &&
        this.cantidadPagada > 0 &&
        this.fechaCamb !== ""
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
          this.msj = "¡Edición realizada correctamente!";
          setInterval(() => {
            window.location.href = "/movimientos";
          }, 2500);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("No se pueden editar la transacción. Verifique los datos.");
        this.msj = "No se pueden editar la transacción. Verifique los datos.";
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
  z-index: 10;
  background-color: #f4f4f4;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid black;
  text-align: center;
  width: 330px;
  height: 380px;
  max-width: 500px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  background-color: #f4f4f4;
}
h3 {
  font-size: 25px;
  margin: 8px;
}
.input-select-accion {
  width: 70%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  appearance: none;
  margin-bottom: 10px;
}

.input-select-accion option {
  font-size: 16px;
  background-color: #fff;
  color: #333;
}

.input-select-crypto {
  width: 70%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  appearance: none;
  margin-bottom: 10px;
}

.input-select-crypto option {
  font-size: 16px;
  background-color: #fff;
  color: #333;
}
.container-cantidades {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  width: 70%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  appearance: none;
  margin-bottom: 10px;
}
input[type="date"] {
  width: 80%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  appearance: none;
  margin-bottom: 10px;
  font-family: "Poppins", sans-serif;
}
.container-buttons3 button {
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
.container-buttons3 button:hover {
  background-color: #2980b9;
}
.edicionExitosa {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin: 5px;
}
</style>
