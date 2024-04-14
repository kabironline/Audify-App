<template>
  <section class="section">
    <h2 class="heading-2">
      {{ heading }}
    </h2>
    <CarouselAlbum :albums="albums" />
  </section>
</template>

<script>
import { getChannelAlbums } from '@/api/album'
import CarouselAlbum from '@/components/CarouselAlbum.vue'
import { getLatestAlbums } from '@/helper/getters'
export default {
  name: 'AllAlbumView',
  components: {
    CarouselAlbum
  },
  props: {
    heading: {
      type: String,
      default: 'All Albums'
    }
  },
  data() {
    return {
      albums: []
    }
  },
  async mounted() {
    const routeName = this.$route.name
    if (routeName === 'channel-albums') {
      const channelId = this.$route.params.channelId
      const albums = await getChannelAlbums(channelId)
      this.albums = albums
    } else if (routeName === 'new-album-releases') {
      const albums = await getLatestAlbums(30)
      this.albums = albums
    }
  }
}
</script>
