import type { ReactNode } from "react"

interface PageHeadProps {
  eyebrow: string
  title: string
  sub?: string
  sub2?: string
  badge?: ReactNode
}

export function PageHead({ eyebrow, title, sub, sub2, badge }: PageHeadProps) {
  return (
    <header className="flex flex-col gap-[6px]">
      <p className="text-[12px] leading-normal font-bold tracking-[0.96px] uppercase text-brand-link">
        {eyebrow}
      </p>
      <div className="flex flex-wrap items-center gap-sm">
        <h1 className="text-[28px] leading-normal font-extrabold tracking-[-0.84px] text-ink-primary">
          {title}
        </h1>
        {badge}
      </div>
      {sub ? (
        <p className="text-[14px] leading-normal font-normal text-ink-muted">{sub}</p>
      ) : null}
      {sub2 ? (
        <p className="text-[12.5px] leading-normal font-normal text-ink-faint">{sub2}</p>
      ) : null}
    </header>
  )
}
