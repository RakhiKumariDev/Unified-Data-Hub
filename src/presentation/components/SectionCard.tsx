import type { PropsWithChildren, ReactNode } from 'react'

interface SectionCardProps extends PropsWithChildren {
  title: string
  description: string
  action?: ReactNode
}

export function SectionCard({ title, description, action, children }: SectionCardProps) {
  return (
    <section className="surface-card">
      <header className="section-header">
        <div>
          <p className="eyebrow">Module</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {action ? <div>{action}</div> : null}
      </header>
      {children}
    </section>
  )
}