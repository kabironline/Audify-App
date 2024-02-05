<template>
  <section class="section section-genre">
    <h2 class="heading-2">Genres</h2>
    <TileGenre />
  </section>
  <section class="section section-latest-track">
    <h2 class="heading-2 heading-link" @click.prevent="goToNewReleases">New Releases</h2>
    <CarouselTrack />
  </section>
  <section class="section section-top-track">
    <h2 class="heading-2 heading-link" @click.prevent="goToTopTracks">Top Tracks</h2>
    <TileTrack />
  </section>
  <section class="section section-top-channel">
    <h2 class="heading-2">Top Channels</h2>
    <TileChannel />
  </section>
</template>

<script>
import TileGenre from '@/components/TileGenre.vue'
import TileTrack from '@/components/TileTrack.vue'
import CarouselTrack from '@/components/CarouselTrack.vue'
import TileChannel from '@/components/TileChannel.vue'

import router from '@/router'
export default {
  name: 'ExploreView',
  components: {
    TileGenre,
    TileTrack,
    TileChannel,
    CarouselTrack
  },
  methods: {
    goToTopTracks() {
      router.push('/top')
    },
    goToNewReleases() {
      router.push('/new-releases')
    }
  }
}
</script>

<style></style>
