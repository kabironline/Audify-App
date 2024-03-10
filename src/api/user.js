import { del, put } from '@/utils/http'
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

export const deleteUser = async () => {
  const response = await del('/user', {}, useUserStore().getToken)
  if (response.status === 200) {
    useUserStore().logoutUser()
    return ""
  }
  const json = await response.json()
  return json.error
}