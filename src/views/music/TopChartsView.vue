<template>
  <section class="section">
    <h2 class="heading-2">Top Tracks</h2>
    <CarouselTrack :tracks="topTracks" />
  </section>
</template>

<script>
import CarouselTrack from '@/components/CarouselTrack.vue'
import { getTopTracks } from '@/helper/getters'
export default {
  name: 'TopChartsView',
  data: () => ({
    topTracks: []
  }),
  components: {
    CarouselTrack
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    }
  },
  async mounted() {
    this.topTracks = await getTopTracks(30)
  }
}
</script>

<style></style>
