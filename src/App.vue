<template>
  <HeaderGeneral v-if="mostrar" />
  <!-- Esto es solo para que me deje de tirar la advertencia de que no lo estoy usando -->
  <FontAwesomeIcon class="invisible"></FontAwesomeIcon>
  <router-view />
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";
import HeaderGeneral from "@/components/header.vue";

export default {
  components: {
    FontAwesomeIcon,
    HeaderGeneral,
  },
  data() {
    return {
      mostrar: true,
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
</style>
