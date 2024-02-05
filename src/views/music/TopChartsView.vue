<template>
  <section class="section">
    <h2 class="heading-2">Top Tracks</h2>
    <CarouselTrack />
  </section>
  <section class="section">
    <h2 class="heading-2">Top Albums</h2>
    <CarouselAlbum />
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
  }
}
</script>

<style></style>
