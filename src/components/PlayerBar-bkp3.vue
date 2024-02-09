<template>
  <div class="player-frame-container" :class="{ 'player-page-open': playerPageOpen }">
    <div class="player-main" :class="{ 'player-main-open': playerPageOpened }">
      <div class="player-track-img--container">
        <v-img src="https://www.picsum.photos/640/360" class="player-track-img" />
      </div>
      <!-- <div class="player-track-title">Low Quality Shape of You!</div>
      <div class="player-track-artist">Adi Shreeman</div>
      <div class="player-controls-container">
        <div class="player-controls">
          <BtnIcon icon="fast_rewind" :iconSize="3" />
          <BtnIcon icon="play_circle" :iconSize="3" />
          <BtnIcon icon="fast_forward" :iconSize="3" />
        </div>
      </div>
      <div class="player-progress-bar--container">
        <div class="player-progress-bar" @mousedown="handleMouseDown">
          <div class="player-progress-bar--knob"></div>
          <div class="player-progress-bar--track"></div>
        </div>
      </div>
    -->
      <div class="player-expand-container">
        <BtnIcon
          :icon="playerPageOpen ? 'expand_more' : 'expand_less'"
          @click.prevent="togglePlayerPage"
        />
      </div>
    </div>
    <!-- <Transition>
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
    </Transition> -->
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
    async togglePlayerPage() {
      this.playerPageOpen = !this.playerPageOpen
      setTimeout(() => {
        this.playerPageOpened = this.playerPageOpen
      }, 500)
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
  transition: all 0.3s ease-in;
  padding: 0 1rem;
}

.player-main {
  display: grid;
  grid-template-columns: 12rem 20rem max-content 1fr min-content;
  grid-template-rows: 50% 50%;

  .player-track-img--container {
    grid-column: 1;
    grid-row: 1/-1;

    .player-track-img {
      width: 12rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease-in-out;
    }
  }

  .player-track-title {
    font-size: 2rem;
    font-weight: 600;
    grid-row: 1;
    grid-column: 2;
  }

  .player-track-artist {
    font-size: 1.5rem;
    color: var(--text-color-placeholder);
    grid-row: 2;
    grid-column: 2;
  }

  .player-controls-container {
    grid-row: 1/-1;
    grid-column: 3;
    display: flex;

    .player-controls {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
  }
  .player-expand-container {
    /* grid-row: 1/-1;
    grid-column: -1;
    display: flex;
    justify-content: center;
    align-items: center; */
    position: absolute;
    right: 1rem;
  }

  .player-progress-bar--container {
    grid-row: 1/-1;
    grid-column: 4;
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
}

.player-page-open {
  height: calc(100vh - 7rem);
  grid-template-columns: 1fr 1fr;

  .player-track-img--container {
    .player-track-img--container {
      grid-row: 1;
      grid-column: 1;
    }
    .player-track-img {
      width: 15rem;
      border-radius: 0.5rem;
    }
  }
}

.player-main-open {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, max-content);

  .player-track-img--container {
    grid-row: 1;
    grid-column: 1;
  }

  .player-track-title {
    grid-row: 2;
    grid-column: 1;
  }

  .player-track-artist {
    grid-row: 3;
    grid-column: 1;
  }

  .player-controls-container {
    grid-row: 4;
    grid-column: 1;
  }

  .player-progress-bar--container {
    grid-row: 5;
    grid-column: 1;
  }
}
</style>
