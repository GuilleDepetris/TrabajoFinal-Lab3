<template>
  <div class="conteiner-analisis-estado">
    <h2>Fondos de la cuenta</h2>
    <div class="titulosEstadoAtual">
      <p>Critomoneda</p>
      <p>Cantidad</p>
      <p>Dinero</p>
    </div>
    <div v-if="cargando">
      <h4 class="verificando">Cargando...</h4>
    </div>
    <div v-else-if="cantidadesTotales.length > 0">
      <div
        class="datosDeEstado"
        v-for="(cantidades, index) in cantidadesTotales"
        :key="index"
      >
        <p>{{ cantidades.nombre }}</p>
        <p>{{ cantidades.cantidad }}</p>
        <p>$ {{ cantidades.precioTotal }}</p>
      </div>
      <div class="container-total">
        <p class="titulo-total">Total</p>
        <p class="precio-total">$ {{ mostrarTotal }}</p>
      </div>
    </div>
    <div v-else>
      <h4 class="verificando">No tienes transacciones realizadas</h4>
    </div>
  </div>
  <!-- <grafico-criptomonedas
    :cantidadesTotales="cantidadesTotales"
    ></grafico-criptomonedas> -->
</template>
<script>
import EventServices from "@/services/EventServices";
export default {
  name: "analisisEstado",
  components: {},
  data() {
    return {
      dineroTotal: 0,
      cantidadesTotales: [],
      cargando: true,
    };
  },
  created() {
    this.obtenerYVerificarCantidades();
  },
  methods: {
    async obtenerYVerificarCantidades() {
      try {
        const nombresCriptomonedas = await this.obtenerNombresCriptomonedas();
        const cantidadesCriptomonedas = await this.verificarCant(
          nombresCriptomonedas
        );
        console.log(cantidadesCriptomonedas); //esto es para que no me salga el aviso de que no uso la variable "cantidadesCriptomonedas"
      } catch (error) {
        console.error("Error al obtener y verificar cantidades:", error);
      }
    },
    async obtenerNombresCriptomonedas() {
      try {
        const response = await EventServices.getTransactions();
        const transacciones = response.data;
        const nombresUnicos = [];

        for (let i = 0; i < transacciones.length; i++) {
          const cryptoCode = transacciones[i].crypto_code;
          if (!nombresUnicos.includes(cryptoCode)) {
            nombresUnicos.push(cryptoCode);
          }
        }
        return nombresUnicos;
      } catch (error) {
        console.error("Error al obtener las transacciones:", error);
        return [];
      }
    },
    async verificarCant(nombresCriptomonedas) {
      try {
        const response = await EventServices.getTransactions();
        const transacciones = response.data;

        for (let nombreCrypto of nombresCriptomonedas) {
          let precio = 0;
          let cantTotal = 0;

          const res = await EventServices.getPrecios().get(
            `/binance/${nombreCrypto}/ars`
          );
          precio = res.data.totalBid.toFixed(2);

          for (let transaccion of transacciones) {
            if (transaccion.crypto_code === nombreCrypto) {
              if (transaccion.action === "purchase") {
                cantTotal += transaccion.crypto_amount;
              } else if (transaccion.action === "sale") {
                cantTotal -= transaccion.crypto_amount;
              }
            }
          }

          if (cantTotal > 0) {
            const precioTotal = cantTotal * parseFloat(precio);
            let precioTotalRedondeado = parseFloat(precioTotal.toFixed(2));

            this.dineroTotal += precioTotalRedondeado;

            this.cantidadesTotales.push({
              nombre: nombreCrypto,
              cantidad: cantTotal.toFixed(2),
              precioTotal: precioTotalRedondeado,
            });
          }
        }
      } catch (error) {
        console.error("Error al obtener y verificar cantidades:", error);
      } finally {
        this.cargando = false;
      }
    },
  },
  computed: {
    mostrarTotal() {
      return this.dineroTotal.toFixed(2);
    },
  },
};
</script>
<style scoped>
.conteiner-analisis-estado {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 15px;
  padding: 20px;
  border: 1px solid rgb(0, 0, 228);
  border-radius: 8px;
  background-color: #f9f9f9;
  font-family: "Poppins", sans-serif;
}

.conteiner-analisis-estado h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: rgb(0, 0, 228);
}

.titulosEstadoAtual {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 10px;
}

.datosDeEstado {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  border: 1px solid rgb(0, 0, 228);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
}
.datosDeEstado p {
  font-weight: 600;
}

.container-total {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid rgb(0, 0, 228);
  border-radius: 5px;
}

.titulo-total {
  grid-column: 2 / 3;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  color: rgb(0, 0, 228);
}

.precio-total {
  font-weight: bold;
  text-align: center;
  font-size: 16px;
}

.verificando {
  font-size: 18px;
  color: rgb(0, 0, 228);
  text-align: center;
}
</style>
