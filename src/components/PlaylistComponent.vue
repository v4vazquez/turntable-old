<template>

   
        <div class="dj-selects" >
          <ul>
      <li v-for="song in songs" :key="song.id" class="song-list">
        <img :src="song.picture" alt="album cover" class="albumImage">
        <div class="song-details">
          <p>{{ song.name }}</p>
          <p>{{ song.artist }}</p>
        </div>
        <button @click="playSong(song.songId)">Select</button>
        <button @click="deleteSong(song.songId)">Delete</button>
      </li>  
      </ul>
      </div>
    

</template>

<script>
import SongService from '../services/SongService'
import EventServices from '../services/EventService'
export default {
  data() {
    return {
      songs: [],
      currentEventId: -1
    }
  },
  methods: {
    playSong(songId) {
      this.$store.commit("CHANGE_TRACK", songId);
    },
    deleteSong(songId) {
      SongService.deletePlaylistSong(this.currentEventId, songId)
      this.getPlaylist();
    },
    getPlaylist() {
      EventServices.getEventIdFromDj().then((response) => {
      this.currentEventId = response.data;
      SongService.getPlaylist(this.currentEventId)
        .then(response => {
          this.songs = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    });
    }
  },
  created() {
    this.getPlaylist();
    this.interval = setInterval(() => {
      this.getPlaylist();
    }, 500);
  },
}
</script>

<style scoped>

button {
    margin-right: 20px;
}
.playButton {
  padding-right: 20px;
}

* {
  font-family: "Righteous", cursive;
  font-size: 15px;
}

.albumImage {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.song-details {
  flex: 1;
}

.dj-selects {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: rgba(33, 27, 61, 0.5);
  border-radius: 50px;
  padding: 20px;
  width: 400px;
}

</style>
