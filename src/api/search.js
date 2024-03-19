import { get } from '@/utils/http'
import { useUserStore } from '@/stores/user'

export const search = async (query) => {
  const user = useUserStore()
  const response = await get(`/search?q=${query}`, {}, user.token)
  if (response.status === 200) {
    return await response.json()
  }
  return null
}
