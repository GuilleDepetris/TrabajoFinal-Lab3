<template>
  <button @click="activarDarkMode">
    <i class="fas fa-sun" v-if="!darkMode"></i>
    <i class="fas fa-moon" v-else></i>
  </button>
</template>

<script>
export default {
  computed: {
    darkMode() {
      return localStorage.getItem("darkMode") === "true";
    },
  },
  methods: {
    activarDarkMode() {
      const cambio = !this.darkMode;
      localStorage.setItem("darkMode", cambio);
      window.location.reload();
    },
  },
};
</script>

<style scoped>
button {
  position: fixed;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 2em;
  bottom: 5%;
  right: 3%;
}
</style>
