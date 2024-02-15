<template>
  <div class="playlist-container">
    <v-card
      v-for="playlist in 10"
      :key="playlist.id"
      class="playlist__item pa-2"
      @click="navigateTo(false)"
    >
      <div class="playlist__details">
        <v-card-title class="playlist__heading"> Playlist Name {{ playlist }} </v-card-title>
        <v-card-subtitle class="playlist__subheading">
          Playlist Author {{ playlist }}
        </v-card-subtitle>
      </div>
      <v-spacer></v-spacer>
      <BtnIcon
        icon="play_circle"
        class="playlist__playbutton"
        :iconSize="3"
        :action="navigateTo(true)"
      />
    </v-card>
  </div>
</template>

<script>
import BtnIcon from './BtnIcon.vue'

export default {
  name: 'TilePlaylist',
  props: {
    playlists: {
      type: Array
    }
  },
  methods: {
    navigateTo(playButtonClicked) {
      console.log('PlayButtonClicked: ', playButtonClicked)
      const route = playButtonClicked ? '/' : '/playlist'
      debugger
      this.$router.push(route)
    }
  },
  components: { BtnIcon }
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
</style>
