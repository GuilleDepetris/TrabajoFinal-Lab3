<template>
  <div :class="{ 'dark-mode': darkMode }" class="dark">
    <HeaderGeneral v-if="mostrar" />
    <DarkMode />
    <router-view />
  </div>
</template>
<script>
import DarkMode from "./components/DarkMode.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import HeaderGeneral from "@/components/header.vue";

export default {
  components: {
    HeaderGeneral,
    DarkMode,
  },
  data() {
    return {
      mostrar: true,
      darkMode: localStorage.getItem("darkMode") === "true",
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");
* {
  padding: 0;
  margin: 0;
}
.invisible {
  display: none;
}
.dark-mode {
  background-color: #202020;
  color: #fff;
  min-height: 100vh;
  max-height: 500vh;
}
body {
  overflow-x: hidden;
}
</style>
