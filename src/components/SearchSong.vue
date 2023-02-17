<template>
  <div class="container">

      <div class="search-container">
        <input type="text" v-model="searchQuery">
        <button @click="searchSong">Search</button>
      </div>

    <p>Song Name: {{ name }}</p>
    <p>Song Artist: {{ artist }}</p>

    <div id="search-img">
    <img src="https://i.scdn.co/image/ab67616d0000b273811bfdc4f55b3a7484524aaf" alt="Song picture" id="searchedimg" height="200" width="200">
    </div>
    
    <button @click="addSong">Add Song</button>
  </div>
</template>

<script>
import SongService from '../services/SongService';
export default {
  data() {
    return {
      eventId: -1,  
      searchQuery: '',
      songId: null,
      name: null,
      artist: null,
      picture: null,
    };
  },
  methods: {
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
    }
  },
};
</script>

<style scoped>
/* button {

} */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 200px;
  height: 200px;
  /* object-fit: cover; */
  margin-bottom: 10px;
}

#searchedimg {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  margin: auto;
}


</style>