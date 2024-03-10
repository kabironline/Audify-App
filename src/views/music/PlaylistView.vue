<template>
  <section class="section section-album-header" v-if="isLoading">
    <div class="playlist-header__image">
      <v-skeleton-loader type="image" color="transparent" :height="300" :width="300" />
    </div>
    <div class="playlist-header">
      <v-skeleton-loader type="text" :width="300" color="transparent" />
      <v-skeleton-loader type="paragraph" :width="300" color="transparent" />
      <v-skeleton-loader type="text" :width="300" color="transparent" />

      <div class="playlist-header__buttons">
        <v-skeleton-loader type="button@3" :width="300" color="transparent" />
      </div>
    </div>
  </section>
  <section class="section section-album-header" v-else>
    <div class="playlist-header__image">
      <v-img
        v-if="!isPlaylist"
        :src="albumImage(playlist.id)"
        alt="{{playlist.name}}"
        class="album-header__image__img"
        cover
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
        {{ isPlaylist ? playlist.user.nickname : playlist.created_by.name }} •
        {{ playlist.tracks.length }} songs,
        {{ playlistDuration }}
      </p>

      <div class="playlist-header__buttons" v-if="!isPlaylist">
        <BtnAction icon="play_arrow" text="Play" @click.prevent="play()" />
        <BtnAction text="Edit Album" color="dark" />
        <BtnAction text="Delete Album" color="dark" @click.prevent="deleteModalVisible = true" />
        <AlbumDeleteModal
          :visible="deleteModalVisible"
          @toggleVisible="deleteModalVisible = false"
        />
      </div>
      <div class="playlist-header__buttons" v-else>
        <BtnAction icon="play_arrow" text="Play" color="white" @click.prevent="play()" />
        <BtnAction
          text="Edit Playlist"
          color="dark"
          @click.prevent="playlistEditModalVisible = true"
        />
        <BtnAction text="Delete Playlist" color="dark" @click.prevent="deleteModalVisible = true" />
        <PlaylistEditModal
          :visible="playlistEditModalVisible"
          @toggleVisible="playlistEditModalVisible = false"
          @updatePlaylist="updatePlaylist"
          :playlist="playlist"
        />
        <PlaylistDeleteModal
          :visible="deleteModalVisible"
          @toggleVisible="deleteModalVisible = false"
        />
      </div>
    </div>
  </section>
  <hr class="hr" />
  <section class="section section-playlist-songs" v-if="!showNoTracks">
    <ListTracks
      :tracks="this.playlist.tracks"
      :isInPlaylist="isPlaylist"
      @updateRating="updateRating"
    />
  </section>
  <section class="section section-playlist-songs" v-else>
    <h2 class="heading-2">No tracks in this playlist</h2>
  </section>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import ListTracks from '@/components/ListTracks.vue'
import AlbumDeleteModal from '@/components/Modals/AlbumDeleteModal.vue'
import PlaylistDeleteModal from '@/components/Modals/PlaylistDeleteModal.vue'
import PlaylistEditModal from '@/components/Modals/PlaylistEditModal.vue'
import { usePlayerStore } from '@/stores/player'
import { formatDurationWords } from '@/helper/format'
import { getPlaylist } from '@/api/playlist'
import { getAlbum } from '@/helper/getters'
import { toRaw } from 'vue'
import { albumImage } from '@/utils/http'

export default {
  name: 'PlaylistView',
  components: { ListTracks, BtnAction, AlbumDeleteModal, PlaylistDeleteModal, PlaylistEditModal },
  data() {
    return {
      isLoading: true,
      deleteModalVisible: false,
      playlistEditModalVisible: false,
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
    albumImage,
    updateRating(index, rating) {
      this.playlist.tracks[index].rating = rating
    },
    play() {
      const store = usePlayerStore()
      store.playPlaylist(this.playlist, 0, this.isPlaylist ? 'playlist' : 'album')
    },
    updatePlaylist(playlist) {
      this.playlist.name = playlist.name
      this.playlist.description = playlist.description
      this.playlistEditModalVisible = false
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
    } else if (type === 'album') {
      this.playlist = toRaw(await getAlbum(id))
      this.isPlaylist = false
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
