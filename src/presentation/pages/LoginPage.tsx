import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '@/application/hooks/useAuth'
import { ErrorState } from '@/presentation/components/ErrorState'
import { routePaths } from '@/shared/constants/routes'

export function LoginPage() {
  const { isAuthenticated, login, isLoggingIn, loginError } = useAuth()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  if (isAuthenticated) {
    return <Navigate to={routePaths.dashboard} replace />
  }

  return (
    <section className="surface-card login-card">
      <div className="section-header">
        <div>
          <h2>Sign in to unlock protected modules</h2>
        </div>
      </div>

      <form
        className="form-grid"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault()
          login({ username, password })
        }}
      >
        <label className="field">
          <span className="field__label">Username</span>
          <input
            className="field__input"
            name="login-user"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span className="field__label">Password</span>
          <input
            className="field__input"
            type="password"
            name="login-pass"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
        </label>

        <button type="submit" className="primary-button" disabled={isLoggingIn}>
          {isLoggingIn ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      {loginError ? <ErrorState message={loginError.message} /> : null}
    </section>
  )
}