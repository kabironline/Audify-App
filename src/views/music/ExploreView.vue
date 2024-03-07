<template>
  <section class="section section-genre">
    <h2 class="heading-2">Genres</h2>
    <TileGenre :genres="genres" />
  </section>
  <section class="section section-latest-track">
    <h2 class="heading-2 heading-link" @click.prevent="goToNewReleases">New Releases</h2>
    <CarouselTrack :tracks="latestTracks" />
  </section>
  <section class="section section-top-track">
    <h2 class="heading-2 heading-link" @click.prevent="goToTopTracks">Top Tracks</h2>
    <TileTrack :tracks="topTracks" />
  </section>
  <section class="section section-top-track">
    <h2 class="heading-2 heading-link">Top Rated Tracks</h2>
    <TileTrack :tracks="topRatedTracks" />
  </section>
  <section class="section section-top-channel">
    <h2 class="heading-2">Top Channels</h2>
    <TileChannel :channels="topChannels" />
  </section>
</template>

<script>
import TileGenre from '@/components/TileGenre.vue'
import TileTrack from '@/components/TileTrack.vue'
import TileChannel from '@/components/TileChannel.vue'
import CarouselTrack from '@/components/CarouselTrack.vue'
import {
  getTopChannels,
  getTopTracks,
  getLatestTracks,
  getGenres,
  getTopRatedTracks
} from '@/helper/getters'
export default {
  name: 'ExploreView',
  components: {
    TileGenre,
    TileTrack,
    TileChannel,
    CarouselTrack
  },
  data: () => ({
    latestTracks: [],
    topTracks: [],
    topRatedTracks: [],
    topChannels: [],
    genres: []
  }),
  methods: {
    goToTopTracks() {
      this.$router.push('/top/tracks')
    },
    goToNewReleases() {
      this.$router.push('/new-releases')
    },
    async getExploreData() {
      getGenres().then((genres) => {
        this.genres = genres
      })
      getLatestTracks().then((latestTracks) => {
        this.latestTracks = latestTracks
      })
      getTopTracks(16).then((topTracks) => {
        this.topTracks = topTracks
      })
      getTopRatedTracks(16).then((topRatedTracks) => {
        this.topRatedTracks = topRatedTracks
      })
      getTopChannels(16).then((topChannels) => {
        this.topChannels = topChannels
      })
    }
  },
  async mounted() {
    await this.getExploreData()
  }
}
</script>

<style></style>
@/helper/getters
