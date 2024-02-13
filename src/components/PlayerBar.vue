<template>
  <div class="player-frame-container" :class="{ 'player-page-open': playerPageOpen }">
    <div class="player-main">
      <audio ref="audio" :src="this.media" class="player-audio" />
      <Transition name="slide">
        <div class="player-track-info" v-if="!playerPageOpen">
          <img ref="image" :src="trackImage" class="player-track-img" />
          <div class="player-track-details">
            <div class="player-track-title">Low Quality Shape of You!</div>
            <div class="player-track-artist">Adi Shreeman</div>
          </div>
        </div>
      </Transition>
      <div class="player-controls">
        <div class="player-control-container">
          <BtnIcon icon="fast_rewind" :iconSize="3" />
          <BtnIcon :icon="playButton" :action="togglePlayPause" class="play-button" :iconSize="3" />
          <BtnIcon icon="fast_forward" :iconSize="3" />
          <BtnIcon icon="repeat" :action="toggleLoop" :color="loopColor" :iconSize="2" />
          <!-- Like and dislike button -->
          <BtnIcon icon="thumb_up" :iconSize="2" />
          <BtnIcon icon="thumb_down" :iconSize="2" />
        </div>
        <div ref="playerProgressBar" class="player-progress-bar">
          <div
            class="player-progress-bar--knob"
            :style="{
              left: `${playerProgress * 100}%`
            }"
          ></div>
          <div class="player-progress-bar--track-background"></div>
          <div
            class="player-progress-bar--track-progress"
            :style="{
              width: `${playerProgress * 100}%`
            }"
          ></div>
        </div>
        <div ref="time" class="player-control--time">0:00 / 0:00</div>
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
        <p class="player-page-track-title">Low Quality Shape of you!</p>
        <p class="player-page-track-artist">Adi Shreeman</p>
      </div>
      <div class="player-page-right">
        <v-tabs v-model="tab" bg-color="background">
          <v-tab value="Lryics">Lryics</v-tab>
          <v-tab value="Comments">Comments</v-tab>
          <v-tab value="Playlist">Playlist</v-tab>
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

          <v-window-item value="Comments" class="page-tab-window">
            <div class="comment-tab-container">
              <div class="comments">
                <CommentComponent v-for="comment in 10" :key="comment" />
              </div>
              <form class="comment-container" onsubmit="sendComment()">
                <div class="comment-box">
                  <input
                    minlength="1"
                    required
                    type="text"
                    autocomplete="off"
                    name="comment"
                    placeholder="Enter comment"
                    class="comment-box--bar"
                  />
                  <button type="submit" value="comment" class="comment-box--btn">
                    <i class="fas fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </div>
              </form>
            </div>
          </v-window-item>

          <v-window-item value="Playlist" class="page-tab-window">
            <ListTrack :isInPlayer="True" />
          </v-window-item>
        </v-window>
      </div>
    </div>
  </Transition>
</template>

<script>
import CommentComponent from './CommentComponent.vue'
import BtnIcon from './BtnIcon.vue'
import ListTrack from './ListTracks.vue'

export default {
  name: 'PlayerBar',
  components: { BtnIcon, ListTrack, CommentComponent },
  data() {
    return {
      playerPageOpen: false,
      trackImage: 'https://www.picsum.photos/1920/1080',
      tab: 'lyrics',
      playButton: 'play_circle',
      playerProgress: 0.0,
      progressSync: true,
      isLooping: false
    }
  },
  props: {
    media: {
      type: String,
      default: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    }
  },
  computed: {
    loopColor() {
      return this.isLooping ? 'white' : 'var(--text-placeholder-color)'
    }
  },
  methods: {
    togglePlayerPage() {
      this.playerPageOpen = !this.playerPageOpen
    },
    togglePlayPause() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.playButton = 'pause_circle'
      } else {
        this.$refs.audio.pause()
        this.playButton = 'play_circle'
      }
    },
    formatTime(seconds) {
      let minutes = Math.floor(seconds / 60)
      let sec = Math.floor(seconds % 60)
      // Format the time to always have 2 digits
      return `${('000' + minutes).slice(-2)}:${('00' + sec).slice(-2)}`
    },
    initializePlayer() {
      const audio = this.$refs.audio
      audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration
        this.$refs.time.textContent = `0:00 / ${this.formatTime(duration)}`
      })
    },
    timeUpdate() {
      const audio = this.$refs.audio
      const duration = audio.duration
      const currentTime = audio.currentTime
      this.$refs.time.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(duration)}`
      if (this.progressSync) {
        this.playerProgress = currentTime / duration
      }
    },
    updateProgress(e, dragOnly = false) {
      const audio = this.$refs.audio
      const progress = e.offsetX / this.$refs.playerProgressBar.offsetWidth
      if (!dragOnly) audio.currentTime = audio.duration * progress
      this.playerProgress = progress
    },
    toggleLoop() {
      const audio = this.$refs.audio
      this.isLooping = !this.isLooping
      audio.loop = this.isLooping
      localStorage.setItem('loop', this.isLooping)
    }
  },
  mounted() {
    const audio = this.$refs.audio
    this.initializePlayer()

    audio.addEventListener('timeupdate', this.timeUpdate)
    audio.addEventListener('ended', () => {
      this.playButton = 'play_circle'
    })

    this.$refs.playerProgressBar.addEventListener('click', this.updateProgress)
    // Add event listener for dragging the progress bar
    this.$refs.playerProgressBar.addEventListener('mousemove', (e) => {
      this.progressSync = false
      if (e.buttons === 1) {
        this.updateProgress(e, true)
      }
    })
    this.$refs.playerProgressBar.addEventListener('mousedown', () => {
      this.progressSync = true
    })

    // Getting the value from localStorage and setting the volume and the loop state
    const volume = localStorage.getItem('volume')
    if (volume) {
      audio.volume = volume
    }
    this.isLooping = localStorage.getItem('loop') === 'true'
    console.log(this.isLooping)
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

.slide-enter-active,
.slide-leave-active {
  z-index: 10;
  transition: all 0.1s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  z-index: 10;
}

.player-frame-container {
  z-index: 10;
  position: fixed;
  bottom: 0;
  left: 26.5rem;
  right: 0;
  height: 8rem;
  background: #ffffff13;
  backdrop-filter: blur(20px) brightness(0.5);
  border-top: 1px solid var(--color-border-light);
  display: grid;
  grid-template-columns: 1fr 0fr;
  align-items: center;
  align-content: center;
  transition: all 0.3s ease-in;
}

.player-main {
  display: grid;
  grid-template-columns: 1fr 3fr min-content;
  grid-template-rows: 1fr;
  height: 100%;
  transition: all 0.3s ease-in-out;
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
  grid-column: 2;

  .player-control-container {
    display: flex;
    flex-direction: row;
  }

  .player-progress-bar {
    flex: 1;
    position: relative;
    height: 100%;
    background-color: transparent;
    border-radius: 1rem;
    z-index: 13;

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

    .player-progress-bar--track-background {
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 0.5rem;
      transform: translateY(-50%);
      background-color: var(--color-background-light);
      border-radius: 1rem;
      z-index: 10;
    }

    .player-progress-bar--track-progress {
      position: absolute;
      left: 0;
      top: 50%;
      width: 50%;
      height: 0.5rem;
      transform: translateY(-50%);
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

  .player-main {
    grid-template-columns: 0fr 3fr min-content;
  }
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
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 1rem;
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
      top: 0;
      width: 95%;
      aspect-ratio: 16/9;
      filter: blur(20px) brightness(1);
      pointer-events: none;
      z-index: 11;
      transform-origin: center;
      transform: scaleY(1.2) scaleX(1.1);
    }

    .player-page-track-title {
      font-size: 3rem;
      font-weight: 600;
      color: white;
      z-index: 13;
    }

    .player-page-track-artist {
      font-size: 2rem;
      font-weight: 400;
      color: var(--text-subtitle-color);
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

.comment-tab-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
}

.comments {
  flex: 1;
  padding: 1rem;
  overflow-y: scroll;
}
.comment-box {
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 3rem;
  width: 100%;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.comment-box--bar {
  height: 3.5rem;
  width: 100%;
  background-color: transparent;
  border: none;
  padding: 0 2rem;
  margin: 0;
  font: inherit;
  transition: all 0.2s ease-out;
  color: white;

  &:active,
  &:focus,
  &:hover:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--text-placeholder-color);
  }
}

/* Style the range input */

input[type='range'] {
  font-size: 1.5rem;
  /* width: 100%; */
}

input[type='range'] {
  color: var(--color-primary);
  --thumb-height: 1.125em;
  --track-height: 0.125em;
  --track-color: var(--color-background-light);
  --brightness-hover: 180%;
  --brightness-down: 80%;
  --clip-edges: 0.125em;
}

input[type='range'] {
  position: relative;
  background: #fff0;
  overflow: hidden;
}

input[type='range']:active {
  cursor: grabbing;
}

input[type='range'],
input[type='range']::-webkit-slider-runnable-track,
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

input[type='range']::-webkit-slider-runnable-track,
input[type='range']::-webkit-slider-thumb {
  position: relative;
}

input[type='range']::-webkit-slider-thumb {
  --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
  --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
  --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
  --clip-further: calc(100% + 1px);
  --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0 100vmax currentColor;
  width: var(--thumb-width, var(--thumb-height));
  background: linear-gradient(currentColor 0 0) scroll no-repeat left center / 50%
    calc(var(--track-height) + 1px);
  box-shadow: var(--box-fill);
  border-radius: var(--thumb-width, var(--thumb-height));
  background-color: transparent;

  filter: brightness(100%);
  clip-path: polygon(
    100% -1px,
    var(--clip-edges) -1px,
    0 var(--clip-top),
    -100vmax var(--clip-top),
    -100vmax var(--clip-bottom),
    0 var(--clip-bottom),
    var(--clip-edges) 100%,
    var(--clip-further) var(--clip-further)
  );
}

input[type='range']:hover::-webkit-slider-thumb {
  background-color: currentColor;
  filter: brightness(var(--brightness-hover));
  cursor: grab;
}

input[type='range']:active::-webkit-slider-thumb {
  filter: brightness(var(--brightness-down));
  cursor: grabbing;
}

input[type='range']::-webkit-slider-runnable-track {
  background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center / 100%
    calc(var(--track-height) + 1px);
}

input[type='range']:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}
</style>
