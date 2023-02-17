<template>
<loader-layout>
  <div class="container">
    <div id="register" class="text-center">

      <div class="about-section">
        
        <div class="about-text">
          <h2>About</h2>
          <p>
            Turntable allows users to attend parties through a code provided by the party host. It gives guests the ability to recommend songs for a shared playlist and vote on the existing ones. The designated DJ will then connect and incorporate those chosen songs into the party playlist. Whether you're in the mood for some classic hits or the latest chart-topping tracks, Turntable is the perfect platform for music lovers to come together and make the party come alive. 
          </p>
        </div>
      </div>

      <form class="form-register" @submit.prevent="register">
        <h1 class="h3 mb-3 font-weight-normal">Create Account</h1>
        <div class="alert alert-danger" role="alert" v-if="registrationErrors">
          {{ registrationErrorMsg }}
        </div>
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

        <input
          type="password"
          id="confirmPassword"
          class="form-control"
          placeholder="Confirm Password"
          v-model="user.confirmPassword"
          required
        />

        <router-link :to="{ name: 'login' }">Have an account?</router-link>
        
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Create Account
        </button>

        <select v-model="user.role" required>
          <option value="" disabled selected>Select an Option</option>
          <option value="DJ">DJ</option>
          <option value="Host">Host</option>
        </select>
      </form>
    </div>
  </div>
  </loader-layout>
</template>

<script>
import LoaderLayout from '../layout/LoaderLayout.vue';
import authService from "../services/AuthService";
export default {
  components: { LoaderLayout },
  name: "register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: "",
        role: "",
      },
      registrationErrors: false,
      registrationErrorMsg: "There were problems registering this user.",
    };
  },
   
  methods: {
    
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.registrationErrors = true;
        this.registrationErrorMsg = "Password & Confirm Password do not match.";
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.$router.push({
                path: "/login",
                query: { registration: "success" },
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            this.registrationErrors = true;
            if (response.status === 400) {
              this.registrationErrorMsg = "Bad Request: Validation Errors";
            }
          });
      }
    },
    clearErrors() {
      this.registrationErrors = false;
      this.registrationErrorMsg = "There were problems registering this user.";
    },
  },
 
};
</script>

<style scoped>

select {
  color: black;
}
.container {
  display: flex;
  justify-content: space-between;
  width: 1080px;
  max-width: 100%;
  margin: 0px auto;
}
/* .about-section img {
  max-width: 100%;
} */
.about-section {
  padding: 30px;
  flex: 1;
  width: 350px;
  margin-right: 40px;
  /* align-items: flex-end;
  justify-content: center; */
  background-color: rgba(33, 27, 61, 0.7);
  border-radius: 25px;
  box-shadow: 0px 0px 10px rgb(255, 228, 251);


}

#register {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
}

.form-register {
  width: 500px;
  margin: 20px;
  padding: 30px;
  background-color: rgba(33, 27, 61, 0.5);
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgb(255, 228, 251);}

.form-control {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px #ccc;
}

select {
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
  background-color: rgba(176, 6, 182, 0.8);
  color: #fff;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: rgba(33, 27, 61);
}
</style>
