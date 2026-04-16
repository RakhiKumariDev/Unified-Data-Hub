import { useDeferredValue } from 'react'
import { useQuery } from '@tanstack/react-query'

import type { CryptoSortKey, SortDirection } from '@/domain/models/crypto'
import { cryptoService } from '@/infrastructure/services/cryptoService'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { queryKeys } from '@/shared/constants/queryKeys'

interface UseCryptoOptions {
  search: string
  sortKey: CryptoSortKey
  sortDirection: SortDirection
}

export function useCrypto(options: UseCryptoOptions) {
  const debouncedSearch = useDebouncedValue(options.search, 350)
  const deferredSearch = useDeferredValue(debouncedSearch)

  const query = useQuery({
    queryKey: queryKeys.cryptoMarkets,
    queryFn: ({ signal }) => cryptoService.getMarkets(signal),
    staleTime: 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  })

  const normalizedSearch = deferredSearch.trim().toLowerCase()
  const filteredMarkets = (query.data ?? []).filter((market) => {
    if (!normalizedSearch) {
      return true
    }

    return (
      market.name.toLowerCase().includes(normalizedSearch) ||
      market.symbol.toLowerCase().includes(normalizedSearch)
    )
  })

  const sortedMarkets = [...filteredMarkets].sort((left, right) => {
    const leftValue = left[options.sortKey]
    const rightValue = right[options.sortKey]

    if (leftValue == null && rightValue == null) {
      return left.name.localeCompare(right.name)
    }

    if (leftValue == null) {
      return 1
    }

    if (rightValue == null) {
      return -1
    }

    if (leftValue === rightValue) {
      return left.name.localeCompare(right.name)
    }

    const difference = leftValue < rightValue ? -1 : 1
    return options.sortDirection === 'asc' ? difference : difference * -1
  })

  return {
    ...query,
    markets: sortedMarkets,
    totalMarkets: query.data?.length ?? 0,
    activeSearch: debouncedSearch,
  }
}