<template>
    <div>
        <iframe class="spot" style="border-radius:50px" :src="trackUrl" width="100%" height="352" frameBorder="0" allowfullscreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in- picture" loading="lazy"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            trackUri: "4cOdK2wGLETKBW3PvgPWqT"
        };
    },
    computed: {
        trackUrl() {
            return `https://open.spotify.com/embed/track/${this.$store.state.currentTrack}?utm_source=generator&theme=0`;
        },
        
    }
};
</script>