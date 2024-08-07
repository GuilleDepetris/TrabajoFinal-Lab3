<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
/* .transac {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 550;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  margin: 4px;
  padding: 4px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 1;
}
.container-detalles {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: rgb(0, 0, 228);
  border-radius: 10px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border: 1px solid black;
  text-align: center;
  width: 330px;
  max-width: 500px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  background-color: #f4f4f4;
}
.container-detalles {
  z-index: 10;
}
.fondo-borroso {
  z-index: 9;
}
.fondo-borroso {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 9;
} */
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
