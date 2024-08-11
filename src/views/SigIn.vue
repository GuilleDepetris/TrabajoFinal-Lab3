<template>
  <section>
    <div class="contenedor">
      <div class="formulario">
        <h1>Crypto Market</h1>
        <form action="#">
          <h3>Iniciar sesión</h3>
          <div class="input-contenedor">
            <i class="fa-solid fa-user"></i>
            <input type="text" name="usuario" v-model="usuarioId" />
            <label>Nombre de Usuario</label>
          </div>

          <div class="input-contenedor">
            <i class="fa-solid fa-lock"></i>
            <input type="password" name="contraseña" v-model="contraseña" />
            <label>Contraseña</label>
          </div>
        </form>
        <div class="contenedor-btnAcceder">
          <button class="btnAcceder" @click="acceder()">Acceder</button>
          <p v-if="bandera1" class="incorrectos">
            Usuario o contraseña incorrectos
          </p>
          <div class="registrar">
            <p>No tengo cuenta<a href=""> Crear una</a></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "SigIn",
  data() {
    return {
      contraseña: "",
      usuarioId: "",
      bandera1: false,
    };
  },
  methods: {},
};
</script>
<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-image: url(/src/assets/imagen-login.jpg);
  background-position: center;
  background-size: cover;
}

.contenedor {
  position: relative;
  width: 350px;
  height: 390px;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
}

.contenedor h1 {
  text-align: center;
  color: #fff;
  font-size: 2.3rem;
  font-family: "Permanent Marker", cursive;
  font-weight: 400;
  font-style: normal;
}

.contenedor h3 {
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  margin-top: 15px;
  margin-bottom: 0px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: 400;
}

.input-contenedor {
  position: relative;
  margin: 25px 0;
  width: 300px;
  border-bottom: 2px solid #fff;
}

.input-contenedor label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #fff;
  font-size: 1.05rem;
  pointer-events: none;
  transition: 0.6s;
  font-family: monospace;
  font-weight: 500;
}

input:focus ~ label,
input:valid ~ label {
  top: -4px;
}

.input-contenedor input {
  width: 100%;
  height: 40px;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: -35px 0 5px;
  color: #fff;
}

.input-contenedor i {
  position: absolute;
  color: #fff;
  font-size: 1.5rem;
  top: 10px;
  right: 8px;
}

.btnAcceder {
  width: 100%;
  height: 45px;
  border-radius: 40px;
  background: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  font-size: 1rem;
  transition: 0.4s;
}

.btnAcceder:hover {
  background: rgb(9, 175, 226);
}

.registrar {
  font-size: 0.8rem;
  color: #fff;
  text-align: center;
  margin: 20px 0 10px;
}

.registrar p {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-weight: 400;
}

.registrar p a {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  transition: 0.3;
  font-size: 0.8rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: 900;
}

.registrar p a:hover {
  text-decoration: underline;
}

.incorrectos {
  color: #ff3232;
  text-align: center;
  font-weight: 700;
}
@media only screen and (min-width: 620px) {
  .contenedor {
    transition: 0.9s;
    width: 380px;
    height: 400px;
    border: 2px solid white;
    backdrop-filter: blur(5px);
  }
}
</style>
