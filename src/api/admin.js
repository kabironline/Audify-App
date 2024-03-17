import { useUserStore } from '@/stores/user'
import { get, post, del } from '@/utils/http'

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

export const getAdminAllTracks = async () => {
  const response = await get('/admin/data/tracks', {}, useUserStore().getToken)
  const json = await response.json()
  return json.tracks
}

export const flagTrack = async (trackId) => {
  const response = await post(`/admin/track/${trackId}/flag`, {}, {}, useUserStore().getToken)
  if (response.status === 200) {
    return true
  }
  return false
}

export const unflagTrack = async (trackId) => {
  const response = await post(`/admin/track/${trackId}/unflag`, {}, {}, useUserStore().getToken)
  if (response.status === 200) {
    return true
  }
  return false
}

export const blacklistChannel = async (channelId) => {
  const response = await post(
    `/admin/channel/${channelId}/blacklist`,
    {},
    {},
    useUserStore().getToken
  )
  if (response.status === 200) {
    return true
  }
  return false
}

export const removeBlacklistChannel = async (channelId) => {
  const response = await del(`/admin/channel/${channelId}/blacklist`, {}, useUserStore().getToken)
  if (response.status === 200) {
    return true
  }
  return false
}

export const whitelistChannel = async (channelId) => {
  const response = await post(
    `/admin/channel/${channelId}/whitelist`,
    {},
    {},
    useUserStore().getToken
  )
  return response.status === 200
}

export const removeWhitelistChannel = async (channelId) => {
  const response = await del(`/admin/channel/${channelId}/whitelist`, {}, useUserStore().getToken)
  return response.status === 200
}

export const getBlacklistedChannels = async () => {
  const response = await get('/admin/data/blacklist', {}, useUserStore().getToken)
  if (response.status === 200) {
    const json = await response.json()
    return json.blacklisted_channels
  }
  return []
}
