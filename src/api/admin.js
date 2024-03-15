import { useUserStore } from '@/stores/user'
import { get } from '@/utils/http'

export const getAdminDashboardNumbers = async () => {
  const response = await get('/admin/data', {}, useUserStore().getToken)
  const json = await response.json()
  return json
}

export const getAdminDashboardGraphs = async () => {
  const response = await get('/admin/data/graphs', {}, useUserStore().getToken)
  const json = await response.json()
  return json
}
