interface LoaderProps {
  label?: string
}

export function Loader({ label = 'Loading data' }: LoaderProps) {
  return (
    <div className="feedback-card" role="status" aria-live="polite">
      <div className="loader" aria-hidden="true" />
      <p>{label}</p>
    </div>
  )
}