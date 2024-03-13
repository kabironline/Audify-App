import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    playlistModalOpen: false
  }),
  actions: {
    openPlaylistModal() {
      this.playlistModalOpen = true
    },
    closePlaylistModal() {
      this.playlistModalOpen = false
    }
  },
  getters: {
    isPlaylistModalOpen() {
      return this.playlistModalOpen
    }
  }
})
