<template>
  <div class="track-carousel">
    <div v-for="track in tracks" :key="track" class="track-carousel__item">
      <div class="track-carousel__item--cover">
        <a href="" class="">
          <div>
            <img
              loading="lazy"
              :src="`https://picsum.photos/360/640?random=${track}`"
              alt="track Image"
              class="track-carousel__item--img"
            />
            <span class="material-symbols-rounded track-carousel__item--play"> play_arrow </span>
          </div>
        </a>
      </div>
      <div class="track-carousel__item--text">
        <div class="track-carousel__item--text-header">
          <a href="/" class="track-carousel__item--title">
            <p>Name of track {{ track }}</p>
          </a>
          <!-- <div class="track-menu-container">
            <input
              type="checkbox"
              :id="`track-carousel-${track}`"
              name="asdfasdf"
              class="checkbox-disable track-menu__checkbox"
            />
            <div class="track-dropdown-container">
              <ul class="dropdown-list">
                <li class="dropdown-item">
                  <a href="?q={{q}}&id={{track.id}}#playlist-add-modal" class="dropdown-item--link">
                    Add to Playlist
                  </a>
                </li>

                <li class="dropdown-item">
                  <a href="?q={{q}}&id={{track.id}}#delete-track-modal" class="dropdown-item--link">
                    Delete Track
                  </a>
                </li>
                <li class="dropdown-item">
                  <a href="?q={{q}}&id={{track.id}}#flag-track-modal" class="dropdown-item--link">
                    Flag Track
                  </a>
                </li>
              </ul>
            </div>
            <label :for="`track-carousel-${track}`" class="track-menu-label">
              <span class="material-symbols-rounded"> more_vert </span>
            </label>
          </div> -->
          <v-menu location="start">
            <template v-slot:activator="{ props }">
              <v-btn
                size="x-small"
                :elevation="0"
                color="transparent"
                icon="mdi-dots-vertical"
                v-bind="props"
              >
                <span class="material-symbols-rounded"> more_vert </span>
              </v-btn>
            </template>
            <v-list class="frosted-glass">
              <v-list-item link>
                <v-list-item-title> Add To Playlist </v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title> Delete Track </v-list-item-title>
              </v-list-item>
              <v-list-item link>
                <v-list-item-title> Flag Track </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <a href="" class="track-carousel__item--artist">Channel Name</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackCarousel',
  props: {
    demo: {
      type: Boolean,
      default: false
    },
    tracks: {
      type: Array,
      default: () => [1, 2, 3, 4, 5]
    }
  },
  methods: {
    getTrackCoverUrl(trackId) {
      // Replace this with the logic to generate track cover URLs
      return `/api/tracks/${trackId}/cover`
    },
    shouldShowMenuItem(itemName) {
      // Implement logic for deciding which menu items to show
      // based on user permissions, track properties, etc.
      console.log(itemName)
      return true // Example implementation for now
    }
  }
}
</script>

<style>
.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
  background: transparent;
  backdrop-filter: blur(20px) brightness(0.5);
}

/* track Carousel */
.track-carousel {
  display: grid;
  /* Autofit rows according to size */
  grid-template-columns: repeat(auto-fit, minmax(25rem, max-content));
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

.album-carousel__item--cover {
  aspect-ratio: 1/1;
}

.track-carousel__item--img {
  aspect-ratio: 16/9;
  object-fit: cover;
  object-position: center;
  transition: all 0.2s ease-out;
  /* height: 100%; */
  width: 100%;
}

.album-carousel__item--img {
  aspect-ratio: 1/1;
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
</style>
