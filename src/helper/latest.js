import { get } from '@/utils/http'
import { useUserStore } from '@/stores/user'
export async function getLatestTracks() {
  const token = useUserStore().token
  const response = await get('/tracks/latest', {}, token)
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
