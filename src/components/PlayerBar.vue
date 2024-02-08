<template>
  <div class="player-frame-container" :class="{ 'player-page-open': playerPageOpen }">
    <div class="player-main">
      <div>
        <div class="player-track-info">
          <v-img src="https://www.picsum.photos/640/360" class="player-track-img" />
          <div class="player-track-details">
            <div class="player-track-title">Low Quality Shape of You!</div>
            <div class="player-track-artist">Adi Shreeman</div>
          </div>
        </div>
      </div>
      <div>
        <div class="player-controls">
          <div class="player-control-container">
            <BtnIcon icon="fast_rewind" :iconSize="3" />
            <BtnIcon icon="play_circle" :iconSize="3" />
            <BtnIcon icon="fast_forward" :iconSize="3" />
          </div>
          <!-- Create a Progress Bar -->
          <div class="player-progress-bar">
            <div class="player-progress-bar--knob"></div>
            <div class="player-progress-bar--track"></div>
          </div>
          <div class="player-control--time">0:00 / 0:00</div>
        </div>
      </div>
      <div>
        <div class="player-controls-extra">
          <BtnIcon icon="volume_up" @click.prevent="togglePlayerPage" />
          <input type="range" min="0" max="1" value="1" step="0.01" class="player__volume--bar" />
          <BtnIcon
            :icon="playerPageOpen ? 'expand_more' : 'expand_less'"
            @click.prevent="togglePlayerPage"
          />
        </div>
      </div>
    </div>
    <Transition>
      <div v-if="playerPageOpen" class="player-page-sidebar">
        <div class="player-page__content">
          <div class="player-page__content--lyrics">
            <h2>Lyrics</h2>
            <p>
              The club isn't the best place to find a lover So the bar is where I go Me and my
              friends at the table doing shots Drinking fast and then we talk slow And you come over
              and start up a conversation with just me And trust me I'll give it a chance now Take
              my hand, stop,
            </p>
          </div>
        </div>
      </div>
    </Transition>
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
  grid-template-columns: 1fr 0fr;
  align-items: center;
  align-content: center;
  transition: all 0.3s ease-in-out;
}

.player-main {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: max-content min-content min-content;
  height: 100%;
}

.player-page-open {
  /* padding: 3rem; */
  height: calc(100% - 7rem);
  border-top: none;
  grid-template-columns: 1fr 1fr;
  padding: 2rem;

  .player-main {
    grid-template-columns: 1fr;
    grid-template-rows: max-content min-content max-content;
  }
  .player-track-info {
    flex-direction: column;
    align-items: start;

    .player-track-img {
      width: 100%;
      aspect-ratio: 16/9;
      border-radius: 2rem;
      margin-bottom: 1rem;
    }

    .player-track-title {
      font-size: 3.4rem;
      font-weight: 600;
      white-space: nowrap;
      overflow-x: hidden;
    }
    .player-track-artist {
      font-size: 2rem;
      font-weight: 400;
      color: var(--text-subtitle-color);
    }
  }

  .player-controls {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }
}

.player-track-info {
  display: flex;
  align-items: center;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
}

.player-track-img {
  width: 11rem;
  aspect-ratio: 16/9;
  border-radius: 1rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
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
    transition: all 0.3s ease-in-out;
  }

  .player-track-artist {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-subtitle-color);
    transition: all 0.3s ease-in-out;
  }
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;

  .player-control-container {
    display: flex;
    flex-direction: row;
  }

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

.player-controls-extra--open {
  grid-column: 1;
  grid-row: 3;
}
.player-page-sidebar {
  grid-column: 2;
  grid-row: 1 / -1;
}
</style>
