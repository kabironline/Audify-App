import { defineStore } from 'pinia'
import { isProxy, toRaw } from 'vue'
import { get, userAvatar } from '@/utils/http'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    setUser(user) {
      if (isProxy(user)) {
        user = toRaw(user)
      }
      this.user = user
    },
    setToken(token) {
      this.token = token
    },
    logoutUser() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    addPlaylist(playlist) {
      if (!this.user) return
      this.user.playlists.push(playlist)
    },
    removePlaylist(playlistId) {
      if (!this.user) return
      let playlists = toRaw(this.user.playlists)
      playlists = playlists.filter((p) => {
        return p.id != playlistId
      })
      this.user.playlists.splice(0, this.user.playlists.length, ...playlists)
    },
    updatePlaylist(playlist) {
      if (!this.user) return
      const index = this.user.playlists.findIndex((p) => p.id === playlist.id)
      // pop the old playlist and push the new one
      this.user.playlists.splice(index, 1, playlist)
    },
    async initializeUserAtStart() {
      // Reading local storage for token and user
      const token = localStorage.getItem('token')
      const user = await JSON.parse(localStorage.getItem('user'))
      if (token && user) {
        this.setToken(token)
        this.setUser(user)
      }
      this.updateUser()
    },
    async updateUser() {
      if (!this.user) return
      const response = await get('/user/me', {}, this.token)
      if (response.status !== 200) {
        return
      }
      const json = await response.json()
      localStorage.setItem('user', JSON.stringify(json))
      this.setUser(json)
    }
  },
  getters: {
    isLoggedIn() {
      return this.token !== null
    },
    getUser() {
      if (!this.user) return null
      return toRaw(this.user)
    },
    getToken() {
      return this.token
    },
    getUserId() {
      if (!this.user) return null
      return this.user.id
    },
    getUserChannel() {
      if (!this.user) return null
      return this.user.channels.length ? toRaw(this.user.channels[0]) : null
    },
    getUserAvatar() {
      if (!this.user) return null
      return userAvatar(this.user.id)
    },
    getUserIsAdmin() {
      if (!this.user) return false
      return this.user.is_admin
    },
    getUserPlaylist() {
      if (!this.user) return null
      return this.user.playlists ? toRaw(this.user.playlists) : null
    },
    isAdmin() {
      if (!this.user) return false
      return this.user.is_admin
    }
  }
})
