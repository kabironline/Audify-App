<template>
  <main>
    <section class="section section-latest-track">
      <h2 class="heading-2">Recents Tracks</h2>
      <!-- Track Carousel -->
      <CarouselTrack :tracks="recents" />
    </section>
    <section class="section section-recent-tracks">
      <h2 class="heading-2 mb-medium">Latest Tracks</h2>
      <CarouselTrack :tracks="latestTracks" />
    </section>
    <section class="section section-latest-album">
      <h2 class="heading-2">Latest Albums</h2>
      <!-- Album Carousel -->
      <CarouselAlbum :albums="latestAlbums" />
    </section>
    <section class="section section-latest-playlist">
      <h2 class="heading-2 mb-medium">Latest Playlists</h2>
      <!-- Playlist Tiles -->
      <TilePlaylist :playlists="latestPlaylist" />
    </section>
  </main>
</template>
<script>
import CarouselTrack from '@/components/CarouselTrack.vue'
import CarouselAlbum from '@/components/CarouselAlbum.vue'
import TilePlaylist from '@/components/TilePlaylist.vue'
import { useUserStore } from '@/stores/user'
import { usePlayerStore } from '@/stores/player'
import { mapActions } from 'pinia'
import { getLatestTracks, getLatestAlbums, getLatestPlaylists } from '@/helper/getters'
export default {
  name: 'HomeView',
  components: {
    CarouselTrack,
    CarouselAlbum,
    TilePlaylist
  },
  data: () => ({
    recents: [],
    latestTracks: [],
    latestAlbums: [],
    latestPlaylist: []
  }),
  methods: {
    ...mapActions(useUserStore, ['getUserRecents']),
    async updateHomeData(recentsOnly = false) {
      this.recents = await this.getUserRecents()

      if (recentsOnly) return

      this.latestTracks = await getLatestTracks()
      this.latestAlbums = await getLatestAlbums()
      this.latestPlaylist = await getLatestPlaylists()
    }
  },
  async created() {
    await this.updateHomeData()

    const playerStore = usePlayerStore()
    playerStore.$onAction((mutation) => {
      if (mutation.name !== 'playTrack') return
      mutation.after(() => {
        this.updateHomeData(true)
      })
    })
  }
}
</script>
@/helper/getters
