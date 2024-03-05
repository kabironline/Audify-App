import { get } from '@/utils/http'
import { useUserStore } from '@/stores/user'

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
  const response = await get(`/tracks/top?n=${number}`, {}, token)
  const data = await response.json()
  return data.top
}

export async function getTopChannels(number = 10) {
  const token = useUserStore().getToken
  const response = await get(`/channels/top?n=${number}`, {}, token)
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
