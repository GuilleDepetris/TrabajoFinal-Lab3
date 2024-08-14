<template>
  <div class="conteiner-analisis-inversion">
    <h2>Inversiones</h2>
    <div class="titulosAnalisisInversion">
      <p>Critomoneda</p>
      <p>Resultado</p>
    </div>
    <p v-if="cargando" class="cargando">Cargando inversiones...</p>

    <div
      v-else-if="this.resultadosTotales.length > 0"
      v-for="(resultado, index) in resultadosTotales"
      :key="index"
      class="datosAnalisis"
    >
      <p class="nombreCrypto">{{ resultado.nombre }}</p>
      <p v-if="resultado.resultadoTotal >= 0" class="resultadoPositivo">
        $ {{ resultado.resultadoTotal }}
      </p>
      <p v-else-if="resultado.resultadoTotal < 0" class="resultadoNegativo">
        $ {{ resultado.resultadoTotal }}
      </p>
    </div>
    <p v-else class="cargando">No hay inversiones</p>
  </div>
</template>
<script>
import EventServices from "@/services/EventServices";
export default {
  name: "analisisDeInversion",
  components: {},
  data() {
    return {
      dineroTotal: 0,
      resultadosTotales: [],
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
        console.log(cantidadesCriptomonedas);
      } catch (error) {
        console.error("Error al obtener y verificar cantidades:", error);
      } finally {
        this.cargando = false;
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
          let precioTotalPagado = 0;

          const res = await EventServices.getPrecios().get(
            `/binance/${nombreCrypto}/ars`
          );
          precio = parseFloat(res.data.totalBid);

          for (let transaccion of transacciones) {
            if (transaccion.crypto_code === nombreCrypto) {
              if (transaccion.action === "purchase") {
                cantTotal += transaccion.crypto_amount;
                precioTotalPagado += parseFloat(transaccion.money);
              } else if (transaccion.action === "sale") {
                cantTotal -= transaccion.crypto_amount;
                precioTotalPagado += parseFloat(transaccion.money);
              }
            }
          }
          if (cantTotal > 0) {
            const precioTotal = cantTotal * precio;
            const resultado = precioTotal - precioTotalPagado;
            const resultadoRedondeado = parseFloat(resultado.toFixed(2));
            this.resultadosTotales.push({
              nombre: nombreCrypto,
              resultadoTotal: resultadoRedondeado,
            });
          }
        }
        console.log(this.resultadosTotales);
      } catch (error) {
        console.error("Error al obtener y verificar cantidades:", error);
      }
    },
  },
};
</script>
<style scoped>
.conteiner-analisis-inversion {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 15px;
  padding: 20px;
  border: 1px solid rgb(0, 0, 228);
  border-radius: 8px;
  background-color: transparent;
  font-family: "Poppins", sans-serif;
}
.conteiner-analisis-inversion h2 {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: rgb(0, 0, 228);
}
/* ========================================*/
.titulosAnalisisInversion {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 10px;
}

.datosAnalisis {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  border: 1px solid rgb(0, 0, 228);
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: transparent;
}
.resultadoPositivo {
  font-weight: bold;
  color: rgb(81, 255, 0);
}
.resultadoNegativo {
  font-weight: bold;
  color: red;
}
.nombreCrypto {
  font-weight: bold;
}
.cargando {
  text-align: center;
  font-weight: 600;
}
</style>
