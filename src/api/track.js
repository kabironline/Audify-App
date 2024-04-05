import { useUserStore } from '@/stores/user'
import { del, get, post, put } from '@/utils/http'

export const getTrack = async (trackId) => {
  const response = await get(`/track/${trackId}`)
  if (response.status === 200) {
    const json = await response.json()
    return json
  }
  return null
}

export const uploadTrack = async (data) => {
  const response = await post('/track', data, {}, useUserStore().token)
  if (response.status === 201) {
    return true
  }
  return false
}

export const editTrack = async (trackId, data) => {
  const response = await put(`/track/${trackId}`, data, {}, useUserStore().token)
  if (response.status === 200) {
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

export const deleteTrack = async (trackId) => {
  const response = await del(`/track/${trackId}`, {}, useUserStore().token)
  if (response.status === 200) {
    return true
  }
  return false
}
