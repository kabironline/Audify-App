<template>
  <div class="playlist-container">
    <!-- <div class="playlist__item" v-for="playlist in 10" :key="playlist">
      <a :href="`/playlist/${playlist}`" class="playlist__link">
        <div class="playlist__details">
          <p class="playlist__heading">Playlist Name {{ playlist }}</p>
          <p class="playlist__subheading">Playlist Author {{ playlist }}</p>
        </div>
        <a href="`/player/playlist/${playlist}`">
          <i class="fas fa-circle-play playlist__playbutton"></i>
        </a>
      </a>
    </div> -->
    <v-card link v-for="playlist in 10" :key="playlist.id" class="playlist__item pa-2">
      <div class="playlist__details">
        <v-card-title class="playlist__heading"> Playlist Name {{ playlist }} </v-card-title>
        <v-card-subtitle class="playlist__subheading">
          Playlist Author {{ playlist }}
        </v-card-subtitle>
      </div>
      <v-spacer></v-spacer>
      <v-btn elevation="0" color="transparent" icon>
        <span class="material-symbols-rounded playlist__playbutton"> play_circle </span>
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TilePlaylist',
  props: {
    playlists: {
      type: Array
    }
  }
}
</script>

<style>
.playlist-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  row-gap: 2rem;
  column-gap: 2rem;
  /* display: inline-flex;
  flex-wrap: wrap;
  gap: 2rem; */
}

.playlist__item {
  max-width: 30rem;
  font-size: 2rem;
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  transition: all 0.1s ease-out;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: var(--color-background-light);

  &:hover {
    background-color: var(--color-hover);
  }
}

.playlist__link {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: center;
  text-decoration: none;
  color: white;
}

.playlist__heading {
  font-size: 1.6rem;
  font-weight: 500;
  /* margin-bottom: 1rem; */
}

.playlist__subheading {
  font-size: 1.2rem;
  font-weight: light;
  color: var(--text-label-color);
}

.playlist__playbutton {
  font-size: 2.5rem;
  color: var(--color-white);
}
</style>
