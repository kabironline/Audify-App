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
    async initializeUserAtStart() {
      // Reading local storage for token and user
      const token = localStorage.getItem('token')
      const user = await JSON.parse(localStorage.getItem('user'))
      if (token && user) {
        this.setToken(token)
        this.setUser(user)
      }
    },
    async getUserRecents() {
      if (!this.token) return null
      // send the access token in the header as a bearer token
      const reponse = await get('/tracks/recents', {}, this.token)
      let data = await reponse.json()
      return data.recents
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
    getUserId() {
      if (!this.user) return null
      return this.user.id
    },
    getUserChannel() {
      if (!this.user) return null
      return this.user.channel ? toRaw(this.user.channel) : null
    },
    getUserAvatar() {
      if (!this.user) return null
      return userAvatar(this.user.id)
    }
  }
})
