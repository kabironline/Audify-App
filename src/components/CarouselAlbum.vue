<template>
  <div class="track-carousel">
    <v-card
      v-for="track in tracks"
      :key="track"
      color="background"
      link
      class="track-carousel__item"
    >
      <div class="track-carousel__item--cover album-carousel__item--cover">
        <v-img
          :src="`https://picsum.photos/500/500?random=${track}`"
          class="track-carousel__item--img album-carousel__item--img"
        />
        <span class="material-symbols-rounded track-carousel__item--play"> play_arrow </span>
      </div>
      <div>
        <v-card-title class="d-flex flex-no-wrap justify-space-between align-center pa-0">
          <div class="track-carousel__item--title">Name of Album {{ track }}</div>
        </v-card-title>
      </div>
      <v-card-subtitle class="pa-0 track-carousel__item--artist pl-1">Channel Name</v-card-subtitle>
      <div class="mb-3"></div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'CarouselAlbum',
  props: {
    tracks: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    getTrackCoverUrl(trackId) {
      // Replace this with the logic to generate track cover URLs
      return `/api/tracks/${trackId}/cover`
    },
    shouldShowMenuItem(itemName) {
      // Implement logic for deciding which menu items to show
      // based on user permissions, track properties, etc.
      console.log(itemName)
      return true // Example implementation for now
    }
  }
}
</script>

<style>
.album-carousel__item--cover {
  aspect-ratio: 1/1;
}

.album-carousel__item--img {
  aspect-ratio: 1/1;
}
</style>
