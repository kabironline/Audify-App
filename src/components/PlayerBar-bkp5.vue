<template>
  <div class="player-frame-container" :class="{ 'player-page-open': playerPageOpen }">
    <div class="player-main" :class="{ 'player-main-open': playerPageOpened }">
      <img src="https://www.picsum.photos/640/360" class="player-track-img" />
      <div class="player-track-details">
        <div class="player-track-title">Low Quality Shape of You!</div>
        <div class="player-track-artist">Adi Shreeman</div>
      </div>
      <div class="player-controls">
        <BtnIcon icon="fast_rewind" :iconSize="3" />
        <BtnIcon icon="play_circle" :iconSize="3" />
        <BtnIcon icon="fast_forward" :iconSize="3" />
      </div>
      <div class="player-progress-bar">
        <div class="player-progress-bar--knob"></div>
        <div class="player-progress-bar--track"></div>
      </div>
      <div class="player-control--time">0:00 / 0:00</div>
      <!-- <BtnIcon icon="volume_up" @click.prevent="togglePlayerPage" />
      <input type="range" min="0" max="1" value="1" step="0.01" class="player__volume--bar" /> -->
    </div>
    <div class="player-controls-extra">
      <BtnIcon
        :icon="playerPageOpen ? 'expand_more' : 'expand_less'"
        @click.prevent="togglePlayerPage"
      />
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
      playerPageOpen: false,
      playerPageOpened: false
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
      if (!this.playerPageOpen) {
        this.playerPageOpen = true
        setTimeout(() => {
          this.playerPageOpened = true
        }, 3000)
      } else {
        this.playerPageOpened = false
        setTimeout(() => {
          this.playerPageOpen = false
        }, 3000)
      }
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
  grid-template-columns: 100% 0%;
  grid-template-rows: 1fr;
  align-items: center;
  align-content: center;
  transition: all 3s ease-in;
}

.player-main {
  position: relative;
}

.player-track-img {
  width: 12rem;
  aspect-ratio: 16/9;
  position: absolute !important;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.5rem;
  transition: all 3s ease-in;
}

.player-track-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  width: 30rem;
  position: absolute;
  left: 14rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 3s ease-in;

  .player-track-title {
    font-size: 2rem;
    font-weight: 500;
    transition: all 3s ease-in;
  }

  .player-track-artist {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-label-color);
    transition: all 3s ease-in;
  }
}

.player-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: absolute;
  left: 45rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 3s ease-in;
}

.player-progress-bar {
  width: 40vw;
  position: absolute;
  height: 0.5rem;
  background-color: var(--color-background-light);
  border-radius: 1rem;
  left: 60rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 3s ease-in;

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

.player-control--time {
  position: absolute;
  left: calc(60rem + 40vw + 1rem);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-label-color);
  font-size: 1.5rem;
  font-weight: 400;
  transition: all 3s ease-in;
}

.player-controls-extra {
  /* display: flex;
  align-items: center; */
  gap: 1rem;
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

.player-page-open {
  height: calc(100vh - 7rem);
  backdrop-filter: blur(20px) brightness(0);
  border-top: none;
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  align-content: center;
}
.player-main-open {
  height: 100%;
  position: relative;

  .player-track-img {
    width: 97%;
    top: 35%;
  }

  .player-track-details {
    width: 100%;
    position: absolute;
    left: 1rem;
    top: 67%;
  }

  .player-controls {
    position: absolute;
    left: 1rem;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
  }

  .player-progress-bar {
    width: calc(100% - 2rem);
    position: absolute;
    height: 0.5rem;
    left: 1rem;
    top: 80%;
  }

  .player-control--time {
    position: absolute;
    left: 1rem;
    top: 90%;
  }

  .player-controls-extra {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
