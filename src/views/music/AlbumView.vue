<template>
  <section class="section section-album-header">
    <div class="playlist-header__image">
      <img
        src="https://picsum.photos/500/500?random=1"
        alt="{{album.name}}"
        class="album-header__image__img"
      />
    </div>
    <div class="playlist-header">
      <h2 class="heading-2">
        {{ album.name }}
      </h2>
      <p class="playlist-header__description">Description: {{ album.description }}</p>
      <p class="playlist-header__description">
        {{ album.channel.name }} • {{ album.items }} songs,
        {{ album.items }}
      </p>

      <div class="playlist-header__buttons">
        <BtnAction icon="play_arrow" text="Play" />
        <BtnAction icon="edit" text="Edit Playlist" color="dark" />
        <BtnAction icon="delete" text="Delete Playlist" color="dark" />
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
    album: {
      id: 1,
      name: 'Playlist Name',
      description: 'Playlist Description',
      channel: {
        name: 'Author Name'
      },
      items: 10
    }
  })
}
</script>

<style>
.section-album-header {
  display: flex;
  gap: 2rem;
  align-items: center;
}
.album-header__image__img {
  height: 30rem;
  border-radius: 1rem;
  aspect-ratio: 1;
  object-fit: cover;
}

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
