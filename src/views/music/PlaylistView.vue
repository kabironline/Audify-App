<template>
  <section class="section section-album-header">
    <div class="playlist-header__image">
      <img
        v-if="!isPlaylist"
        src="https://picsum.photos/500/500?random=1"
        alt="{{playlist.name}}"
        class="album-header__image__img"
      />
    </div>
    <div class="playlist-header">
      <h2 class="heading-2">
        {{ playlist.name }}
      </h2>
      <p class="playlist-header__description" v-show="playlist.description != ''">
        Description: {{ playlist.description }}
      </p>
      <p class="playlist-header__description">
        {{ isPlaylist ? playlist.user.nickname : playlist.channel.name }} •
        {{ playlist.tracks.length }} songs,
        {{ playlistDuration }}
      </p>

      <div class="playlist-header__buttons">
        <BtnAction icon="play_arrow" text="Play" />
        <BtnAction text="Edit Album" color="dark" />
        <BtnAction text="Delete Album" color="dark" @click.prevent="deleteModalVisible = true" />
        <AlbumDeleteModal
          :visible="deleteModalVisible"
          @toggleVisible="deleteModalVisible = false"
        />
      </div>
    </div>
  </section>
  <hr class="hr" />
  <section class="section section-playlist-songs" v-if="!showNoTracks">
    <ListTracks :tracks="this.playlist.tracks" :isInPlaylist="true" @updateRating="updateRating" />
  </section>
  <section class="section section-playlist-songs" v-else>
    <h2 class="heading-2">No tracks in this playlist</h2>
  </section>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import ListTracks from '@/components/ListTracks.vue'
import AlbumDeleteModal from '@/components/Modals/AlbumDeleteModal.vue'
import { formatDurationWords } from '@/helper/format'
import { getPlaylist } from '@/helper/getters'
import { toRaw } from 'vue'

export default {
  name: 'PlaylistView',
  components: { ListTracks, BtnAction, AlbumDeleteModal },
  data() {
    return {
      isLoading: true,
      deleteModalVisible: false,
      isPlaylist: true,
      playlist: {
        id: 1,
        name: 'Album Name',
        description: 'Album Description',
        user: {
          nickname: 'Author Name'
        },
        tracks: [],
        items: 10
      }
    }
  },
  computed: {
    playlistDuration() {
      let sum = 0
      this.playlist.tracks.forEach((track) => {
        sum += track.duration
      })
      return formatDurationWords(sum)
    },
    showNoTracks() {
      return !this.playlist.tracks.length && !this.isLoading
    }
  },
  methods: {
    updateRating(index, rating) {
      this.playlist.tracks[index].rating = rating
    }
  },
  async beforeMount() {
    // Checking the route if it is a playlist or an album
    // Fetching the playlist/album data from the server using the id from the route
    const type = this.$route.path.split('/')[1]
    const id = this.$route.params.id
    if (type === 'playlist') {
      this.isPlaylist = true
      this.playlist = toRaw(await getPlaylist(id))
    }
    this.isLoading = false
  }
}
</script>

<style>
.section-album-header {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.album-header__image__img {
  height: 30rem;
  border-radius: 1rem;
  aspect-ratio: 1;
  object-fit: cover;
}

.playlist-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
}

.playlist-header__buttons {
  display: flex;
  gap: 2rem;
}
</style>
