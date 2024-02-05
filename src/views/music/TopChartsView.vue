<template>
  <section class="section">
    <h2 class="heading-2 heading-link" @click.prevent="navigateTo('/top/tracks')">Top Tracks</h2>
    <CarouselTrack />
    <v-btn
      rounded="xl"
      class="btn btn--primary"
      color="primary"
      @click.prevent="navigateTo('/top/tracks')"
      >View More</v-btn
    >
  </section>
  <section class="section">
    <h2 class="heading-2 heading-link" @click.prevent="navigateTo('/top/albums')">Top Albums</h2>
    <CarouselAlbum />
    <v-btn
      rounded="xl"
      class="btn btn--primary"
      color="primary"
      @click.prevent="navigateTo('/top/albums')"
      >View More</v-btn
    >
  </section>
</template>

<script>
import CarouselTrack from '@/components/CarouselTrack.vue'
import CarouselAlbum from '@/components/CarouselAlbum.vue'
export default {
  name: 'TopChartsView',
  components: {
    CarouselTrack,
    CarouselAlbum
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style></style>
