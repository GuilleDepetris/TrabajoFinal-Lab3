<template>
  <div class="container-transaccion">
    <h2 class="titulo-transacciones">Transacciones</h2>
    <div class="transaccion">
      <form>
        <input type="number" v-model="cantidad" class="input-cantidad" />
        <select v-model="cryptoSeleccionada" class="input-select">
          <option value="" disabled selected>
            Seleccione una criptomoneda
          </option>
          <option
            :value="nombreCrypto"
            v-for="(nombreCrypto, index) in nombreCryptos"
            :key="index"
          >
            {{ nombreCrypto }}
          </option>
        </select>
      </form>
    </div>
    <div class="calcular-valor">
      <button @click="calcularValor()">Calcular</button><br />
      <p>Compra: {{ compraF }}</p>
      <p>Venta: {{ ventaF }}</p>
      <p>{{ msj }}</p>
    </div>
    <div class="btnsTransaccion">
      <button @click="comprar()" :disabled="!estadoBoton">Comprar</button>
      <button
        @click="verificarCant(cryptoSeleccionada)"
        :disabled="!estadoBoton"
      >
        Vender
      </button>
    </div>
    <div v-if="bandera1" class="pregunta-confirmacion">
      <div class="btnsConfirmar">
        <p>
          ¿Seguro que quieres vender {{ cantidad }} de {{ cryptoSeleccionada }}?
        </p>
        <button @click="vender()" class="btnAceptar">Aceptar</button>
        <button @click="cancelar()" class="btnCancelar">Cancelar</button>
      </div>
    </div>

    <div v-if="bandera2">
      <p class="cryptoInsuficiente">
        ¡No tienes suficiente {{ cryptoSeleccionada }} para vender!
      </p>
    </div>
    <div>
      <p v-if="bandera3" class="msj-Compra">{{ msj2 }}</p>
      <p v-if="bandera4" class="msj-Error">{{ msj }}</p>
    </div>
  </div>
</template>
<script>
import EventServices from "@/services/EventServices.js";
import { mapState } from "vuex";
export default {
  name: "FormularioTransacciones",
  components: {},
  data() {
    return {
      valoresCryptos: [],
      cantidad: 0,
      cryptoSeleccionada: ``,
      compra: ``,
      venta: ``,
      compraF: ``,
      ventaF: ``,
      msj: ``,
      msj2: ``,
      estadoBoton: false,
      transacciones: [],
      bandera1: false,
      bandera2: false,
      bandera3: false,
      bandera4: false,
    };
  },
  created() {
    this.obtencionPrecios();
    setInterval(() => {
      this.obtencionPrecios();
    }, 10000);
  },
  computed: {
    ...mapState(["nombreCryptos", "usuario"]),
    agregarSignoCompra() {
      return "$ " + this.compraF;
    },
    agregarSignoVenta() {
      return "$ " + this.ventaF;
    },
  },
  methods: {
    async obtencionPrecios() {
      this.valoresCryptos = [];

      for (let crypto of this.nombreCryptos) {
        try {
          const response = await EventServices.getPrecios().get(
            `/binance/${crypto}/ars`
          );
          let compra = response.data.totalAsk.toFixed(2);
          let venta = response.data.totalBid.toFixed(2);
          let totalCrypt = { Crypto: crypto, PrecioC: compra, PrecioV: venta };
          this.valoresCryptos.push(totalCrypt);
        } catch (error) {
          console.error(`Error al obtener datos para ${crypto}:`, error);
        }
      }
    },
    calcularValor() {
      this.msj = ``;
      this.bandera1 = false;
      this.bandera3 = false;
      this.bandera2 = false;
      for (let crypto of this.valoresCryptos) {
        if (crypto.Crypto === this.cryptoSeleccionada) {
          this.compra = crypto.PrecioC;
          this.venta = crypto.PrecioV;
        }
      }
      let cantidad = parseFloat(this.cantidad);
      if (cantidad >= 0 && this.cryptoSeleccionada != ``) {
        let compra, venta;
        compra = this.compra * cantidad;
        this.compraF = "$" + compra.toFixed(2);
        venta = this.venta * cantidad;
        this.ventaF = "$" + venta.toFixed(2);
        this.estadoBoton = true;
      } else if (cantidad < 0) {
        this.msj = "Cantidad incorrecta";
      } else {
        this.msj = "Seleccione una criptomoneda";
      }
    },
    async comprar() {
      const usuario = localStorage.getItem("usuario");
      this.bandera2 = false;
      const accion = "comprar";
      const precio = await this.verificarCrypto(accion);
      const precioF = precio.toFixed(2);
      const fecha = await this.fecha();

      if (
        this.cryptoSeleccionada != undefined &&
        this.cantidad > 0 &&
        precio > 0
      ) {
        const datos = {
          user_id: usuario,
          action: "purchase",
          crypto_code: this.cryptoSeleccionada,
          crypto_amount: this.cantidad,
          money: precioF,
          datetime: fecha,
        };
        try {
          const response = await EventServices.postTransactions(datos);
          console.log(response.data);
          this.msj2 = "¡Compra realizada correctamente!";
          this.bandera3 = true;
        } catch (error) {
          console.error("Error en la solicitud POST:", error);
        }
      } else if (this.cantidad == 0 || this.cantidad < 0) {
        this.msj = "La cantidad a comprar debe ser mayor a cero";
      }
    },
    async verificarCrypto(accion) {
      try {
        const cantidadFloat = parseFloat(this.cantidad);
        const response = await EventServices.getPrecios().get(
          `/binance/${this.cryptoSeleccionada}/ars`
        );
        let precio = 0;

        if (accion === "comprar") {
          precio = response.data.totalAsk.toFixed(2) * cantidadFloat;
        } else if (accion === "vender") {
          precio = response.data.totalBid.toFixed(2) * cantidadFloat;
        }
        return precio;
      } catch (error) {
        console.error(
          "Error al obtener información de la criptomoneda:",
          error
        );
      }
    },
    async verificarCant(crypto) {
      this.bandera3 = false;
      this.bandera1 = false;
      let cantTotal = 0;
      const response = await EventServices.getTransactions();
      this.transacciones = response.data;

      for (let cantTransaccion of this.transacciones) {
        if (
          cantTransaccion.crypto_code === crypto &&
          cantTransaccion.action === "purchase"
        ) {
          cantTotal += cantTransaccion.crypto_amount;
        } else if (
          cantTransaccion.crypto_code === crypto &&
          cantTransaccion.action === "sale"
        ) {
          cantTotal -= cantTransaccion.crypto_amount;
        }
      }
      if (this.cantidad > 0) {
        if (cantTotal >= this.cantidad) {
          this.bandera1 = true;
          this.bandera2 = false;
        } else {
          this.bandera1 = false;
          this.bandera2 = true;
        }
      } else {
        this.msj = "La cantidad a vender debe ser mayor a cero";
      }
    },
    async vender() {
      const usuario = localStorage.getItem("usuario");
      this.bandera1 = false;
      this.bandera2 = false;
      const accion = "vender";
      const precio = await this.verificarCrypto(accion);
      const precioF = precio.toFixed(2);
      const fecha = await this.fecha();
      const datos = {
        user_id: usuario,
        action: "sale",
        crypto_code: this.cryptoSeleccionada,
        crypto_amount: this.cantidad,
        money: precioF,
        datetime: fecha,
      };
      try {
        const response = await EventServices.postTransactions(datos);
        console.log(response.data);
        this.msj2 = "¡Venta realizada correctamente!";
        this.bandera3 = true;
      } catch (error) {
        console.error("Error en la solicitud POST:", error);
      }
    },
    cancelar() {
      this.bandera1 = false;
    },
    fecha() {
      const fecha = new Date();
      const fechaOrganizada = `${fecha.getFullYear()}-${String(
        fecha.getMonth() + 1
      ).padStart(2, "0")}-${String(fecha.getDate() - 1).padStart(
        2,
        "0"
      )} ${fecha.getHours()}:${fecha.getMinutes()}`;
      return fechaOrganizada;
    },
  },
};
</script>
<style scoped>
/* Saca los botones que estan adentro del input, que permiten sumar o restar numeros */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.titulo-transacciones {
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
  margin: 8px;
  color: blue;
}

.container-transaccion {
  display: grid;
  justify-content: center;
}

.input-cantidad {
  height: 30px;
  width: 94.7%;
  font-size: 17px;
  margin: 6px;
  border-radius: 1rem;
  border-color: blue;
  outline: none;
  background-color: transparent;
  padding-left: 10px;
}

.input-select {
  width: 70%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: transparent;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  appearance: none;
  margin-left: 16%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.input-select option {
  font-size: 16px;
  background-color: #fff;
  color: #333;
}

.input-select,
.input-cantidad:focus {
  outline: none;
  border-color: #66afe9;
  box-shadow: 0 0 5px rgba(102, 175, 233, 0.6);
}

.calcular-valor {
  background-color: transparent;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.6);
  text-align: center;
  min-width: 150px;
  margin: 0 auto;
  margin-bottom: 10px;
}

.calcular-valor button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
}

.calcular-valor button:hover {
  background-color: #0056b3;
}

.calcular-valor p {
  margin: 5px 0;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
}

.btnsTransaccion {
  margin: auto;
  width: 55%;
  display: flex;
  justify-content: space-between;
}

.btnsTransaccion button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.btnsTransaccion button:hover {
  background-color: #0056b3;
}

.pregunta-confirmacion {
  font-family: "Poppins", sans-serif;
  font-weight: 550;
  margin: auto;
}

.btnsConfirmar {
  display: grid;
  justify-content: space-between;
}

.btnAceptar {
  margin-top: 8px;
  background-color: #626262;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.btnCancelar {
  background-color: #626262;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 7px;
}

.btnAceptar:hover {
  background-color: #747474;
}

.btnCancelar:hover {
  background-color: #747474;
}

.cryptoInsuficiente {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  color: red;
  font-weight: 600;
  text-align: center;
}

.msj-Compra {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  color: rgb(81, 255, 0);
  font-weight: 600;
  text-align: center;
}
</style>
