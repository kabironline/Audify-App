import { post, put } from '@/utils/http'
import { useUserStore } from '@/stores/user'

export const updateUser = async (formData) => {

  const response = await put('/user', formData, {}, useUserStore().getToken)
  if (response.status === 200) {
    await useUserStore().updateUser()
    return ""
  } 
  const json = await response.json()
  return json.error
}
