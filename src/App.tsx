import { AppProviders } from '@/app/providers/AppProviders'
import { AppRouter } from '@/app/routes/router'

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}

export default App
