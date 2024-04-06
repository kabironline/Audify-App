<template>
  <section class="section">
    <h2 class="heading-2">
      {{ customHeading }}
    </h2>
    <CarouselTrack :tracks="tracks" v-if="!isTracksEmpty" />
    <div v-else class="empty">
      <p>No tracks found</p>
    </div>
  </section>
</template>

<script>
import CarouselTrack from '@/components/CarouselTrack.vue'
import { getTopTracks, getLatestTracks, getGenreTracks, getChannelTracks } from '@/helper/getters'
export default {
  name: 'AllTracksView',
  components: {
    CarouselTrack
  },
  props: {
    heading: {
      type: String,
      default: 'All Tracks'
    }
  },
  data: () => ({
    tracks: [],
    customHeading: '',
    loading: true
  }),
  computed: {
    isTracksEmpty() {
      return this.loading ? false : this.tracks.length === 0
    }
  },
  async created() {
    this.customHeading = this.heading
    const route_name = this.$route.name
    if (route_name === 'new-releases') {
      this.tracks = await getLatestTracks(30)
    } else if (route_name === 'top-tracks') {
      this.tracks = await getTopTracks(30)
    } else if (route_name === 'genre-tracks') {
      const genre = this.$route.params.genreId
      const data = await getGenreTracks(genre)
      this.tracks = data.tracks
      this.customHeading = `${data.genre.name}'s Tracks`
    } else if (route_name === 'channel-tracks') {
      const channelId = this.$route.params.channelId
      const data = await getChannelTracks(channelId)
      this.customHeading = `Tracks by ${data.channel.name}`
      this.tracks = data.tracks
    } else if (route_name === 'top-rated-tracks') {
      this.customHeading = `Top Rated Tracks`
      this.tracks = await getTopTracks(30)
    }
    this.loading = false
  }
}
</script>
@/helper/getters
