import { get } from '@/utils/http'

export async function getLatestTracks() {
  const response = await get('/tracks/latest')
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
