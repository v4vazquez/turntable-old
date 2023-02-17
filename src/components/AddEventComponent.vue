<!-- added this ENTIRE page 2/7 -->

<template>
<loader-layout> 
  <div>

      <div class="user-avatar">
        <div class="user-avatar-image"></div>
        <p> Welcome to the party, {{appUser.username}}!</p>
      </div>

      <form class ="edit-event-form" >
           <h3> Lets make a party!</h3>
           <label for="eventTitle"> The name of your party: </label>
          <input type="text" placeholder="Ex: Spongebob Rave Playlist" v-model="event.eventName">
          <label for="eventDescription">Event Description:</label>
          <textarea placeholder="What is your party about?" v-model="event.description"></textarea>         
          <!-- <button v-on:click="goBack">Go Back</button> -->
          <label for="eventDropdown">Select a Dj:</label>
        <select id="dropdown" v-model="selectedDJ">
        <option disabled value="">Select a DJ</option>
        <option v-for="dj in djs" :key="dj" :value="dj.id">{{dj.username}}</option>
      </select><br>
      <button id ="button" v-on:click.prevent="saveEvent">Save</button>
      </form>
      <!-- <div v-if="error">{{error}}</div> -->
        <div>
    
    </div>
    
  </div> 
</loader-layout>
</template>

<script>
import EventService from "../services/EventService";
export default {
  components: { },
    data(){
        return{
            event: {
                description: "",
                eventName: ""
            },
            selectedDJ:-1,
            djs:[],
            appUser: '',
            
        };
    },
    created(){
        EventService.getDjs()
        .then(response =>{
            this.djs = response.data;
        })
        
    },
    mounted: function () {
    const user = JSON.parse(window.localStorage.getItem('user'));
    this.appUser = user; 
    },
    methods:{
        saveEvent(){
            EventService.createEvent(this.event, this.selectedDJ).then(
                (response) =>{
                if(response.status==201){
                    this.$router.push("/hostEvents");
                }
            })
            .catch(error => {
                console.error("error saving event", error);
                this.error = "An error occurred while saving the event";
            });
        },
        clearForm(){
            this.eventTitle = "";
            this.eventDescription = "";
        },
      
    }
}
</script>
<style>
.edit-event-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;
}
.user-avatar{
  position: absolute;
  right: 25px; 
  top: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 500px;
  font-weight: bolder;
}
#dropdown{
    width:150px;
}
input,
textarea {
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid gray;
  border-radius: 25px;
  box-shadow: 0px 0px 10px rgb(255, 228, 251);

}
button {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: lightgray;
  cursor: pointer;
}
</style>