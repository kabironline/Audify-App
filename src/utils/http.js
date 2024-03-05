import { isProxy, toRaw } from 'vue'

const port = 5000
const baseUrl = `http://localhost:${port}/api/v2`

export async function request(method, url, data = null, headers, bearerToken = null) {
  url = baseUrl + url

  if (isProxy(data)) {
    data = toRaw(data)
  }

  let fetch_options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken ? `Bearer ${bearerToken}` : '',
      ...headers
    }
  }

  if (data) {
    fetch_options.body = JSON.stringify(data)
  }

  // send the request using fetch api
  return fetch(url, fetch_options)
}

export function get(url, headers, bearerToken) {
  return request('GET', url, null, {}, bearerToken)
}

/**
 * Posts data to the server and returns a promise
 * @param {} url
 * @param {*} data
 * @param {*} headers
 * @returns
 */
export function post(url, data, headers, bearerToken) {
  return request('POST', url, data, headers, bearerToken)
}

export function put(url, data, headers, bearerToken) {
  return request('PUT', url, data, headers, bearerToken)
}

export function del(url, headers, bearerToken) {
  return request('DELETE', url, null, headers, bearerToken)
}

export function userAvatar(userId) {
  return `http://localhost:${port}/user_avatar/${userId}`
}

export function channelAvatar(channelId) {
  return `http://localhost:${port}/channel_avatar/${channelId}`
}

export function trackImage(trackId) {
  return `http://localhost:${port}/tracks/${trackId}/cover`
}

export function trackMedia(trackId) {
  return `http://localhost:${port}/tracks/${trackId}/media`
}

export function albumImage(albumId) {
  return `http://localhost:${port}/album/${albumId}/cover`
}
