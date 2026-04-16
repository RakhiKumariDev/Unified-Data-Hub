import type { PropsWithChildren } from 'react'

import { QueryProvider } from '@/app/providers/QueryProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { ErrorBoundary } from '@/presentation/components/ErrorBoundary'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ErrorBoundary>{children}</ErrorBoundary>
      </QueryProvider>
    </ThemeProvider>
  )
}