import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/app/store/authStore'
import type { AuthCredentials } from '@/domain/models/auth'
import { authService } from '@/infrastructure/services/authService'
import { routePaths } from '@/shared/constants/routes'

export function useAuth() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const setSession = useAuthStore((state) => state.setSession)
  const clearSession = useAuthStore((state) => state.clearSession)

  const loginMutation = useMutation({
    mutationFn: (credentials: AuthCredentials) => authService.login(credentials),
    onSuccess: (session) => {
      setSession(session)
      void queryClient.invalidateQueries()
      navigate(routePaths.dashboard, { replace: true })
    },
  })

  function logout() {
    clearSession()
    queryClient.clear()
    navigate(routePaths.login, { replace: true })
  }

  return {
    isAuthenticated: Boolean(token),
    token,
    user,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
  }
}