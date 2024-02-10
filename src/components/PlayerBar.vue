<template>
  <div class="player-frame-container" :class="{ 'player-page-open': playerPageOpen }">
    <div class="player-main">
      <div class="player-track-info">
        <div class="player-track-info">
          <v-img :src="trackImage" class="player-track-img" />
          <div class="player-track-details">
            <div class="player-track-title">Low Quality Shape of You!</div>
            <div class="player-track-artist">Adi Shreeman</div>
          </div>
        </div>
      </div>
      <div class="player-controls">
        <div class="player-control-container">
          <BtnIcon icon="fast_rewind" :iconSize="3" />
          <BtnIcon icon="play_circle" :iconSize="3" />
          <BtnIcon icon="fast_forward" :iconSize="3" />
        </div>
        <div class="player-progress-bar">
          <div class="player-progress-bar--knob"></div>
          <div class="player-progress-bar--track"></div>
        </div>
        <div class="player-control--time">0:00 / 0:00</div>
      </div>
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
    <div v-if="playerPageOpen" class="player-page">
      <div class="player-page-left">
        <v-img :src="trackImage" class="player-page-img" />
        <div
          class="player-page-img-ambient"
          :style="{
            background: `radial-gradient(
            ellipse at center,
            transparent 20%,
            black 100%
          ), url(${trackImage}) center center / cover no-repeat`
          }"
        ></div>
      </div>
      <div class="player-page-right">
        <v-tabs v-model="tab" bg-color="background">
          <v-tab value="Lryics">Lryics</v-tab>
          <v-tab value="two">Item Two</v-tab>
          <v-tab value="three">Item Three</v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item value="Lryics" class="page-tab-window">
            <p class="lyrics">
              We're no strangers to love<br />
              You know the rules and so do I (do I)<br />
              A full commitment's what I'm thinking of<br />
              You wouldn't get this from any other guy<br />
              I just wanna tell you how I'm feeling<br />
              Gotta make you understand<br />
              Never gonna give you up<br />
              Never gonna let you down<br />
              Never gonna run around and desert you<br />
              Never gonna make you cry<br />
              Never gonna say goodbye<br />
              Never gonna tell a lie and hurt you<br />
              We've known each other for so long<br />
              Your heart's been aching, but you're too shy to say it (say it)<br />
              Inside, we both know what's been going on (going on)<br />
              We know the game and we're gonna play it<br />
              And if you ask me how I'm feeling<br />
              Don't tell me you're too blind to see<br />
              Never gonna give you up<br />
              Never gonna let you down<br />
              Never gonna run around and desert you<br />
              Never gonna make you cry<br />
              Never gonna say goodbye<br />
              Never gonna tell a lie and hurt you<br />
              Never gonna give you up<br />
              Never gonna let you down<br />
              Never gonna run around and desert you<br />
              Never gonna make you cry<br />
              Never gonna say goodbye<br />
              Never gonna tell a lie and hurt you<br />
              We've known each other for so long<br />
              Your heart's been aching, but you're too shy to say it (to say it)<br />
              Inside, we both know what's been going on (going on)<br />
              We know the game and we're gonna play it<br />
              I just wanna tell you how I'm feeling<br />
              Gotta make you understand<br />
              Never gonna give you up<br />
              Never gonna let you down<br />
              Never gonna run around and desert you<br />
              Never gonna make you cry<br />
              Never gonna say goodbye<br />
              Never gonna tell a lie and hurt you<br />
              Never gonna give you up<br />
              Never gonna let you down<br />
              Never gonna run around and desert you<br />
              Never gonna make you cry<br />
              Never gonna say goodbye<br />
              Never gonna tell a lie and hurt you<br />
              Never gonna give you up<br />
              Never gonna let you down<br />
              Never gonna run around and desert you<br />
              Never gonna make you cry<br />
              Never gonna say goodbye<br />
              Never gonna tell a lie and hurt you<br />
            </p>
          </v-window-item>

          <v-window-item value="two" class="page-tab-window"> Two </v-window-item>

          <v-window-item value="three" class="page-tab-window"> Three </v-window-item>
        </v-window>
      </div>
    </div>
  </Transition>
</template>

<script>
import BtnIcon from './BtnIcon.vue'
export default {
  name: 'PlayerBar',
  components: { BtnIcon },
  data() {
    return {
      playerPageOpen: false,
      trackImage: 'https://www.picsum.photos/1920/1080',
      tab: 'lyrics'
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
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100vh);
}

.player-frame-container {
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 26.5rem;
  right: 0;
  height: 8rem;
  background: transparent;
  backdrop-filter: blur(20px) brightness(0.5);
  /* border-top: 1px solid #fff; */
  display: grid;
  grid-template-columns: 1fr 0fr;
  align-items: center;
  align-content: center;
  transition: all 0.3s ease-in;
}

.player-main {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
}

.player-track-info {
  display: flex;
  align-items: center;
  padding: 1rem;
  /* transition: all 0.3s ease-in-out; */
}

.player-track-img {
  width: 11rem;
  aspect-ratio: 16/9;
  border-radius: 1rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  /* transition: all 0.3s ease-in-out; */
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
    /* transition: all 0.3s ease-in-out; */
  }

  .player-track-artist {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-subtitle-color);
    /* transition: all 0.3s ease-in-out; */
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
  justify-content: flex-end;
}

.player-page-open {
  background-color: black;
}

.player-page-open.player-frame-container ~ .navbar > .search-container {
  background-color: black;
}

.player-page {
  position: fixed;
  bottom: 8rem;
  left: 26.5rem;
  right: 0;
  top: 7rem;
  padding: 5rem;
  background-color: black;
  /* background: transparent;
  backdrop-filter: blur(20px) brightness(0.5); */
  display: grid;
  gap: 4rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  align-content: center;

  .player-page-left {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    position: relative;

    .player-page-img {
      width: 95%;
      aspect-ratio: 16/9;
      border-radius: 2rem;
      z-index: 12;
    }

    .player-page-img-ambient {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      aspect-ratio: 16/9;
      filter: blur(20px) brightness(1);
      pointer-events: none;
      z-index: 11;
      transform-origin: center;
      transform: scaleY(1.2) scaleX(1.1);
    }
  }

  .player-page-right {
    height: 100%;
  }
}
.page-tab-window {
  overflow: hidden;
  height: calc(100vh - 10rem - 7rem - 10rem);
}
.lyrics {
  font-size: 2rem;
  line-height: 2.5rem;
  color: var(--text-color-placeholder);
  overflow-y: scroll;
  padding: 2rem;
  height: 100%;
}
</style>
