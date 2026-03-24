import axios from 'axios'

export function createApiClient() {
  return axios.create({
    baseURL: '/api',
    headers: {
      Accept: 'application/json',
    },
  })
}
