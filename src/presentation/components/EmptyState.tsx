interface EmptyStateProps {
  title: string
  message: string
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="feedback-card feedback-card--empty">
      <p className="eyebrow">Empty State</p>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}