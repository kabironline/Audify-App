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
    playTrack(track, playlist = [], index = null) {
      track = toRaw(track)
      this.currentTrack =
        playlist != [] ? track : (this.currentTrackImage = trackImage(this.currentTrack.id))
      this.currentTrackMedia = trackMedia(this.currentTrack.id)
      this.isListOfTracks = playlist && playlist.length > 0
      this.currentTrackIndex = index
      this.currentPlaylist = playlist
    },
    playIndividualTrack(track) {
      this.playTrack(track, [], null)
    },
    async playPlaylist(playlist, index, type = 'playlist') {
      if (type === 'album') {
        const response = await get(`/album/${playlist.id}`)
        const data = await response.json()
        playlist = data.album.tracks
      } else if (type === 'playlist') {
        const response = await get(`/playlist/${playlist.id}`)
        const data = await response.json()
        playlist = data.playlist.tracks
      }
      this.playTrack(playlist[index], playlist, index)
    },
    playTrackAtIndex(index) {
      this.playTrack(this.currentPlaylist[index], this.currentPlaylist, index)
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
    },
    getIsListOfTracks() {
      return this.isListOfTracks
    },
    getCurrentPlaylist() {
      return this.currentPlaylist
    },
    getCurrentIndex() {
      return this.currentTrackIndex
    }
  }
})
