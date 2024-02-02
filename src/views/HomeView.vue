<template>
  <main>
    <section class="section-recents">
      <h2 class="heading-2">Latest Tracks</h2>
      <!-- Track Carousel -->
      <TrackCarousel />
    </section>
  </main>
</template>
<script>
import TrackCarousel from '@/components/TrackCarousel.vue'
export default {
  name: 'HomeView',
  components: {
    TrackCarousel
  }
}
</script>
