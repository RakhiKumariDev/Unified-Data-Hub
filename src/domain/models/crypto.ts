export interface CryptoMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number | null
  total_volume: number
}

export type CryptoSortKey = 'market_cap_rank' | 'current_price' | 'price_change_percentage_24h' | 'total_volume'

export type SortDirection = 'asc' | 'desc'