<template>
  <div class="player-page">This is the player page</div>
</template>

<script>
export default {
  name: 'PlayerPage',
  data() {
    return {
      playerPageOpen: false
    }
  },
  props: {
    media: {
      type: String,
      default: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    }
  }
}
</script>

<style>
.player-page {
  position: fixed;
  bottom: 7rem;
  left: 26.5rem;
  top: 7rem;
  right: 0;
  z-index: 10;
  background: var(--color-background);
  padding: 2rem;
}
</style>
