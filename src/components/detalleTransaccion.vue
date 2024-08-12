<template>
  <div class="container-general">
    <div>
      <div class="infoTransaccion">
        <h3>Detalles de Transacción</h3>
        <h3>{{ tipoTransaccion }}</h3>
        <p>{{ detalleTransaccion.crypto_code }}</p>
        <h4>Pagado</h4>
        <p>{{ detalleTransaccion.money }}</p>
        <h4>Cantidad</h4>
        <p>{{ detalleTransaccion.crypto_amount }}</p>
        <h4>Fecha de Transaccion</h4>
        <p>{{ detalleTransaccion.datetime }}</p>
      </div>
    </div>
    <editarTransaccion
      @cerrar-transaccion="cerrarTransaccion"
      :idTransaccion="idTransaccion"
    />
  </div>
</template>
<script>
import editarTransaccion from "@/components/editarTransaccion.vue";
export default {
  name: "detalleTransaccion",
  props: {
    detalleTransaccion: Object,
  },
  data() {
    return {
      idTransaccion: null,
    };
  },
  created() {
    if (this.detalleTransaccion) {
      this.idTransaccion = this.detalleTransaccion._id;
    }
  },
  components: {
    editarTransaccion,
  },
  methods: {
    cerrarTransaccion() {
      this.$emit("cerrar-transaccion-final");
    },
  },
  computed: {
    tipoTransaccion() {
      if (
        this.detalleTransaccion &&
        this.detalleTransaccion.action === "purchase"
      ) {
        return "Crypto Comprada";
      } else {
        return "Crypto Vendida";
      }
    },
  },
};
</script>
<style scoped>
.container-general {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border: 1px solid black;
  text-align: center;
  width: 330px;
  max-width: 500px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.infoTransaccion {
  text-align: left;
  color: #333;
}

.infoTransaccion h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5em;
  color: #2c3e50;
}

.infoTransaccion h4 {
  margin: 10px 0 5px;
  font-size: 1.2em;
  color: #34495e;
}

.infoTransaccion p {
  margin: 0 0 15px;
  font-size: 1em;
  color: #7f8c8d;
}
</style>
