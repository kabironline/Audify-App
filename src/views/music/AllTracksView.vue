<template>
  <section class="section">
    <h2 class="heading-2">
      {{ heading }}
    </h2>
    <CarouselTrack :tracks="tracks" />
  </section>
</template>

<script>
import CarouselTrack from '@/components/CarouselTrack.vue'
import { getTopTracks, getLatestTracks, getGenreTracks } from '@/helper/getters'
export default {
  name: 'AllTracksView',
  components: {
    CarouselTrack
  },
  data: () => ({
    tracks: []
  }),
  props: {
    heading: {
      type: String,
      default: 'All Tracks'
    }
  },
  async created() {
    const route_name = this.$route.name
    if (route_name === 'new-releases') {
      this.tracks = await getLatestTracks(30)
    } else if (route_name === 'top-tracks') {
      this.tracks = await getTopTracks(30)
    } else if (route_name === 'genre-tracks') {
      const genre = this.$route.params.genreId
      this.tracks = await getGenreTracks(genre)
      // edit the heading
    }
  }
}
</script>
@/helper/getters
