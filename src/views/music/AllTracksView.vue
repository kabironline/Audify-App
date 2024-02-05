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
export default {
  name: 'AllTracksView',
  components: {
    CarouselTrack
  },
  props: {
    tracks: {
      type: Array
    },
    heading: {
      type: String,
      default: 'All Tracks'
    }
  }
}
</script>

<style></style>
