<template>
  <header>
    <div>
      <h2>Crypto Market</h2>
    </div>
    <nav class="contenedor-links" v-if="bandera">
      <router-link to="/">Precios</router-link>
      <hr />
      <router-link to="/sigin">Registrarse</router-link>
      <hr />
      <router-link to="/transacciones">Transacciones</router-link>
    </nav>
    <!-- <a href="transacciones.html">Transacciones</a>
    <hr />
    <a href="historial.html">Movimientos</a>
    <hr />
    <a href="analisisEstado.html">Billetera</a>
    <hr />
    <a href="analisisDeInversion.html">Inversiones</a>
    <hr />
    <a href="index.html">Cerrar Sesión</a> -->

    <i class="fa-solid fa-bars" @click="barraLinks"></i>
  </header>
</template>

<script>
export default {
  name: "HeaderG",
  components: {},
  data() {
    return {
      bandera: false,
    };
  },
  methods: {
    barraLinks() {
      if (this.bandera == false) {
        this.bandera = true;
      } else {
        this.bandera = false;
      }
    },
  },
};
</script>
<style scoped>
header {
  background-color: rgb(0, 0, 228);
  display: flex;
  height: 50px;
  max-width: 97%;
  justify-content: center;
  box-shadow: 0 2.5px 4px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 3;
  margin: auto;
}

header div h2 {
  color: whitesmoke;
  font-family: "Permanent Marker", cursive;
  margin: auto;
  margin-top: 3.5%;
  /* font-size: 30px; */
}

header i {
  position: absolute;
  right: 20px;
  top: 18px;
}

.contenedor-links {
  background-color: #fff;
  display: flex;
  position: absolute;
  flex-direction: column;
  width: 45vh;
  top: 50px;
  right: 0;
}

.fa-bars {
  cursor: pointer;
}

header .contenedor-links {
  display: flex;
}

nav a {
  margin-bottom: 5px;
  margin-top: 5px;
  text-align: center;
  text-decoration: none;
  /* font-family: "Poppins", sans-serif; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 650;
  color: #010729;
}
nav a.router-link-exact-active {
  color: rgb(0, 0, 228);
}
/* @media only screen and (min-width: 620px) {
  header {
    max-width: 60%;
    margin: auto;
  }

  header i {
    right: 5%;
  }
} */
</style>
