import { useUserStore } from '@/stores/user'
import { get, post } from '@/utils/http'

export const uploadTrack = async (data) => {
  const response = await post('/track', data, {}, useUserStore().token)
  if (response.status === 201) {
    return true
  }
  return false
}

export const getTrackRatingForUser = async (trackId) => {
  const response = await get(`/track/${trackId}/rating`, {}, useUserStore().token)
  if (response.status === 200) {
    const json = await response.json()
    return json.user_rating
  }
  return null
}
