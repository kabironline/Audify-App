<template>
  <section class="section">
    <div class="playlist-header">
      <h2 class="heading-2">
        {{ playlist.name }}
      </h2>
      <p class="playlist-header__description">Description: {{ playlist.description }}</p>
      <p class="playlist-header__description">
        {{ playlist.author.nickname }} • {{ playlist.items }} songs,
        {{ playlist.items }}
      </p>

      <div class="playlist-header__buttons">
        <BtnAction icon="play_arrow" text="Play" color="white" />
        <BtnAction text="Edit Playlist" color="dark" />
        <BtnAction text="Delete Playlist" color="dark" />
      </div>
    </div>
    <hr class="hr" />
  </section>
  <section class="section section-playlist-songs">
    <ul class="track-list">
      <ListTracks />
    </ul>
  </section>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import ListTracks from '@/components/ListTracks.vue'

export default {
  name: 'AlbumView',
  components: { ListTracks, BtnAction },
  data: () => ({
    playlist: {
      id: 1,
      name: 'Playlist Name',
      description: 'Playlist Description',
      author: {
        nickname: 'Author Name'
      }
    }
  })
}
</script>

<style>
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
