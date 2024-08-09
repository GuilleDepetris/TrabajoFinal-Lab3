<template>
  <HeaderG />
  <div class="conteiner-analisis-estado">
    <h2 class="tituloPagEA">Fondos de la cuenta</h2>
    <div class="titulosEstadoAtual">
      <p>Critomoneda</p>
      <p>Cantidad</p>
      <p>Dinero</p>
    </div>
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
    <!-- <grafico-criptomonedas
      :cantidadesTotales="cantidadesTotales"
    ></grafico-criptomonedas> -->
  </div>
</template>
<script>
import EventServices from "@/services/EventServices";
import HeaderG from "@/components/header.vue";
export default {
  name: "analisisEstado",
  components: {
    HeaderG,
  },
  data() {
    return {
      dineroTotal: 0,
      cantidadesTotales: [],
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

          const res = await EventServices.getPrecios().get(
            `https://criptoya.com/api/binance/${nombreCrypto}/ars`
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
  max-width: 1100px;
  margin: auto;
}

.tituloPagEA {
  font-family: sans-serif;
  text-align: center;
  font-size: 33px;
  margin: 7px;
  color: #007bff;
}

.titulosEstadoAtual {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  font-family: sans-serif;
  font-weight: 600;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  padding: 8.7px;
}

.datosDeEstado {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  padding: 4px;
  font-family: sans-serif;
}

.container-total {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  padding: 3px;
}

.titulo-total {
  grid-column: 2/3;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}

.precio-total {
  grid-column: 3/4;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}
</style>
