interface ErrorStateProps {
  title?: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

export function ErrorState({
  title = 'Request failed',
  message,
  actionLabel,
  onAction,
}: ErrorStateProps) {
  return (
    <div className="feedback-card feedback-card--error" role="alert">
      <p className="eyebrow">Error</p>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className="ghost-button" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}