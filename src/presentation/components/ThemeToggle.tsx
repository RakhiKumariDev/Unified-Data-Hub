import { useUiStore } from '@/app/store/uiStore'

export function ThemeToggle() {
  const theme = useUiStore((state) => state.theme)
  const toggleTheme = useUiStore((state) => state.toggleTheme)

  return (
    <button type="button" className="ghost-button" onClick={toggleTheme}>
      Theme: {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  )
}