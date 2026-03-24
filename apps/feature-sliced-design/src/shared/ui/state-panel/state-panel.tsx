import { PropsWithChildren, ReactNode } from 'react'

type StatePanelProps = PropsWithChildren<{
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}>

export function StatePanel({
  action,
  children,
  description,
  eyebrow,
  title,
}: StatePanelProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">{eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-300">{description}</p>
      </div>

      {children ? <div className="mt-6">{children}</div> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  )
}
