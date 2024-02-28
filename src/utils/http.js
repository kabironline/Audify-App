import { isProxy, toRaw } from 'vue'

const port = 5000
const baseUrl = `http://localhost:${port}/api/v2`

export async function request(method, url, data, headers) {
  url = baseUrl + url

  if (isProxy(data)) {
    data = toRaw(data)
  }

  // send the request using fetch api
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data)
  })
}

export function get(url, headers) {
  return request('GET', url, null, headers)
}

/**
 * Posts data to the server and returns a promise
 * @param {} url
 * @param {*} data
 * @param {*} headers
 * @returns
 */
export function post(url, data, headers) {
  return request('POST', url, data, headers)
}

export function put(url, data, headers) {
  return request('PUT', url, data, headers)
}

export function del(url, headers) {
  return request('DELETE', url, null, headers)
}

export function userAvatar(userId) {
  return `http://localhost:${port}/user_avatar/${userId}`
}
