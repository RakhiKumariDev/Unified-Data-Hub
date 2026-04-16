import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="shell shell--auth">
      <main className="auth-panel">
        <div className="hero-copy">
          <p className="eyebrow">Unified Data Hub</p>
          <h1>One operational surface for people, markets, and weather.</h1>
          <p>
            This dashboard separates presentation, orchestration, domain contracts, and external
            integrations so the app can scale without mixing concerns.
          </p>
        </div>
        <Outlet />
      </main>
    </div>
  )
}