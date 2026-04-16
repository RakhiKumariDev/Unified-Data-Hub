import { useEffect, useState } from 'react'

import { useCrypto } from '@/application/hooks/useCrypto'
import type { CryptoSortKey, SortDirection } from '@/domain/models/crypto'
import { EmptyState } from '@/presentation/components/EmptyState'
import { ErrorState } from '@/presentation/components/ErrorState'
import { Loader } from '@/presentation/components/Loader'
import { SearchInput } from '@/presentation/components/SearchInput'
import { SectionCard } from '@/presentation/components/SectionCard'
import { cryptoSortOptions, sortDirectionOptions } from '@/shared/constants/app'
import { formatCompactNumber, formatCurrency, formatPercent } from '@/shared/utils/formatters'

const PAGE_SIZE = 12

export function CryptoPage() {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<CryptoSortKey>('market_cap_rank')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const cryptoQuery = useCrypto({ search, sortKey, sortDirection })
  const totalPages = Math.max(1, Math.ceil(cryptoQuery.markets.length / PAGE_SIZE))
  const paginatedMarkets = cryptoQuery.markets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [search, sortKey, sortDirection])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  return (
    <div className="page-grid">
      <section className="page-header">
        <div>
          <p className="eyebrow">Crypto</p>
          <h1>Market scan with debounced search and sorting</h1>
          <p>Server data stays in React Query. Filter and sort preferences stay in local UI state.</p>
        </div>
      </section>

      <SectionCard
        title="Crypto markets"
        description="CoinGecko market data, refreshed automatically every two minutes."
      >
        <div className="toolbar">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by name or symbol" />

          <label className="field field--compact">
            <span className="field__label">Sort by</span>
            <select
              className="field__input"
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as CryptoSortKey)}
            >
              {cryptoSortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field field--compact">
            <span className="field__label">Direction</span>
            <select
              className="field__input"
              value={sortDirection}
              onChange={(event) => setSortDirection(event.target.value as SortDirection)}
            >
              {sortDirectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {cryptoQuery.isLoading ? <Loader label="Loading crypto markets" /> : null}
        {cryptoQuery.error ? (
          <ErrorState
            message={cryptoQuery.error.message}
            actionLabel="Retry"
            onAction={() => {
              void cryptoQuery.refetch()
            }}
          />
        ) : null}
        {!cryptoQuery.isLoading && !cryptoQuery.error && !cryptoQuery.markets.length ? (
          <EmptyState title="No assets matched" message="Adjust the search or sorting criteria." />
        ) : null}

        {cryptoQuery.markets.length ? (
          <div className="crypto-results">
            <div className="pagination-bar">
              <p className="pagination-bar__summary">
                Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, cryptoQuery.markets.length)} of{' '}
                {cryptoQuery.markets.length} assets
              </p>
              <div className="pagination-controls" aria-label="Crypto market pagination">
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="pagination-controls__status">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="table-card">
              <div className="table-head">
                <span>Asset</span>
                <span>Price</span>
                <span>24h</span>
                <span>Volume</span>
              </div>
              {paginatedMarkets.map((market) => (
                <article key={market.id} className="table-row">
                  <div className="asset-cell">
                    <img src={market.image} alt={market.name} />
                    <div>
                      <strong>{market.name}</strong>
                      <span>
                        {market.symbol.toUpperCase()} · Rank {market.market_cap_rank}
                      </span>
                    </div>
                  </div>
                  <span>{formatCurrency(market.current_price)}</span>
                  <span
                    className={
                      market.price_change_percentage_24h == null
                        ? undefined
                        : market.price_change_percentage_24h >= 0
                          ? 'trend trend--up'
                          : 'trend trend--down'
                    }
                  >
                    {formatPercent(market.price_change_percentage_24h)}
                  </span>
                  <span>{formatCompactNumber(market.total_volume)}</span>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </SectionCard>
    </div>
  )
}