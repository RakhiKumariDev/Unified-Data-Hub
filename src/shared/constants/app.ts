import type { CryptoSortKey, SortDirection } from '@/domain/models/crypto'

export const defaultCredentials = {
  username: 'kminchelle',
  password: '0lelplR',
} as const

export const defaultWeatherLocation = {
  latitude: 28.61,
  longitude: 77.23,
  label: 'New Delhi',
} as const

export const cryptoSortOptions: Array<{ label: string; value: CryptoSortKey }> = [
  { label: 'Rank', value: 'market_cap_rank' },
  { label: 'Price', value: 'current_price' },
  { label: '24h Change', value: 'price_change_percentage_24h' },
  { label: 'Volume', value: 'total_volume' },
]

export const sortDirectionOptions: Array<{ label: string; value: SortDirection }> = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
]