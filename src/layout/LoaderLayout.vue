<template>

  <div>
    <header>
      <!-- <img src="../assets/turntableLogo-v2.png" alt ="turntable logo" class ="turntable-logo"/> -->
    
      <!-- <div class="user-avatar">
        <div class="user-avatar-image"></div>
        <p>{{appUser.username}}</p>
      </div> -->
      
    </header>

    <main>
      <slot v-if="showLoader === false" />
      <loading-gif v-if="showLoader === true"> </loading-gif>
    </main>

    <footer>  
      <div class="logout-link">
      <router-link
          v-bind:to="{ name: 'logout' }"
          v-if="$store.state.token != ''">
          Logout
        </router-link>
      </div> 
    </footer>

  </div>
</template>

<script>

import LoadingGif from '../components/LoadingGif.vue';
export default {
 components: { LoadingGif },
 data(){
   return {
     showLoader: true,
    //  appUser: ''
   }
 },

 mounted: function () {
    // const user = JSON.parse(window.localStorage.getItem('user'));
    // this.appUser = user;

    window.setTimeout(() => {
      this.showLoader = false;
    }, 1000);
  },
};
</script>
<style>
.logout-link{
  text-align: center;
}
</style>
