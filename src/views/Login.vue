<template>
<div class ="centered-images">
<div class="form-container">
   
  <div id="login" class="text-center">

    <form class="form-signin" @submit.prevent="login">
      <h1 class="h3 mb-3 font-weight-normal">Please Sign In</h1>
      <div
        class="alert alert-danger"
        role="alert"
        v-if="invalidCredentials"
      >Invalid username and password!</div>
      <div
        class="alert alert-success"
        role="alert"
        v-if="this.$route.query.registration"
      >Thank you for registering, please sign in.</div>
      <label for="username" class="sr-only">Username</label>
      <input
        type="text"
        id="username"
        class="form-control"
        placeholder="Username"
        v-model="user.username"
        required
        autofocus
      />
      <label for="password" class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <router-link :to="{ name: 'register' }">Need an account?</router-link>

      <button type="submit">Sign in</button> 
    </form>
  </div>



  <div class="event-signin">
    <form>
      <label for="eventID" >Event number: </label>
      <input 
      type ="number"
      id="guestLogin"
      placeholder="Your party ID"
      v-model="idNumber"
      />
      <button type="submit" 
      @click.prevent="goToPage"
      > Go to event</button>
    </form>
  </div>
   
  </div>
</div>
</template>

<script>
import authService from "../services/AuthService";
import EventService from "../services/EventService";
export default {
  name: "login",
  components: {
    
  },

  data() {
    return {
      showLoader: true,
      idNumber: "",
      user: {
        username: "",
        password: "",
      },
      invalidCredentials: false,
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            // this.$router.push("/hostEvents");
            if (response.data.user.role === "ROLE_DJ") {
              this.$router.push("/djEvents");
            } else if (response.data.user.role === "ROLE_HOST") {
              this.$router.push("/hostEvents");
            }
          }
        })
        .catch((error) => {
          const response = error.response;

          if (response.status === 401) {
            this.invalidCredentials = true;
          }
        });
    },
    goToPage() {
      EventService.getEvent(this.idNumber).then((response) => {
        console.log("molly");
        if (response.status === 200 && response.data.length !== 0) {
          this.$router.push({ path: `/events/${this.idNumber}` });
        }
      });
    },
  },
};
</script>

<style>
.centered-images{
  display:flex;
  align-items: center;
  /* height:100%; */
  margin-top: 8%;

}
.entire-page {
    background-image: url('landing-Page.png');
    height: 100vh;
    width: 100vw;
    background-size: cover;
    position: fixed;
    top: 0px;
  }

  .form-container {
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1000px;
    max-width: 100%;
    margin: auto auto;
  }

  .form-signin, .event-signin {
    width: 500px;
    padding: 30px;
    background-color: rgba(33, 27, 61, 0.5);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgb(255, 228, 251);
    text-align: left;
    color: aliceblue;
    margin: 20px;
  }

  select, .form-control {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 5px #ccc;
    background-color: #fff;
  }

  button[type="submit"] {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: rgba(176, 6, 182, 0.85);
    color: #fff;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: rgba(33, 27, 61);
  }
</style>
