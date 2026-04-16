import type { CryptoMarket } from '@/domain/models/crypto'
import { cryptoApi } from '@/infrastructure/api/axiosInstance'
import { endpoints } from '@/infrastructure/api/endpoints'

export const cryptoService = {
  async getMarkets(signal?: AbortSignal): Promise<CryptoMarket[]> {
    const response = await cryptoApi.get<CryptoMarket[]>(endpoints.coinGecko.markets, {
      params: { vs_currency: 'usd' },
      signal,
    })

    return response.data
  },
}