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
/* .precio-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}
.precio-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
} */
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
