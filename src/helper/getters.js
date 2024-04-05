import { get } from '@/utils/http'
import { useUserStore } from '@/stores/user'

export async function getUser(userId) {
  const response = await get(`/user/${userId}`)
  const data = await response.json()
  return data
}

export async function getChannel(channelId, full = false) {
  const response = await get(
    `/channel/${channelId}${full ? '?detail=full' : ''}`,
    {},
    useUserStore().token
  )
  const data = await response.json()
  if (full) {
    return data
  }
  return data.channel
}

export async function getChannelTracks(channelId) {
  const response = await get(`/channel/${channelId}?detail=tracks`)
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
  return data.tracks
}

export async function getLatestAlbums() {
  const response = await get('/albums/latest')
  const data = await response.json()
  return data.albums
}

export async function getTopTracks(number = 10) {
  const token = useUserStore().token
  const response = await get(`/tracks/top/views?n=${number}`, {}, token)
  const data = await response.json()
  return data.tracks
}

export async function getTopRatedTracks(number = 10) {
  const token = useUserStore().token
  const response = await get(`/tracks/top/ratings?n=${number}`, {}, token)
  const data = await response.json()
  return data.tracks
}

export async function getTopChannels(number = 10) {
  const response = await get(`/channels/top?n=${number}`)
  const data = await response.json()
  return data.channels
}

export async function getGenres() {
  const response = await get('/genres')
  const data = await response.json()
  return data.genres
}

export async function getGenreTracks(genreId) {
  const response = await get(`/genre/${genreId}/tracks`)
  const data = await response.json()
  return data
}

export async function getAlbum(albumId) {
  const response = await get(`/album/${albumId}`, {}, useUserStore().token)
  const data = await response.json()
  return data.album
}
