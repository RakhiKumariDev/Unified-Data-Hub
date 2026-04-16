import type { WeatherForecast, WeatherRequest } from '@/domain/models/weather'
import { endpoints } from '@/infrastructure/api/endpoints'
import { weatherApi } from '@/infrastructure/api/axiosInstance'

export const weatherService = {
  async getForecast(request: WeatherRequest, signal?: AbortSignal): Promise<WeatherForecast> {
    const response = await weatherApi.get<WeatherForecast>(endpoints.openMeteo.forecast, {
      params: {
        latitude: request.latitude,
        longitude: request.longitude,
        current_weather: true,
      },
      signal,
    })

    return response.data
  },
}