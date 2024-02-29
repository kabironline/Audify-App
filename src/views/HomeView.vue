<template>
  <main>
    <section class="section section-latest-track">
      <h2 class="heading-2">Latest Tracks</h2>
      <!-- Track Carousel -->
      <CarouselTrack :tracks="recents" />
    </section>
    <section class="section section-latest-album">
      <h2 class="heading-2">Latest Albums</h2>
      <!-- Album Carousel -->
      <CarouselAlbum />
    </section>
    <section class="section section-latest-playlist">
      <h2 class="heading-2 mb-medium">Latest Playlists</h2>
      <!-- Playlist Tiles -->
      <TilePlaylist />
    </section>
    <!-- <section class="section section-recent-tracks">
      <h2 class="heading-2 mb-medium">Recent Tracks</h2>
      <CarouselTrack :tracks="recents" />
    </section> -->
  </main>
</template>
<script>
import CarouselTrack from '@/components/CarouselTrack.vue'
import CarouselAlbum from '@/components/CarouselAlbum.vue'
import TilePlaylist from '@/components/TilePlaylist.vue'
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia'
export default {
  name: 'HomeView',
  components: {
    CarouselTrack,
    CarouselAlbum,
    TilePlaylist
  },
  data: () => ({
    recents: []
  }),
  methods: {
    ...mapActions(useUserStore, ['getUserRecents'])
  },
  async created() {
    const data = await this.getUserRecents()
    this.recents = data
  }
}
</script>
