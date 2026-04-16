import { Component, type ErrorInfo, type PropsWithChildren, type ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<PropsWithChildren, ErrorBoundaryState> {
  public constructor(props: PropsWithChildren) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled application error', error, errorInfo)
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="feedback-card feedback-card--error">
          <p className="eyebrow">Application Error</p>
          <h2>Something broke outside the expected data flow.</h2>
          <p>Refresh the page. If the problem persists, inspect the console for the captured stack trace.</p>
        </div>
      )
    }

    return this.props.children
  }
}