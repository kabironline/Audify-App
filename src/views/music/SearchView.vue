<template>
  <section class="section section-search-results" v-if="!noData">
    <div v-show="showComponent(tracks)">
      <h2 class="heading-2">Similar Tracks</h2>
      <CarouselTrack :tracks="tracks" />
    </div>
    <div v-show="showComponent(channels)">
      <h2 class="heading-2">Similar Channels</h2>
      <TileChannel :channels="channels" />
    </div>
    <div v-show="showComponent(playlists)">
      <h2 class="heading-2">Similar Playlists</h2>
      <TilePlaylist :playlists="playlists" />
    </div>
    <div v-show="showComponent(albums)">
      <h2 class="heading-2">Similar Albums</h2>
      <CarouselAlbum :albums="albums" />
    </div>
  </section>
  <div class="error-container" v-else>
    <h2 class="heading-2">No results found</h2>
    <br />
    <p class="error-message">
      Try adjusting your search or browse for some of our trending content.
    </p>
    <br />
    <BtnNavigation text="Explore" to="/explore" />
  </div>
</template>

<script>
import { search } from '@/api/search'
import CarouselAlbum from '@/components/CarouselAlbum.vue'
import CarouselTrack from '@/components/CarouselTrack.vue'
import TileChannel from '@/components/TileChannel.vue'
import TilePlaylist from '@/components/TilePlaylist.vue'
import BtnNavigation from '@/components/BtnNavigation.vue'
export default {
  name: 'SearchView',
  components: {
    CarouselAlbum,
    CarouselTrack,
    TileChannel,
    TilePlaylist,
    BtnNavigation
  },
  data() {
    return {
      search: '',
      albums: [],
      tracks: [],
      channels: [],
      playlists: [],
      loading: true
    }
  },
  computed: {
    noData() {
      return (
        !this.loading &&
        this.albums.length === 0 &&
        this.tracks.length === 0 &&
        this.channels.length === 0 &&
        this.playlists.length === 0
      )
    }
  },
  methods: {
    async updateSearch() {
      const response = await search(this.search)
      if (response) {
        // check if there is genre in the response
        if (response.genre) {
          this.$router.push(`/genre/${response.genre.id}/tracks`)
        }

        this.albums = response.albums
        this.tracks = response.tracks
        this.channels = response.channels
        this.playlists = response.playlists

        this.loading = false
      }
    },
    showComponent(component) {
      return this.loading ? true : component.length > 0
    }
  },
  async mounted() {
    this.search = this.$route.query.q

    await this.updateSearch()

    this.$watch(
      () => this.$route.query.q,
      async () => {
        this.search = this.$route.query.q
        this.loading = true
        await this.updateSearch()
      }
    )
  }
}
</script>

<style lang="scss" scoped></style>
