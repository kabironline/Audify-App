import { del, get, post, put } from '@/utils/http'
import { useUserStore } from '@/stores/user'
import { toRaw } from 'vue'

export async function createAlbum(data) {
  const token = useUserStore().token
  data = toRaw(data)
  const response = await post('/album', data, {}, token)
  if (response.status === 201) {
    const json = await response.json()
    return json.album.id
  }
  const json = await response.json()
  return json.error
}

export async function updateAlbum(id, data) {
  const token = useUserStore().token
  data = toRaw(data)
  const response = await put(`/album/${id}`, data, {}, token)
  if (response.status === 200) {
    return ''
  }
  const json = await response.json()
  return json.error
}

export async function deleteAlbum(id) {
  const token = useUserStore().token
  const response = await del(`/album/${id}`, {}, token)
  if (response.status === 200) {
    return true
  }

  return false
}

export async function getChannelAlbums(channelId) {
  const response = await get(`/channel/${channelId}?detail=albums`)
  if (response.status === 200) {
    const json = await response.json()
    return json.albums
  }
  return []
}
