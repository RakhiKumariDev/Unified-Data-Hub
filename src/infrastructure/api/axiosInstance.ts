import axios, { type InternalAxiosRequestConfig } from 'axios'

import { useAuthStore } from '@/app/store/authStore'
import { normalizeApiError } from '@/shared/utils/api'

function attachAuthToken(config: InternalAxiosRequestConfig) {
  const token = useAuthStore.getState().token

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
}

function createApiClient(baseURL: string) {
  const client = axios.create({
    baseURL,
    timeout: 15000,
  })

  client.interceptors.request.use(attachAuthToken)
  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(normalizeApiError(error)),
  )

  return client
}

export const authApi = createApiClient('https://dummyjson.com')
export const contentApi = createApiClient('https://jsonplaceholder.typicode.com')
export const cryptoApi = createApiClient('https://api.coingecko.com/api/v3')
export const weatherApi = createApiClient('https://api.open-meteo.com/v1')