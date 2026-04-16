import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthSession } from '@/domain/models/auth'
import { AUTH_STORAGE_KEY } from '@/shared/constants/theme'

interface AuthState {
  token: string | null
  user: AuthSession['user'] | null
  setSession: (session: AuthSession) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (session) => {
        set({ token: session.token, user: session.user })
      },
      clearSession: () => {
        set({ token: null, user: null })
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
)