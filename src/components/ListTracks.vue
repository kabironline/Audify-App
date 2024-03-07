<template>
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
      <div class="track-item__link" @click.prevent="playTrackAtIndex(index)">
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
        <BtnIcon v-if="isInPlaylist" icon="remove" href="" class="track-item__cta-link" />
        <BtnIcon v-if="!isInPlaylist"icon="add" class="track-item__cta-link" />
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

export default {
  name: 'ListTracks',
  props: {
    tracks: {
      type: Array
    },
    playlist_id: {
      type: Number,
      default: 0
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
    // tracksData: this.tracks
  }),
  emits: ['updateRating'],
  methods: {
    ...mapActions(usePlayerStore, ['playTrackAtIndex']),
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
    }
  },
  components: { BtnIcon }
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
