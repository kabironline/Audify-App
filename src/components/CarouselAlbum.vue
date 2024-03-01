<template>
  <div class="track-carousel">
    <v-card
      v-for="album in albums"
      :key="album.id"
      color="background"
      link
      @click.prevent="playAlbumHandler(album)"
      class="track-carousel__item"
    >
      <div class="track-carousel__item--cover album-carousel__item--cover">
        <v-img
          :src="getAlbumCoverUrl(album.id)"
          class="track-carousel__item--img album-carousel__item--img"
          aspect-ratio="1"
          cover
        />
        <span class="material-symbols-rounded track-carousel__item--play"> play_arrow </span>
      </div>
      <div>
        <v-card-title
          class="d-flex flex-no-wrap justify-space-between align-center pa-0"
          @click="navigateTo(`/album`)"
        >
          <div class="track-carousel__item--title">{{ album.name }}</div>
        </v-card-title>
      </div>
      <v-card-subtitle class="pa-0 track-carousel__item--artist pl-1">{{
        album.created_by.name
      }}</v-card-subtitle>
      <div class="mb-3"></div>
    </v-card>
  </div>
</template>
<script>
import { albumImage } from '@/utils/http'
import { usePlayerStore } from '@/stores/player'
import { mapActions } from 'pinia'
import { toRaw } from 'vue'
export default {
  name: 'CarouselAlbum',
  props: {
    albums: {
      type: Array
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['playPlaylist']),
    async playAlbumHandler(album) {
      album = toRaw(album)
      await this.playPlaylist(album, 0, 'album')
    },
    getAlbumCoverUrl(trackId) {
      return albumImage(trackId)
    }
  }
}
</script>

<style scoped>
.v-card-title {
  font-size: 2rem;
}

.v-card-subtitle {
  font-size: 1.5rem;
  line-height: 1.5rem;
}

/* track Carousel */
.track-carousel {
  /* display: grid; */
  /* Autofit rows according to size */
  /* grid-template-columns: repeat(auto-fit, minmax(20rem, max-content)); */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  flex-wrap: wrap;
  gap: 2rem;
  margin: 3rem 0;
}

.track-carousel__item {
  max-width: 30rem;
}

.track-carousel__item--cover {
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 1rem;
  width: 100%;
  aspect-ratio: 16/9;
  object-position: center;
}

.track-carousel__item--img {
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  transition: all 0.2s ease-out;
  /* height: 100%; */
  width: 100%;
}

.track-carousel__item--play {
  text-decoration: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7.5rem;
  color: white;
  opacity: 0;
  transition: all 0.2s ease-out;
}

.track-carousel__item--cover:hover {
  .track-carousel__item--play {
    opacity: 1;
  }

  .track-carousel__item--img {
    transform: scale(1.1);
    filter: brightness(0.5);
  }
}

.track-carousel__item--text-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.track-carousel__item--title {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: white;
  display: block;
  padding-left: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
}

.track-menu-label {
  font-size: 1.5rem;
  font-weight: 500;
  /* padding: 0 1rem; */
  text-decoration: none;
  color: white;
  display: block;
  cursor: pointer;
}

.track-dropdown-container {
  display: none;
  position: absolute;
  top: 2rem;
  left: -12rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border-light);
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  z-index: 101;
  height: 0%;
  transition: all 0.2s ease-out;
  background-color: transparent;
  backdrop-filter: blur(20px) brightness(0.5);
}

.album-dropdown-container {
  left: -8rem;
}

.track-menu-container {
  position: relative;
}

.track-dropdown-container {
  display: none;
  position: absolute;
}

.track-menu__checkbox {
  display: none;

  &:checked ~ .track-dropdown-container {
    display: block;
    height: auto;
  }
}

.track-carousel__item--artist {
  font-size: 1.3rem;
  text-decoration: none;
  color: var(--text-subtitle-color);
  &:hover {
    text-decoration: underline;
  }
}

.album-carousel__item--cover {
  aspect-ratio: 1/1;
}

.album-carousel__item--img {
  aspect-ratio: 1/1;
}
</style>
