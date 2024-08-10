<template>
  <!-- Esto es solo para que me deje de tirar la advertencia de que no lo estoy usando -->
  <FontAwesomeIcon class="invisible"></FontAwesomeIcon>
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
.invisible {
  display: none;
}
</style>
