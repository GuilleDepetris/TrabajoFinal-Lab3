<template>
  <HeaderG />
  <div class="contenedor-precios-general">
    <div class="contenedor-precios">
      <h1 class="titulo">Criptomonedas</h1>
      <div class="descripcion">
        <p class="desc1">Nombre</p>
        <p class="desc2">Compra</p>
        <p class="desc3">Venta</p>
      </div>
      <PrecioCard
        v-for="(valorCrypto, index) of valoresCryptos"
        :key="valorCrypto.id"
        :valorCrypto="valorCrypto"
        :nombreCryptosC="nombreCryptosC"
        :nombreCryptos="nombreCryptos"
        :index="index"
        class="cryptos"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PrecioCard from "@/components/PrecioCard.vue";
import EventServices from "@/services/EventServices.js";
import HeaderG from "@/components/header.vue";

export default {
  name: "PrecioList",
  components: {
    PrecioCard,
    HeaderG,
  },
  data() {
    return {
      events: null,
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
      valoresCryptos: [],
      nombreCryptosC: [
        `Bitcoin`,
        `Ethereum`,
        ` Dogecoin`,
        `USD Tether`,
        `USD Coin`,
        `Avalanche`,
        `Binance Coin`,
        `Cardano`,
        ` Solana`,
        `Dai`,
      ],
    };
  },
  created() {
    // EventServices.getTransactions().then((res) => (this.events = res.data));
    this.obtencionPrecios();
    setInterval(() => {
      this.obtencionPrecios();
    }, 10000);
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
  },
};
</script>
<style scoped>
.contenedor-precios-general {
  width: 100%;
  display: flex;
  justify-content: center;
}
.contenedor-precios {
  width: 90%;
}
.titulo {
  margin: 10px;
  margin-bottom: 0px;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 25px;
  color: black;
  text-align: center;
}

.descripcion {
  font-family: "Poppins", sans-serif;
  font-weight: 550;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: black;
}

.desc2 {
  display: flex;
  justify-content: center;
}

.desc3 {
  display: flex;
  justify-content: end;
}
.cryptos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  border-top: 2px solid black;
}

.cryptos:hover {
  background: rgb(230, 230, 230);
  cursor: pointer;
}
@media only screen and (min-width: 750px) {
  .contenedor-precios {
    width: 660px;
  }
}
</style>
