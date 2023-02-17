<template>
  <div class="guest-suggestions">
    <ul>

      <li v-for="song in songs" :key="song.id">
        <img :src="song.picture" alt="album cover" class="albumImage">
        <div class="song-details">
          <p>{{ song.name }}</p>
          <p>{{ song.artist }}</p>
        </div>
        
        <p>Likes {{ song.likes }}</p>

        <button @click="addSongToPlaylist(song.songId)">Add Song</button>
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
  created() {
    this.getSuggested();
  },
  methods: {
      addSongToPlaylist(songId) {
          //TODO: call this.getSuggested only after promise is resolved.
          SongService.addSongToPlaylist(this.currentEventId, songId).then(
            (response) => {
              if (response.status == 200) {
                this.getSuggested();
              }
            }
          )
          
      },
      deleteSong(songId) {
          SongService.deleteSuggestedSong(this.currentEventId, songId)
          this.getSuggested();
          
      },
      getSuggested() {
        EventServices.getEventIdFromDj().then((response) => {
        this.currentEventId = response.data;
        SongService.getSuggested(this.currentEventId)
        .then(response => {
          this.songs = response.data;
        })
        .catch(error => {
          console.error(error);
        });
        
    });
    }
  }
  
}
</script>

<style scoped>

* {
  font-family: "Righteous", cursive;
  font-size: 15px;
}

li {
  border-radius: 20px;
}

.albumImage {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

.song-details {
  flex: 1;
}
.guest-suggestions{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: rgba(33, 27, 61, 0.5);
  border-radius: 50px;
  padding: 20px;
  width: 400px;
}
</style>
