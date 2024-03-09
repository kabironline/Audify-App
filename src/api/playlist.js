import { get, post, del } from '@/utils/http'
import { useUserStore } from '@/stores/user'
import { toRaw } from 'vue'

export async function getLatestPlaylists() {
  const response = await get('/playlists/latest')
  const data = await response.json()
  return data.latest
}

export async function getUserPlaylists(userId) {
  const response = await get(`/user/${userId}/playlists`)
  const data = await response.json()
  return data.playlists
}

export async function getPlaylist(playlistId) {
  const response = await get(`/playlist/${playlistId}`, {}, useUserStore().token)
  const data = await response.json()
  return data.playlist
}

export async function createPlaylist(data) {
  const token = useUserStore().token
  data = toRaw(data)
  const response = await post('/playlist', data, {}, token)
  const json = await response.json()
  return json.playlist
}

export async function deletePlaylist(playlistId) {
  const token = useUserStore().token
  const response = await del(`/playlist/${playlistId}`, {}, token)
  return response.status === 200
}
