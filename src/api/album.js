import { del, post } from '@/utils/http'
import { useUserStore } from '@/stores/user'
import { toRaw } from 'vue'

export async function createAlbum(data) {
  const token = useUserStore().token
  data = toRaw(data)
  const response = await post('/album', data, {}, token)
  if (response.status === 201) {
    return ''
  }

  return 'Error creating album'
}

export async function deleteAlbum(id) {
  const token = useUserStore().token
  const response = await del(`/album/${id}`, {},  token)
  if (response.status === 200) {
    return true
  }

  return false
}
