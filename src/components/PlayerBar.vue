<template>
  <Transition name="slide">
    <div
      v-show="this.track !== null"
      class="player-frame-container"
      :class="{ 'player-page-open': playerPageOpen }"
    >
      <div class="player-main">
        <audio ref="audio" :src="this.trackMedia" class="player-audio" />
        <Transition name="slide">
          <div class="player-track-info" v-if="!playerPageOpen">
            <img ref="image" :src="trackImage" class="player-track-img" />
            <div class="player-track-details">
              <div class="player-track-title">{{ trackName }}</div>
              <div class="player-track-artist" @click.stop="navigateToChannel()">{{ trackArtist }}</div>
            </div>
          </div>
        </Transition>
        <div class="player-controls">
          <div class="player-control-container">
            <BtnIcon
              :disabled="isBackwardDisabled"
              :action="playPrevTrack"
              icon="fast_rewind"
              :iconSize="3"
              v-if="isPlaylist"
            />
            <BtnIcon
              :icon="playButton"
              :action="togglePlayPause"
              class="play-button"
              :iconSize="3"
            />
            <BtnIcon
              :disabled="isForwardDisabled"
              :action="playNextTrack"
              icon="fast_forward"
              :iconSize="3"
              v-if="isPlaylist"
            />
            <BtnIcon icon="repeat" :action="toggleLoop" :color="loopColor" :iconSize="2" />
            <BtnIcon :color="thumbsUpColor" :action="thumbsUp" icon="thumb_up" :iconSize="2" />
            <BtnIcon
              :color="thumbsDownColor"
              :action="thumbsDown"
              icon="thumb_down"
              :iconSize="2"
            />
          </div>
          <div ref="playerProgressBar" class="player-progress-bar">
            <div
              class="player-progress-bar--knob"
              :style="{
                left: `${playerProgress * 100}%`
              }"
              f
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
          <BtnIcon :icon="volumeIcon" @click="toggleVolume()" />
          <input v-model.lazy="volume" type="range" min="0" max="1" value="1" step="0.01" class="player__volume--bar" />
          <BtnIcon
            :icon="playerPageOpen ? 'expand_more' : 'expand_less'"
            @click.prevent="togglePlayerPage"
          />
        </div>
      </div>
    </div>
  </Transition>
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
        <p class="player-page-track-title">{{ trackName }}</p>
        <div class="player-page-track-artist d-flex align-center gap-1" @click.stop="navigateToChannel">
          {{ trackArtist }} &CenterDot; {{ formatDateTime }} &CenterDot; {{ track.views }} Views
          &CenterDot; {{ (track.average_rating * 100).toFixed(0) }}% &ThinSpace;
          <div class="rating">
            <div class="rating__bar" :style="{ width: `${track.average_rating * 100}%` }"></div>
          </div>
          <div class="player__rating--text"></div>
          &ThinSpace;
        </div>
      </div>
      <div class="player-page-right">
        <v-tabs v-model="tab" bg-color="background">
          <v-tab value="Lryics" v-show="track.lyrics != ''">Lryics</v-tab>
          <v-tab value="Comments">Comments</v-tab>
          <v-tab value="Playlist" v-show="this.isPlaylist">Playlist</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="Lryics" class="page-tab-window">{{ track.lyrics }}</v-window-item>
          <v-window-item value="Comments" class="page-tab-window">
            <div class="comment-tab-container">
              <div class="comments">
                <CommentComponent
                  v-for="comment in trackComments"
                  :comment="comment"
                  :key="comment.id"
                  :userId="getUserId"
                  @deleteComment="deleteComment"
                />
                <div class="no-comment" v-if="trackComments.length == 0">
                  No comments yet, Be the first to comment!
                </div>
              </div>
              <div class="comment-container">
                <div class="comment-box">
                  <input
                    minlength="1"
                    required
                    type="text"
                    v-model="commentBox"
                    autocomplete="off"
                    name="comment"
                    placeholder="Enter comment"
                    class="comment-box--bar"
                  />
                  <BtnIcon icon="send" :action="sendComment" :iconSize="3" class="comment-box--btn">
                  </BtnIcon>
                </div>
              </div>
            </div>
          </v-window-item>
          <v-window-item value="Playlist" class="page-tab-window">
            <ListTrack :isInPlayer="true" :tracks="playlist" :trackItemSelected="playlistIndex" />
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
import { usePlayerStore } from '@/stores/player'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import { get, post, del } from '@/utils/http'
import { formatDate, formatDuration } from '@/helper/format'
export default {
  e: 'PlayerBar',
  components: { BtnIcon, ListTrack, CommentComponent },
  watch: {
    isPlaying() {
      if (this.isPlaying) {
        this.playTrack()
      } else {
        this.pauseTrack()
      }
    },
    volume() {
      const audio = this.$refs.audio
      audio.volume = this.volume
      localStorage.setItem('volume', this.volume)
    }
  },
  data() {
    return {
      playerPageOpen: false,
      playButton: 'play_circle',
      playerProgress: 0.0,
      progressSync: true,
      isLooping: false,
      track: null,
      tab: 'Comments',
      trackComments: [],
      trackMedia: '',
      trackImage: 'https://www.picsum.photos/1920/1080',
      isPlaylist: false,
      playlist: [],
      playlistIndex: null,
      isPlaying: false,
      commentBox: '',
      volume: 1
    }
  },
  computed: {
    ...mapState(usePlayerStore, [
      'getCurrentTrack',
      'getCurrentTrackCover',
      'getCurrentTrackMedia',
      'getIsListOfTracks',
      'getCurrentPlaylist',
      'getCurrentIndex'
    ]),
    ...mapState(useUserStore, ['getUserId', 'getToken']),
    loopColor() {
      return this.isLooping ? 'white' : 'var(--text-placeholder-color)'
    },
    trackName() {
      return this.track ? this.track.name : 'Track Name'
    },
    trackArtist() {
      return this.track ? this.track.channel.name : 'Artist Name'
    },
    isForwardDisabled() {
      return this.playlistIndex === this.playlist.length - 1
    },
    isBackwardDisabled() {
      return this.playlistIndex === 0
    },
    thumbsUpColor() {
      if (!this.track) return ''
      return this.track.rating === 1 ? 'white' : 'var(--text-placeholder-color)'
    },
    thumbsDownColor() {
      if (!this.track) return ''
      return this.track.rating === 0 ? 'white' : 'var(--text-placeholder-color)'
    },
    formatDateTime() {
      return formatDate(this.track.created_at)
    },
    volumeIcon() {
      return this.volume == 0 ? 'volume_off' : this.volume < 0.5 ? 'volume_down' : 'volume_up'
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['updateIsPlaying', 'playTrackAtIndex']),
    formatDuration,
    navigateToChannel() {
      this.playerPageOpen = false
      this.$router.push(`/channel/${this.track.channel.id}/dashboard`)
    },
    toggleVolume() {
      this.volume = this.volume == 0 ? 1 : 0
    },
    togglePlayerPage() {
      this.playerPageOpen = !this.playerPageOpen
    },
    togglePlayPause() {
      this.isPlaying = !this.isPlaying
    },
    playTrack() {
      this.playButton = 'pause_circle'
      setTimeout(() => {
        this.$refs.audio.play()
      }, 100)
    },
    pauseTrack() {
      this.$refs.audio.pause()
      this.playButton = 'play_circle'
    },
    playNextTrack() {
      this.playTrackAtIndex(this.playlistIndex + 1)
    },
    playPrevTrack() {
      this.playTrackAtIndex(this.playlistIndex - 1)
    },
    thumbsUp() {
      this.updateRating(1)
    },
    thumbsDown() {
      this.updateRating(0)
    },
    async updateRating(rating) {
      if (this.track === null) return
      const response = await post(`/track/${this.track.id}/rating/${rating}`, {}, {}, this.getToken)
      const data = await response.json()
      if (data.action === 'created') {
        this.track.rating = rating
        this.track.average_rating = data.average_rating
      } else {
        this.track.rating = null
        this.track.average_rating = data.average_rating
      }
    },
    initializePlayer() {
      const audio = this.$refs.audio
      audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration
        this.$refs.time.textContent = `0:00 / ${this.formatDuration(duration)}`
      })
    },
    timeUpdate() {
      const audio = this.$refs.audio
      const duration = audio.duration
      const currentTime = audio.currentTime
      this.$refs.time.textContent = `${this.formatDuration(currentTime)} / ${this.formatDuration(duration)}`
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
    },
    updatePlayer(mutation) {
      if (mutation.name !== 'playTrack') return
      // mutation.after
      mutation.after(() => {
        this.isPlaying = false
        if (this.getIsListOfTracks) {
          if (this.playlist !== this.getCurrentPlaylist) {
            this.isPlaylist = true
            this.playlist = this.getCurrentPlaylist
          }
          this.playlistIndex = this.getCurrentIndex
          this.track = this.playlist[this.playlistIndex]
          this.trackMedia = this.getCurrentTrackMedia
          this.trackImage = this.getCurrentTrackCover
          this.$refs.audio.src = this.trackMedia
        } else {
          this.trackMedia = this.getCurrentTrackMedia
          this.$refs.audio.src = this.trackMedia
          this.trackImage = this.getCurrentTrackCover
          this.track = this.getCurrentTrack
          this.isPlaylist = false
          this.playlist = []
          this.playlistIndex = null
        }
        this.playerProgress = 0
        if (this.track === null) {
          this.tab = 'Comments'
          return
        }
        this.isPlaying = true
        this.playTrack()
        this.tab =
          this.track.lyrics != '' ? 'Lryics' : this.playlist.length > 0 ? 'Playlist' : 'Comments'
        this.trackComments = []
        this.loadComments()
      })
    },
    loadComments() {
      if (this.track === null) return
      get(`/track/${this.track.id}/comments`, {}, this.getToken).then((response) => {
        response.json().then((data) => {
          this.trackComments = data.comments
        })
      })
    },
    deleteComment(id) {
      del(`/track/${this.track.id}/comment/${id}`, {}, this.getToken).then((response) => {
        if (response.status === 200) {
          this.loadComments()
        }
      })
    },
    sendComment() {
      if (this.commentBox === '') return
      post(
        `/track/${this.track.id}/comments`,
        { comment: this.commentBox },
        {},
        this.getToken
      ).then((response) => {
        if (response.status === 201) {
          this.commentBox = ''
          response.json().then((data) => {
            this.trackComments.unshift(data.comment)
          })
        }
      })
    }
  },
  mounted() {
    const audio = this.$refs.audio
    this.initializePlayer()

    // Add a event listener if the state of the player changes

    audio.addEventListener('pause', () => (this.isPlaying = false))
    audio.addEventListener('play', () => (this.isPlaying = true))

    audio.addEventListener('timeupdate', this.timeUpdate)
    audio.addEventListener('ended', () => {
      this.playButton = 'play_circle'
      if (this.isLooping) {
        if (!this.isPlaylist) {
          this.progress = 0
          this.playTrack()
        } else {
          if (this.playlistIndex === this.playlist.length - 1) {
            this.playTrackAtIndex(0)
          } else {
            this.playTrackAtIndex(this.playlistIndex + 1)
          }
        }
      }

      if (this.isPlaylist && this.playlistIndex !== this.playlist.length - 1) {
        this.playTrackAtIndex(this.playlistIndex + 1)
      } else {
        this.pauseTrack()
        this.playerProgress = 0
      }
    })

    this.$refs.playerProgressBar.addEventListener('mousedown', () => {
      this.progressSync = false
    })
    // Add event listener for dragging the progress bar
    this.$refs.playerProgressBar.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) {
        this.updateProgress(e, false)
      }
    })
    this.$refs.playerProgressBar.addEventListener('mouseup', (e) => {
      this.progressSync = true
      this.updateProgress(e, false)
    })

    // Getting the value from localStorage and setting the volume and the loop state
    const volume = localStorage.getItem('volume')
    if (volume) {
      audio.volume = volume
    }
    this.isLooping = localStorage.getItem('loop') === 'true'

    const playerStore = usePlayerStore()

    // subscribe to the player store
    playerStore.$onAction((mutation) => this.updatePlayer(mutation))

    this.volume = localStorage.getItem('volume') || 1
  },
  beforeUnmount() {
    const audio = this.$refs.audio
    audio.removeEventListener('timeupdate', this.timeUpdate)
    audio.removeEventListener('ended', () => {
      this.playButton = 'play_circle'
    })
    this.$refs.playerProgressBar.removeEventListener('click', this.updateProgress)
    this.$refs.playerProgressBar.removeEventListener('mousedown', () => {
      this.progressSync = false
    })
    this.$refs.playerProgressBar.removeEventListener('mousemove', (e) => {
      if (e.buttons === 1) {
        this.updateProgress(e, false)
      }
    })
    this.$refs.playerProgressBar.removeEventListener('mouseup', (e) => {
      this.progressSync = true
      this.updateProgress(e, false)
    })
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
  transform: translateY(100%);
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
  grid-template-columns: 2fr 3fr min-content;
  grid-template-rows: 1fr;
  height: 100%;
  transition: all 0.3s ease-in-out;
}

.player-track-info {
  display: flex;
  align-items: center;
  padding: 1rem;
  overflow: hidden;
}

.player-track-img {
  width: 11rem;
  aspect-ratio: 16/9;
  border-radius: 1rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  object-fit: cover;
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
    text-overflow: ellipsis;
  }

  .player-track-artist {
    font-size: 1.5rem;
    font-weight: 400;
    color: var(--text-subtitle-color);
    text-overflow: ellipsis;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.rating {
  height: 1rem;
  width: 10rem;
  background-color: var(--color-background-light);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
}

.rating__bar {
  background-color: var(--color-primary);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: all 0.2s;
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

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
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

.no-comment {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-light);
  font-size: 1.8rem;
  height: 100%;
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
