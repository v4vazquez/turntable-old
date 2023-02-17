<template>
  <loader-layout>
    <div>
      <div class="user-avatar">
        <div class="user-avatar-image"></div>
        <p>Welcome to the party, {{ appUser.username }}!</p>
      </div>

      <div class="upcoming-events">
        <ul v-for="event in events" :key="event.id">
          
          <div class="eventDiv">
            <li class="event-items-list">{{ event.eventName }}</li>

            <button class="add-edit" v-on:click.prevent="editEvent(event.eventId)">edit</button>

            <button class="add-edit" v-on:click.prevent="removeEvent(event.eventId)">
              delete
            </button>
          </div>
        </ul>
      </div>
      <!-- added this button below 2/7
        addEventComponent is basically inside this so if you add hostevents component
        it also includes addEventComponent. We can remove this.
      -->
      <div class="add-party">
      <button v-on:click.prevent="addEvent" type="submit">
        Add a party!
      </button>
      </div>

    </div>

  </loader-layout>
</template>

<script>
import EventService from "../services/EventService";
import LoaderLayout from "../layout/LoaderLayout.vue";
export default {
  components: { LoaderLayout },

  name: "host-events-component",

  data() {
    return {
      events: [],
      appUser: "",
    };
  },
  created() {
    this.populateEvents();
    this.isLoading = false;
  },
  mounted: function () {
    const user = JSON.parse(window.localStorage.getItem("user"));
    this.appUser = user;
  },
  methods: {
    editEvent(id) {
      this.$router.push({ name: `editEvent`, params: { id } });
    },
    addEvent() {
      this.$router.push({ name: "addEvent" });
    },
    removeEvent(eventId) {
      EventService.deleteEvent(eventId)
        .then((response) => {
          if (response.status === 200) {
            this.populateEvents();
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.$router.push("/404");
          } else {
            console.error(error);
          }
        });
    },

    populateEvents() {
      EventService.getAllEvents().then((response) => {
        this.events = response.data;
      });
    },
  },
};
</script>

<style scoped>
.add-edit{
 margin-right: 20px;
}
.eventDiv {
  display: flex;
  justify-content: space-between;
  
}

li.event-items-list {
  flex: 1;
  text-align: left;
  margin: auto;
  background-color: transparent;
  font-size: 25px;
  padding-left: 40px;
}

div.upcoming-events {
  margin: 50px auto;
  width: 75%;
}

.eventDiv {
  background-color: rgba(33, 27, 61, 0.7);
  display: flex;
  justify-content: space-between;
  border-radius: 50px;
  margin-bottom: 15px;
  padding: 15px 15px;
  text-align: center;
}

li {
  text-align: center;
  list-style-type: none;
  border: 0px;
}

.user-avatar {
  position: absolute;
  right: 25px;
  top: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 500px;
  font-weight: bolder;
}

.add-party {
  width: 175px;
  margin: 20px auto;
}
</style>