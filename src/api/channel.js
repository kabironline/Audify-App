import { useUserStore } from "@/stores/user"
import { del, put } from "@/utils/http"

export const updateChannel = async (formData) => {
  const response = await put("/channel", formData, {}, useUserStore().getToken)
  if (response.status === 200) {
    await useUserStore().updateUser()
    return ""
  }
  const json = await response.json()
  return json.error
}

export const deleteChannel = async () => {
  const response = await del("/channel", {}, useUserStore().getToken)
  if (response.status === 200) {
    useUserStore().updateUser()
    return ""
  }
  const json = await response.json()
  return json.error
}