import { useCrypto } from '@/application/hooks/useCrypto'
import { useUsers } from '@/application/hooks/useUsers'
import { useWeather } from '@/application/hooks/useWeather'
import { useAuthStore } from '@/app/store/authStore'
import { ErrorState } from '@/presentation/components/ErrorState'
import { Loader } from '@/presentation/components/Loader'
import { SectionCard } from '@/presentation/components/SectionCard'
import { StatCard } from '@/presentation/components/StatCard'
import { defaultWeatherLocation } from '@/shared/constants/app'
import {
  formatCompactNumber,
  formatCurrency,
  formatDateTime,
  formatPercent,
} from '@/shared/utils/formatters'

export function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const usersQuery = useUsers()
  const cryptoQuery = useCrypto({
    search: '',
    sortKey: 'market_cap_rank',
    sortDirection: 'asc',
  })
  const weatherQuery = useWeather(defaultWeatherLocation)

  const leadingMarket = cryptoQuery.markets[0]

  return (
    <div className="page-grid">
      <section className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Unified operational overview</h1>
          <p>
            Pulling people, market, and weather signals into one surface while keeping business
            logic out of the UI layer.
          </p>
        </div>
        <div className="highlight-card">
          <span>Signed in as</span>
          <strong>
            {user?.firstName} {user?.lastName}
          </strong>
          <small>{user?.email}</small>
        </div>
      </section>

      <div className="stats-grid">
        <StatCard
          label="Users"
          value={usersQuery.data ? String(usersQuery.data.length) : '...'}
          detail="Remote profiles from JSONPlaceholder"
        />
        <StatCard
          label="Crypto"
          value={cryptoQuery.data ? String(cryptoQuery.totalMarkets) : '...'}
          detail="Live asset market snapshots"
        />
        <StatCard
          label="Weather"
          value={weatherQuery.data ? `${weatherQuery.data.current_weather.temperature}°C` : '...'}
          detail={`Current conditions in ${defaultWeatherLocation.label}`}
        />
      </div>

      <div className="module-grid">
        <SectionCard title="User network" description="Track the imported user directory.">
          {usersQuery.isLoading ? <Loader label="Loading users" /> : null}
          {usersQuery.error ? <ErrorState message={usersQuery.error.message} /> : null}
          {usersQuery.data ? (
            <div className="metric-stack">
              <strong>{usersQuery.data.length} users ready for drill-down</strong>
              <p>{usersQuery.data[0]?.company.name} is the first company in the dataset.</p>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard title="Market pulse" description="Top ranked cryptocurrency by market cap.">
          {cryptoQuery.isLoading ? <Loader label="Loading crypto markets" /> : null}
          {cryptoQuery.error ? <ErrorState message={cryptoQuery.error.message} /> : null}
          {leadingMarket ? (
            <div className="metric-stack">
              <strong>
                {leadingMarket.name} at {formatCurrency(leadingMarket.current_price)}
              </strong>
              <p>
                24h change {formatPercent(leadingMarket.price_change_percentage_24h)} and volume{' '}
                {formatCompactNumber(leadingMarket.total_volume)}.
              </p>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard
          title="Weather now"
          description="Auto-refreshed operational context from Open-Meteo."
        >
          {weatherQuery.isLoading ? <Loader label="Loading weather" /> : null}
          {weatherQuery.error ? <ErrorState message={weatherQuery.error.message} /> : null}
          {weatherQuery.data ? (
            <div className="metric-stack">
              <strong>
                {weatherQuery.data.current_weather.temperature}°C with wind speed{' '}
                {weatherQuery.data.current_weather.windspeed} km/h
              </strong>
              <p>Last refreshed {formatDateTime(weatherQuery.data.current_weather.time)}.</p>
            </div>
          ) : null}
        </SectionCard>
      </div>
    </div>
  )
}