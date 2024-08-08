<template>
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
</style>
