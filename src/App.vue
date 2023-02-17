<template>
  <div
    id="everything"
    v-bind:style="`background-image:url(${require('./views/landing-Page.png')})`"
  >
  
    <div id="app">
      <div id="nav" class ="logo">
        <router-link 
        v-bind:to="{name: 'login'}"
        > 
        <img src="../src/assets/turntableLogo-v2.png" alt ="turntable logo" class ="turntable-logo"/> </router-link>

      </div>

      <router-view />
    </div>
  </div>
</template>

<script>
</script>

<style>
.turntable-logo {
  width: 400px;
}

.logo {
    padding-top: 10px;
    margin-left: 10px;
    width: 350px;
  }
#app {
  background-color: rgba(33, 27, 61, 0.5);
  height: 100vh;
  width: 100vw;
}
#app > * {
  color: white;
  font-family: "Roboto", sans-serif;
}
#everything {
  background-size: cover;
}
</style>
