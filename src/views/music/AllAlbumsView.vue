<template>
  <section class="section">
    <h2 class="heading-2">
      {{ heading }}
    </h2>
    <CarouselAlbum :albums="albums" />
  </section>
</template>

<script>
import CarouselAlbum from '@/components/CarouselAlbum.vue'
export default {
  name: 'AllAlbumView',
  components: {
    CarouselAlbum
  },
  props: {
    tracks: {
      type: Array
    },
    heading: {
      type: String,
      default: 'All Albums'
    }
  }
}
</script>

<style></style>
