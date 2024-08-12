import { createStore } from "vuex";

export default createStore({
  state: {
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
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
