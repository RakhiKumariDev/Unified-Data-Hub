import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { THEME_STORAGE_KEY } from '@/shared/constants/theme'

export type ThemeMode = 'light' | 'dark'

interface UiState {
  theme: ThemeMode
  toggleTheme: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => {
        set({ theme: get().theme === 'light' ? 'dark' : 'light' })
      },
    }),
    {
      name: THEME_STORAGE_KEY,
    },
  ),
)