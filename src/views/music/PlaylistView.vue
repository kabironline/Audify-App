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
        <a href="/player/playlist/{{playlist.id}}" class="btn btn--white"
          ><i class="fas fa-play"></i>Play</a
        >
        <a href="#playlist-edit-modal" class="btn"><i class="fas fa-pencil"></i>Edit Playlist</a>
        <a href="/playlist/{{playlist.id}}/delete" class="btn">Delete Playlist</a>
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
import ListTracks from '@/components/ListTracks.vue'

export default {
  name: 'AlbumView',
  components: { ListTracks },
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
