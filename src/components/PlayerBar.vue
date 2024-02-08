<template>
  <div class="player-frame-container">
    <div class="player-track-info">
      <v-img src="https://www.picsum.photos/640/320" class="player-track-img"></v-img>
      <div class="player-track-details">
        <div class="player-track-title">Low Quality Shape of You!</div>
        <div class="player-track-artist">Adi Shreeman</div>
      </div>
    </div>
    <div class="player-controls">
      <BtnIcon icon="fast_rewind" :iconSize="3" />
      <BtnIcon icon="play_circle" :iconSize="3" />
      <BtnIcon icon="fast_forward" :iconSize="3" />
      <!-- Create a Progress Bar -->
      <div class="player-progress-bar">
        <div class="player-progress-bar--knob"></div>
        <div class="player-progress-bar--track"></div>
      </div>
      <div class="player-control--time">0:00 / 0:00</div>
    </div>
    <div class="player-controls-extra">
      <BtnIcon icon="volume_up" @click.prevent="togglePlayerPage" />
      <input type="range" min="0" max="1" value="1" step="0.01" class="player__volume--bar" />
      <BtnIcon icon="expand_more" @click.prevent="togglePlayerPage" />
    </div>
  </div>
</template>

<script>
import BtnIcon from './BtnIcon.vue'

export default {
  name: 'PlayerBar',
  components: { BtnIcon },
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
  },
  methods: {
    togglePlayerPage() {
      this.playerPageOpen = !this.playerPageOpen
    },
    handleMouseDown(event) {
      const { clientX, target } = event
      this.containerWidth = target.parentElement.clientWidth
      this.isDragging = true
      this.initialX = clientX
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseMove(event) {
      if (this.isDragging) {
        const newX = event.clientX
        const distance = newX - this.initialX
        const newProgress = Math.min(Math.max(0, (distance / this.containerWidth) * 100), 100)
        this.progress = newProgress
      }
    },
    handleMouseUp() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
}
</script>

<style>
.player-frame-container {
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 26.5rem;
  right: 0;
  height: 8rem;
  background: transparent;
  backdrop-filter: blur(20px) brightness(0.5);
  border-top: 1px solid #fff;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  align-content: center;
}

.player-track-info {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.player-track-img {
  height: 7rem;
  aspect-ratio: 16/9;
  border-radius: 1rem;
  margin-right: 1rem;
}

.player-track-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;

  .player-track-title {
    font-size: 2rem;
    font-weight: 600;
    white-space: nowrap;
    overflow-x: hidden;
  }

  .player-track-artist {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-subtitle-color);
  }
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  .player-progress-bar {
    flex: 1;
    position: relative;
    height: 0.5rem;
    background-color: var(--color-background-light);
    border-radius: 1rem;

    .player-progress-bar--knob {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--color-primary-dark);
      border-radius: 50%;
      z-index: 12;
    }

    .player-progress-bar--track {
      position: absolute;
      left: 0;
      width: 50%;
      height: 0.5rem;
      background-color: var(--color-primary);
      border-radius: 1rem;
      z-index: 11;
    }
  }
}
.player-controls-extra {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
