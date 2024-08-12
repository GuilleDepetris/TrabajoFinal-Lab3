<template>
  <div class="precio-card">
    <div class="info1">
      <p class="nombre">{{ nombreCryptos[index].toUpperCase() }}</p>
      <p class="nombreC">{{ nombreCryptosC[index] }}</p>
    </div>
    <div class="info2">
      <p class="precioC">{{ valorCrypto.PrecioC }}</p>
    </div>
    <div class="info3">
      <p class="precioV">{{ valorCrypto.PrecioV }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "PrecioCard",
  props: {
    valorCrypto: Object,
    nombreCryptosC: Object,
    index: Number,
    nombreCryptos: Object,
  },
};
</script>
<style scoped>
.nombre {
  font-weight: 550;
  font-size: 16px;
  color: black;
}

.nombreC {
  font-size: 13px;
  color: #010729;
  font-weight: 450;
}

.info2 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info3 {
  display: flex;
  align-items: center;
  justify-content: end;
}

.precioC {
  color: rgb(10, 240, 10);
  font-weight: 550;
}
.precioV {
  color: rgb(255, 20, 20);
  font-weight: 550;
}
.precio-card p {
  margin: 4px;
}
</style>
