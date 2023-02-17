<template>
  <loader-layout> 
    <h1>See Ya Wouldn't Wanna Be Ya</h1>
  </loader-layout>
</template>

<script>
import LoaderLayout from '../layout/LoaderLayout.vue';
export default {
  components: { LoaderLayout },
  created() {
    this.$store.commit("LOGOUT");
    this.$router.push("/login");
  }
};
</script>
