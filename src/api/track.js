import { useUserStore } from '@/stores/user'
import { post } from '@/utils/http'

export const uploadTrack = async (data) => {
  const response = await post('/track', data, {}, useUserStore().token)
  if (response.status === 201) {
    return true
  }
  return false
}
