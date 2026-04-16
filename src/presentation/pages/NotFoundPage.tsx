import { Link } from 'react-router-dom'

import { routePaths } from '@/shared/constants/routes'

export function NotFoundPage() {
  return (
    <div className="shell shell--auth">
      <section className="surface-card login-card">
        <p className="eyebrow">404</p>
        <h1>Route not found</h1>
        <p>The requested page does not exist in the current router configuration.</p>
        <Link className="primary-button primary-button--link" to={routePaths.dashboard}>
          Return to dashboard
        </Link>
      </section>
    </div>
  )
}