interface SectionHeaderProps {
  overline: string
  heading: string
  lede?: string
  link?: string
  onLinkClick?: () => void
}

export function SectionHeader({
  overline,
  heading,
  lede,
  link,
  onLinkClick,
}: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-sm">
      <div className="flex flex-col gap-2xs">
        <p className="text-[12px] leading-4 font-bold uppercase text-brand-link">
          {overline}
        </p>
        <h2 className="text-title-xl text-ink-primary">{heading}</h2>
        {lede ? <p className="text-body-s text-ink-muted">{lede}</p> : null}
      </div>
      {link ? (
        <button
          type="button"
          className="text-link-m text-brand-link"
          onClick={onLinkClick}
        >
          {link}
        </button>
      ) : null}
    </div>
  )
}
