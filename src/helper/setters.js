import { toRaw } from 'vue'
import { post } from '@/utils/http'
import { useUserStore } from '@/stores/user'

export async function createPlaylist(data) {
  const token = useUserStore().token
  data = toRaw(data)
  const response = await post('/playlist', data, {}, token)
  const json = await response.json()
  return json.playlist
}
