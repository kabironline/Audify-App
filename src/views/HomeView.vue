<template>
  <main>
    <section class="section-latest-track">
      <h2 class="heading-2">Latest Tracks</h2>
      <!-- Track Carousel -->
      <CarouselTrack />
    </section>
    <section class="section-latest-album">
      <h2 class="heading-2">Latest Tracks</h2>
      <!-- Track Carousel -->
      <CarouselAlbum />
    </section>
  </main>
</template>
<script>
import CarouselTrack from '@/components/CarouselTrack.vue'
import CarouselAlbum from '@/components/CarouselAlbum.vue'
export default {
  name: 'HomeView',
  components: {
    CarouselTrack,
    CarouselAlbum
  }
}
</script>
