<template>
  <PlaylistAddModal
    :visible="addToPlaylistModal"
    :trackId="selectedTrack"
    @toggleVisible="toggleAddToPlaylistModal"
  />
  <ul class="track-list">
    <v-skeleton-loader
      v-for="track in 10"
      :key="track"
      class="track-tile-skeleton-loader"
      :border-radius="5"
      type="list-item-avatar"
      :height="50"
      v-show="!this.tracks.length"
      color="transparent"
    />
    <li
      v-for="(track, index) in tracks"
      :key="track.id"
      class="track-item"
      :class="{ 'track-item-selected': index === trackItemSelected }"
    >
      <div class="track-item__link" @click.prevent="isInPlayer ? playTrackAtIndex(index) : playIndividualTrack(track)">
        <div class="track-item__cover">
          <v-img :src="trackImage(track.id)" alt="" class="track-item__cover--img" />
          <i class="fas fa-play track-item__cover--playbutton"></i>
        </div>
        <span class="track-item__title">{{ track.name }}</span>
        <span class="track-item__artist"> {{ track.channel.name }}</span>
      </div>
      <div class="track-item__cta" v-if="!this.isInPlayer">
        <BtnIcon
          :color="thumbsUpColor(track.rating)"
          @click.prevent="updateRating(track, 1)"
          icon="thumb_up"
          :class="{ 'track-item__cta-link': track.rating !== 1 }"
        />
        <BtnIcon
          :color="thumbsDownColor(track.rating)"
          @click.prevent="updateRating(track, 0)"
          icon="thumb_down"
          :class="{ 'track-item__cta-link': track.rating !== 0 }"
        />
        <BtnIcon
          v-if="isInPlaylist"
          icon="remove"
          @click.prevent="removeTrackFromPlaylist(track.id, index)"
          class="track-item__cta-link"
        />
        <BtnIcon v-if="!isInPlaylist" icon="add" @click.prevent="openAddToPlaylist(track.id)" class="track-item__cta-link" />
      </div>
      <p class="track-item__timer">{{ formatDuration(track.duration) }}</p>
    </li>
  </ul>
</template>

<script>
import BtnIcon from './BtnIcon.vue'
import { formatDuration } from '@/helper/format'
import { usePlayerStore } from '@/stores/player'
import { mapActions } from 'pinia'
import { post, trackImage } from '@/utils/http'
import { deletePlaylistItem } from '@/api/playlist'
import PlaylistAddModal from '@/components/Modals/PlaylistAddModal.vue'

export default {
  name: 'ListTracks',
  props: {
    tracks: {
      type: Array
    },
    playlist_id: {
      type: Number,
      default: -1
    },
    author_id: {
      type: Number,
      default: 0
    },
    isInPlayer: {
      type: Boolean,
      default: false
    },
    isInPlaylist: {
      type: Boolean,
      default: false
    },
    trackItemSelected: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    selectedTrack: -1,
    addToPlaylistModal: false
  }),
  emits: ['updateRating'],
  methods: {
    ...mapActions(usePlayerStore, ['playTrackAtIndex', 'removeTrack', 'playIndividualTrack']),
    formatDuration,
    trackImage,
    thumbsUpColor(rating) {
      return rating === 1 ? 'white' : 'grey'
    },
    thumbsDownColor(rating) {
      return rating === 0 ? 'white' : 'grey'
    },
    async updateRating(track, rating) {
      if (track === null) return
      const response = await post(
        `/track/${track.id}/rating/${rating}`,
        {},
        {},
        this.$pinia.state.value.user.token
      )
      const data = await response.json()
      let new_rating = null
      if (data.action === 'created') {
        new_rating = rating
      }
      // finding the index of the track
      const index = this.tracks.findIndex((t) => t.id === track.id)
      this.$emit('updateRating', index, new_rating)
    },
    async removeTrackFromPlaylist(trackid, index) {
      const response = await deletePlaylistItem(trackid, this.playlist_id)
      if (response) {
        this.$emit('removeTrack', index)
      }
    },
    openAddToPlaylist(trackId) {
      this.selectedTrack = trackId
      this.toggleAddToPlaylistModal(true)
    },
    toggleAddToPlaylistModal(value) {
      this.addToPlaylistModal = value
    }
  },
  components: { BtnIcon, PlaylistAddModal }
}
</script>

<style>
/* TRACK ITEM */
.track-list {
  list-style: none;
}

.track-item {
  width: 100%;
  border-bottom: 1px solid var(--color-border-light);
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  align-items: center;
  text-decoration: none;
  grid-gap: 2.5rem;
  padding: 0 2rem;

  &:hover,
  &.track-item-selected {
    background-color: var(--color-hover);
    .track-item__cover--img {
      filter: brightness(0.5);
    }

    .track-item__cover--playbutton {
      opacity: 1;
    }

    .track-item__cta .track-item__cta-link {
      opacity: 1;
    }
  }
}

.track-item__link {
  display: grid;
  grid-template-columns: 5rem 2fr max-content;
  grid-gap: 2.5rem;
  align-items: center;
  height: 5rem;
  text-decoration: none;
  color: white;
  font-size: 1.8rem;
}

.track-item__link-player {
  display: grid;
  grid-template-columns: 3rem 100fr max-content;
  grid-gap: 1rem;
}

.track-item-selected {
  background-color: var(--color-hover);
}

.track-item__cover {
  height: 3rem;
  position: relative;
}

.track-item__cover-player {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.track-item__cover--playbutton {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  opacity: 0;
}

.track-selected {
  background-color: var(--color-hover);
}

.track-item__cover--img {
  /* width: 3rem; */
  aspect-ratio: 16/9;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.5rem;
}

.track-item__title {
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.track-item__artist {
  font-weight: lighter;
  color: var(--text-label-color);
}

.track-item__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  /* opacity: 0; */
}

.track-item__cta-link {
  color: white;
  font-size: 1.8rem;
  opacity: 0;
}

.track-item__cta-link--active {
  opacity: 1;
}
</style>
