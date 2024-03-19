<template>
  <div class="playlist-container">
    <v-card
      v-for="playlist in playlists"
      :key="playlist.id"
      class="playlist__item d-flex pa-2"
      @click="navigateToPlaylistPage(playlist.id)"
    >
      <div class="playlist__details">
        <v-card-title class="playlist__heading"> {{ playlist.name }} </v-card-title>
        <v-card-subtitle
          class="playlist__subheading"
          @click.stop="navigateToUserDashboard(playlist.user.id)"
        >
          {{ playlist.user.nickname }}
        </v-card-subtitle>
      </div>
      <v-spacer></v-spacer>
      <BtnIcon
        icon="play_circle"
        class="playlist__playbutton"
        :iconSize="3"
        @click.stop="navigateToPlayer(playlist)"
      />
    </v-card>
  </div>
</template>

<script>
import BtnIcon from './BtnIcon.vue'
import { usePlayerStore } from '@/stores/player'
import { mapActions } from 'pinia'
export default {
  name: 'TilePlaylist',
  props: {
    playlists: {
      type: Array
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['playPlaylist']),
    navigateToPlayer(playlist) {
      this.playPlaylist(playlist, 0)
    },
    navigateToPlaylistPage(playlistId) {
      this.$router.push(`/playlist/${playlistId}`)
    },
    navigateToUserDashboard(userId) {
      this.$router.push(`/dashboard/${userId}`)
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

  &:hover {
    text-decoration: underline;
  }
}
</style>
