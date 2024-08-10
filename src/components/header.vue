<template>
  <header class="header1">
    <nav class="contenedor-links">
      <router-link to="/">Precios</router-link>
      <router-link to="/transacciones">Transacciones</router-link>
      <router-link to="/movimientos">Movimientos</router-link>
      <h2>Crypto Market</h2>
      <router-link to="/analisisEstado">Billetera</router-link>
      <router-link to="/analisisDeInversion">Inversiones</router-link>
      <router-link to="/sigin">Cerrar Sesión</router-link>
    </nav>
  </header>
  <header class="header2">
    <h2>Crypto Market</h2>
    <div v-if="bandera">
      <nav class="contenedor-links2">
        <router-link to="/">Precios</router-link>
        <router-link to="/transacciones">Transacciones</router-link>
        <router-link to="/movimientos">Movimientos</router-link>
        <router-link to="/analisisEstado">Billetera</router-link>
        <router-link to="/analisisDeInversion">Inversiones</router-link>
        <router-link to="/sigin">Cerrar Sesión</router-link>
      </nav>
    </div>
    <i class="fa-solid fa-bars" @click="barraLinks" id="icono-barra"></i>
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
.header1 {
  background-color: rgb(0, 0, 228);
  height: 50px;
  max-width: 97%;
  margin: auto;
  display: flex;
  align-items: center;
  box-shadow: 0 2.5px 4px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 3;
}
.header2 {
  display: none;
}
h2 {
  display: flex;
  align-items: center;
  color: whitesmoke;
  font-family: "Permanent Marker", cursive;
}
.contenedor-links {
  width: 97%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
nav a {
  display: flex;
  text-decoration: none;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 650;
  color: #010729;
}
nav a.router-link-exact-active {
  color: rgb(255, 255, 255);
}
.header1 i {
  position: absolute;
  right: 20px;
  top: 18px;
  cursor: pointer;
  display: none;
}
@media screen and (max-width: 900px) {
  .header1 {
    display: none;
  }
  .header2 {
    display: block;
    background-color: rgb(0, 0, 228);
    display: flex;
    height: 50px;
    max-width: 100%;
    justify-content: center;
    box-shadow: 0 2.5px 4px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 3;
  }
  .contenedor-links2 {
    background-color: #fff;
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 250px;
    top: 50px;
    right: 0;
    border-radius: 15px 0px 15px 15px;
    box-shadow: -2.5px 2.5px 5px rgba(0, 0, 0, 0.2);
  }
  h2 {
    color: whitesmoke;
    font-family: "Permanent Marker", cursive;
    margin: auto;
  }

  i {
    position: absolute;
    right: 20px;
    top: 18px;
    cursor: pointer;
  }
  nav a {
    text-decoration: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: 650;
    color: black;
    cursor: pointer;
    padding: 10px;
    transition: 0.2s;
  }
  nav a:hover {
    color: rgb(70, 70, 70);
    font-size: 17px;
    padding: 9px;
  }
  nav a.router-link-exact-active {
    color: rgb(0, 0, 228);
  }
}
</style>
