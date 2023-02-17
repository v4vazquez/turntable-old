<template>
  <loader-layout> 
  <div>
    <form class="edit-event-form">
      <h3> Edit Event</h3>

      <label for="eventTitle"> Event title: </label>
      <input type ="text" id="eventTitle" v-model="event.eventName">
     
      <label for="eventDescription">Event Description:</label>
      <textarea id="eventDescription" v-model="event.description"></textarea>
      
    <div class="buttons">
      <button v-on:click.prevent="saveEvent" >Save</button>
    </div>
  
    </form>
    
  </div>
  </loader-layout>
</template>

<script>
import LoaderLayout from '../layout/LoaderLayout.vue';
import EventService from "../services/EventService";

export default {
 components: { LoaderLayout },

  data() {
    return {
          event: {
                description: "",
                eventName: ""
            },
            eventNumber:-1

        
    };
  },

  methods: {
    saveEvent() {
      EventService.updateEvent(this.eventNumber,this.event).then((response) => {
        if (response.status === 200) {
          this.$router.push({ name: "hostEvents" });
        }
      });
    }
  },
  created(){
    this.eventNumber = this.$route.params.id
  }
 
  
    

};
</script>

<style>
.edit-event-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;
}

label {
  margin: 10px 0;
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

/* .buttons {
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin-top: 20px;
} */

button {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid gray;
  background-color: lightgray;
  cursor: pointer;
}
</style>