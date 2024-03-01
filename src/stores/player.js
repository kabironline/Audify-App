import { defineStore } from 'pinia'
import { get, trackImage, trackMedia } from '@/utils/http'
import { toRaw } from 'vue'
export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentTrack: null,
    currentTrackIndex: null,
    currentPlaylist: [],
    currentTrackImage: null,
    currentTrackMedia: null,
    isListOfTracks: false
  }),
  actions: {
    async playTrack(track) {
      track = toRaw(track)
      this.currentTrack = track
      this.isPlaying = true
      this.currentTrackImage = trackImage(track.id)
      this.currentTrackMedia = trackMedia(track.id)
      this.isListOfTracks = false
    },
    initializePlayerAtStart() {
      this.currentTrack = null
      this.currentTrackIndex = null
      this.currentPlaylist = []
      this.currentTrackImage = null
      this.currentTrackMedia = null
      ;(this.isPlaying = false), (this.isListOfTracks = false)
    }
  },
  getters: {
    getCurrentTrack() {
      if (!this.currentTrack) return null
      return toRaw(this.currentTrack)
    },
    getCurrentTrackCover() {
      if (!this.currentTrack) return null
      return trackImage(this.currentTrack.id)
    },
    getCurrentTrackMedia() {
      if (!this.currentTrack) return null
      return trackMedia(this.currentTrack.id)
    }
  }
})
