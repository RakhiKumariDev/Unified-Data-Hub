import { useQuery } from '@tanstack/react-query'

import { weatherService } from '@/infrastructure/services/weatherService'
import { queryKeys } from '@/shared/constants/queryKeys'

interface UseWeatherOptions {
  latitude: number
  longitude: number
  autoRefreshMs?: number
}

export function useWeather({ latitude, longitude, autoRefreshMs = 60_000 }: UseWeatherOptions) {
  return useQuery({
    queryKey: queryKeys.weather(latitude, longitude),
    queryFn: ({ signal }) => weatherService.getForecast({ latitude, longitude }, signal),
    staleTime: 30 * 1000,
    refetchInterval: autoRefreshMs,
  })
}