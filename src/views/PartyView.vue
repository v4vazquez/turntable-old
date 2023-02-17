<template>
<loader-layout> 
<div class="container">
    <div class="playlist">
        <ul>
        <li v-for="song in songs" :key="song.id">
            <img :src="song.picture" alt="album cover" class="albumImage">
            <div class="song-details">
            <p>{{ song.name }}</p>
            <p>{{ song.artist }}</p>
            </div>
        </li>
        </ul>
    </div>
  <div class="song-search">
      <div>
        <h2> {{currentEventName}} </h2>
        <h3>{{currentEventDescription}}</h3>
      </div>
      <div class="search-full-container">
        <input type="text" v-model="searchQuery">
        <button @click="searchSong">Search</button>
        <div class="dont-show" v-if="showControls">
          <p>Song Name: {{ name }}</p>
          <p>Song Artist: {{ artist }}</p>
          <img :src="picture" alt="Song picture" id="searchImage">
          <button @click="addSong">Add Song</button>
        </div>
      </div>
  </div>
  <div class="suggested">
    <ul>
      <li v-for="song in suggestedSongs" :key="song.id">
        <img :src="song.picture" alt="album cover" class="albumImage">
        <div class="song-details">
          <p>{{ song.name }}</p>
          <p>{{ song.artist }}</p>
        </div>
        <p>Likes: {{ song.likes }}</p>
        <button v-on:click="addLike(song.songId)">Like</button>
      </li>
    </ul>
  </div>
</div>
</loader-layout>
</template>

<script>
import EventService from '../services/EventService'
import SongService from '../services/SongService'
import LoaderLayout from '../layout/LoaderLayout.vue';

export default {
  computed: {
      showControls() {
        if (this.songId != "") {
          return true;
        }
        return false;
      }
  },
  components: { LoaderLayout },
    data() {
        return {
            songs: [],
            suggestedSongs: [],
            currentEventId: -1,
            searchQuery: '',
            songId: "",
            name: "",
            artist: "",
            picture: "",
            currentEventName: "",
            currentEventDescription:""
            
        }
    },
    methods: {
    getPlaylist() {
      SongService.getPlaylist(this.$route.params.id)
        .then(response => {
          this.songs = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getSuggested() {
      SongService.getSuggested(this.$route.params.id)
        .then(response => {
          this.suggestedSongs = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    searchSong() {
      SongService.searchSong(this.searchQuery)
        .then(response => {
          this.songId = response.data.songId;
          this.name = response.data.name;
          this.artist = response.data.artist;
          this.picture = response.data.picture;
        });
        
    },
    addSong() {
      const eventId = this.$route.params.id;
      const viewedSong = {
        songId: this.songId,
        name: this.name,
        artist: this.artist,
        picture: this.picture
      };
      SongService.addSongToSuggested(viewedSong, eventId)
        .then(() => {
          console.log('Song added successfully!');
        });
        this.getSuggested();
        this.getPlaylist();
    },
    addLike(songId) {
      SongService.incrementLikes(this.$route.params.id, songId)
      this.getSuggested();
      this.getPlaylist();
    },

  },
  created() {
    this.getPlaylist();
    this.getSuggested();
    EventService.getEvent(this.$route.params.id).then((response) => {
      console.log(response)
      this.currentEventName = response.data.eventName;
      this.currentEventDescription = response.data.description;
    });
    this.interval = setInterval(() => {
      this.getPlaylist();
      this.getSuggested();
    }, 500);
  },
  
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content:space-evenly;
    align-content: center;
    margin-top: 50px;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: rgba(33, 27, 61, 0.7);
  border-radius: 50px;
  padding: 7px 5px 7px 20px;
  border: 0px;
}

.albumImage {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 10px;
}

.song-details {
  flex: 1;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.song-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.song-id {
  font-weight: bold;
  margin-bottom: 10px;
}

.picture img {
  width: 50px;
  height: 50px;
  /* object-fit: cover; */
  margin-bottom: 10px;
}

.search-full-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#searchImage {
  height: 333px;
  width: 333px;
  border: 1px black solid;
  align-items: center;

}
</style>