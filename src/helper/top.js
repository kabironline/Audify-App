import { get } from '@/utils/http'
import { useUserStore } from '@/stores/user'

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
