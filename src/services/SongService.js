import axios from "axios";

export default {
    getPlaylist(eventId) {
        return axios.get(`songs/playlist/${eventId}`);
    },
    getSuggested(eventId) {
        return axios.get(`songs/suggested/${eventId}`);
    },
    addSongToSuggested(song, eventId) {
        return axios.post(`songs/addsong/suggested/${eventId}`, song)
    },
    addSongToPlaylist(eventId, songId) {
        return axios.put(`songs/addsong/${eventId}/${songId}`)
    },
    deleteSuggestedSong(eventId, songId) {
        return axios.delete(`songs/deleteSong/suggested/${eventId}/${songId}`)
    },
    deletePlaylistSong(eventId, songId) {
        return axios.delete(`songs/deleteSong/playlist/${eventId}/${songId}`)
    },
    searchSong(songName) {
        return axios.get(`spotify-search/${songName}`)
    },
    incrementLikes(eventId, songId) {
        return axios.put(`songs/likes/${eventId}/${songId}/increment`)
    },
    getLikes(eventId, songId) {
        return axios.get(`songs/likes/${eventId}/${songId}`)
    }

}