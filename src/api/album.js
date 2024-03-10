import {  post } from '@/utils/http'
import { useUserStore } from '@/stores/user'
import { toRaw } from 'vue'

export async function createAlbum(data) {
  const token = useUserStore().token
  data = toRaw(data)
  const response = await post('/album', data, {}, token)
  if (response.status === 201) {
    const json = await response.json()
    return ""
  }

  return "error creating album"
}