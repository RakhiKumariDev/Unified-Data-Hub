import { NavLink, Outlet } from 'react-router-dom'

import { useAuth } from '@/application/hooks/useAuth'
import { ThemeToggle } from '@/presentation/components/ThemeToggle'
import { routePaths } from '@/shared/constants/routes'

const navigationItems = [
  { label: 'Dashboard', to: routePaths.dashboard },
  { label: 'Users', to: routePaths.users },
  { label: 'Crypto', to: routePaths.crypto },
  { label: 'Weather', to: routePaths.weather },
]

export function AppLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Control Center</p>
          <h1 className="sidebar__title">Unified Data Hub</h1>
          <p className="sidebar__text">
            Aggregated external APIs with isolated client state, query state, and routing.
          </p>
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="user-pill">
            <img src={user?.image} alt={user?.username} />
            <div>
              <strong>
                {user?.firstName} {user?.lastName}
              </strong>
              <span>@{user?.username}</span>
            </div>
          </div>
          <div className="sidebar__actions">
            <ThemeToggle />
            <button type="button" className="ghost-button" onClick={logout}>
              Sign out
            </button>
          </div>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}