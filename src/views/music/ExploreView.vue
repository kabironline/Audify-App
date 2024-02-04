<template>
  <section class="section section-genre">
    <h2 class="heading-2">Genres</h2>
    <TileGenre />
  </section>
</template>

<script>
import TileGenre from '@/components/TileGenre.vue'
export default {
  name: 'ExploreView',
  components: {
    TileGenre
  }
}
</script>

<style></style>
