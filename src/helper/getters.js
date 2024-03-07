import { get } from '@/utils/http'
import { useUserStore } from '@/stores/user'
export async function getUser(userId) {
  const response = await get(`/user/${userId}`)
  const data = await response.json()
  return data
}

export async function getUserRecents(userId, number = 5) {
  const token = useUserStore().token
  const response = await get(`/user/${userId}/tracks/recents?n=${number}`, {}, token)
  const data = await response.json()
  return data.recents
}

export async function getLatestTracks(number = 5) {
  const token = useUserStore().token
  const response = await get(`/tracks/latest?n=${number}`, {}, token)
  const data = await response.json()
  return data.latest
}

export async function getLatestAlbums() {
  const response = await get('/albums/latest')
  const data = await response.json()
  return data.latest
}

export async function getLatestPlaylists() {
  const response = await get('/playlists/latest')
  const data = await response.json()
  return data.latest
}

export async function getTopTracks(number = 10) {
  const token = useUserStore().token
  const response = await get(`/tracks/top/views?n=${number}`, {}, token)
  const data = await response.json()
  return data.top
}

export async function getTopRatedTracks(number = 10) {
  const token = useUserStore().token
  const response = await get(`/tracks/top/ratings?n=${number}`, {}, token)
  const data = await response.json()
  return data.top
}

export async function getTopChannels(number = 10) {
  const response = await get(`/channels/top?n=${number}`)
  const data = await response.json()
  return data.top
}

export async function getGenres() {
  const response = await get('/genres')
  const data = await response.json()
  return data.genres
}

export async function getGenreTracks(genreId) {
  const response = await get(`/genre/${genreId}/tracks`)
  const data = await response.json()
  return data.tracks
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