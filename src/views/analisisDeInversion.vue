<template>
  <HeaderGeneral />
  <div>
    <h2>Inversiones</h2>
    <div class="tituloEstadoAtual">
      <p>Critomoneda</p>
      <p>Resultado</p>
      <hr />
    </div>
    <div v-for="(resultado, index) in resultadosTotales" :key="index">
      <p>{{ resultado.nombre }}</p>
      <p v-if="resultado.resultadoTotal >= 0" class="resultadoPositivo">
        $ {{ resultado.resultadoTotal }}
      </p>
      <p v-else-if="resultado.resultadoTotal < 0" class="resultadoNegativo">
        $ {{ resultado.resultadoTotal }}
      </p>
      <hr />
    </div>
  </div>
</template>
<script>
import HeaderGeneral from "@/components/header.vue";
import EventServices from "@/services/EventServices";
export default {
  name: "analisisDeInversion",
  components: {
    HeaderGeneral,
  },
  data() {
    return {
      dineroTotal: 0,
      resultadosTotales: [],
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
            `https://criptoya.com/api/binance/${nombreCrypto}/ars`
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
<style scoped></style>
