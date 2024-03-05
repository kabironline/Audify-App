<template>
  <div class="track-tiles">
    <v-card
      v-for="(track, n) in tracks"
      :key="track.id"
      color="transparent"
      class="track-tile"
      link
      @click.prevent="playIndividualTrack(track)"
    >
      <v-card-title class="track-tile__position">
        <p class="track-tile__position--text">{{ n + 1 }}</p>
      </v-card-title>
      <div class="track-tile__cover">
        <div>
          <v-img :src="trackImage(track.id)" alt="track Image" class="track-tile__cover--img" />
          <span class="track-tile__cover--playbutton material-symbols-rounded">play_arrow</span>
        </div>
      </div>
      <v-card-title class="track-tile__text">
        <p href="/player" class="track-tile__text--title">{{ track.name }}</p>
        <p href="/player" class="track-tile__text--artist">{{ track.channel.name }}</p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { trackImage } from '@/utils/http'
import { usePlayerStore } from '@/stores/player'
import { mapActions } from 'pinia'
export default {
  name: 'TileTrack',
  props: {
    tracks: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['playIndividualTrack']),
    trackImage
  }
}
</script>

<style scoped>
/* track Tile */
.track-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  padding: 2rem 0;
}
.track-tile {
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  grid-gap: 0 1rem;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1.8rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: var(--color-hover);
  }

  &:hover {
    .track-tile__cover--playbutton {
      opacity: 1;
      font-size: 5rem;
    }

    .track-tile__cover--img {
      filter: brightness(0.5);
    }
    .track-tile__cover--img.selectable {
      filter: brightness(1);
    }
  }
}

.track-tile-small {
  grid-template-columns: min-content 1fr;
}

.track-tile-checkbox:checked + .track-tile-label .track-tile {
  background-color: var(--color-hover);
}

.track-tile__position {
  font-size: 1.8rem;
  font-weight: bold;
  /* color: var(--text-label-color); */
}

.track-tile__cover {
  /* width: 8.9rem; */
  height: 6rem;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  aspect-ratio: 16/9;
}

.track-tile__cover--img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.track-tile__cover--playbutton {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: white;
  opacity: 0;
  transition: all 0.2s ease-out;
  /* transform: scale(0.8); */
  transform-origin: center;
}

.track-tile__text {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
  text-overflow: ellipsis;
  overflow: hidden;

  .track-tile__text--title {
    font-weight: bold;
    font-size: 1.6rem;
    text-decoration: none;
    color: white;
    display: block;
    text-wrap: nowrap;
    text-overflow: ellipsis;

    &:hover {
      text-decoration: underline;
    }
  }

  .track-tile__text--artist {
    font-weight: lighter;
    font-size: 1.4rem;
    text-decoration: none;
    color: var(--text-subtitle-color);
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
