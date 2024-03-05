<template>
  <section class="section section-genre">
    <h2 class="heading-2">Genres</h2>
    <TileGenre />
  </section>
  <section class="section section-latest-track">
    <h2 class="heading-2 heading-link" @click.prevent="goToNewReleases">New Releases</h2>
    <CarouselTrack :tracks="latestTracks" />
  </section>
  <section class="section section-top-track">
    <h2 class="heading-2 heading-link" @click.prevent="goToTopTracks">Top Tracks</h2>
    <TileTrack :tracks="topTracks" />
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
import { getTopChannels, getTopTracks } from '@/helper/top'
import { getLatestTracks } from '@/helper/latest'
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
    topChannels: []
  }),
  methods: {
    goToTopTracks() {
      this.$router.push('/top')
    },
    goToNewReleases() {
      this.$router.push('/new-releases')
    },
    async getExploreData() {
      this.topChannels = await getTopChannels(16)
      this.topTracks = await getTopTracks(16)
      this.latestTracks = await getLatestTracks()
    }
  },
  async mounted() {
    await this.getExploreData()
  }
}
</script>

<style></style>
