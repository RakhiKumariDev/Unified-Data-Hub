import { useWeather } from '@/application/hooks/useWeather'
import { ErrorState } from '@/presentation/components/ErrorState'
import { Loader } from '@/presentation/components/Loader'
import { SectionCard } from '@/presentation/components/SectionCard'
import { StatCard } from '@/presentation/components/StatCard'
import { defaultWeatherLocation } from '@/shared/constants/app'
import { formatDateTime } from '@/shared/utils/formatters'

export function WeatherPage() {
  const weatherQuery = useWeather(defaultWeatherLocation)

  return (
    <div className="page-grid">
      <section className="page-header">
        <div>
          <p className="eyebrow">Weather</p>
          <h1>Live weather telemetry</h1>
          <p>
            Open-Meteo data for {defaultWeatherLocation.label} with manual refresh and automatic polling.
          </p>
        </div>
      </section>

      <SectionCard
        title="Current weather"
        description="Data refreshes every 60 seconds and can be manually updated on demand."
        action={
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              void weatherQuery.refetch()
            }}
          >
            Refresh now
          </button>
        }
      >
        {weatherQuery.isLoading ? <Loader label="Loading weather" /> : null}
        {weatherQuery.error ? (
          <ErrorState
            message={weatherQuery.error.message}
            actionLabel="Retry"
            onAction={() => {
              void weatherQuery.refetch()
            }}
          />
        ) : null}

        {weatherQuery.data ? (
          <>
            <div className="stats-grid">
              <StatCard
                label="Temperature"
                value={`${weatherQuery.data.current_weather.temperature}°C`}
                detail="Current ambient temperature"
              />
              <StatCard
                label="Wind Speed"
                value={`${weatherQuery.data.current_weather.windspeed} km/h`}
                detail="Live wind speed"
              />
              <StatCard
                label="Wind Direction"
                value={`${weatherQuery.data.current_weather.winddirection}°`}
                detail="Bearing from the API feed"
              />
            </div>

            <div className="metric-stack">
              <strong>Observation time: {formatDateTime(weatherQuery.data.current_weather.time)}</strong>
              <p>
                Coordinates {weatherQuery.data.latitude}, {weatherQuery.data.longitude} in timezone{' '}
                {weatherQuery.data.timezone}.
              </p>
            </div>
          </>
        ) : null}
      </SectionCard>
    </div>
  )
}