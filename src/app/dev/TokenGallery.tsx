import { formatEventDateTime } from "@/lib/format-event-datetime"
import { formatSar } from "@/lib/format-sar"

interface Swatch {
  name: string
  className: string
}

const surfaceSwatches: Swatch[] = [
  { name: "surface/canvas", className: "bg-surface-canvas" },
  { name: "surface/card", className: "bg-surface-card" },
  { name: "surface/footer", className: "bg-surface-footer" },
  { name: "surface/brand-wash", className: "bg-surface-brand-wash" },
  { name: "surface/inverse", className: "bg-surface-inverse" },
]

const inkSwatches: Swatch[] = [
  { name: "ink/primary", className: "bg-ink-primary" },
  { name: "ink/body", className: "bg-ink-body" },
  { name: "ink/muted", className: "bg-ink-muted" },
  { name: "ink/faint", className: "bg-ink-faint" },
  { name: "ink/disabled", className: "bg-ink-disabled" },
]

const brandSwatches: Swatch[] = [
  { name: "brand/primary", className: "bg-brand-primary" },
  { name: "brand/strong", className: "bg-brand-strong" },
  { name: "brand/deep", className: "bg-brand-deep" },
  { name: "brand/light", className: "bg-brand-light" },
  { name: "brand/link", className: "bg-brand-link" },
]

const radii = [
  { name: "radius-xs", className: "rounded-xs" },
  { name: "radius-sm", className: "rounded-sm" },
  { name: "radius-md", className: "rounded-md" },
  { name: "radius-lg", className: "rounded-lg" },
  { name: "radius-xl", className: "rounded-xl" },
  { name: "radius-2xl", className: "rounded-2xl" },
  { name: "radius-pill", className: "rounded-pill" },
] as const

const shadows = [
  { name: "shadow-card", className: "shadow-card" },
  { name: "shadow-dropdown", className: "shadow-dropdown" },
  { name: "shadow-toast", className: "shadow-toast" },
  { name: "shadow-modal", className: "shadow-modal" },
] as const

const typeSamples = [
  { name: "text-display-xl", className: "text-display-xl" },
  { name: "text-display-l", className: "text-display-l" },
  { name: "text-display-s", className: "text-display-s" },
  { name: "text-display-2xs", className: "text-display-2xs" },
  { name: "text-title-xl", className: "text-title-xl" },
  { name: "text-title-l", className: "text-title-l" },
  { name: "text-title-m", className: "text-title-m" },
  { name: "text-body-l", className: "text-body-l" },
  { name: "text-body-m", className: "text-body-m" },
  { name: "text-body-s", className: "text-body-s" },
  { name: "text-body-xs", className: "text-body-xs" },
  { name: "text-body-2xs", className: "text-body-2xs" },
  { name: "text-action-m", className: "text-action-m" },
  { name: "text-action-s", className: "text-action-s" },
  { name: "text-action-xs", className: "text-action-xs" },
  { name: "text-tag-m", className: "text-tag-m" },
  { name: "text-tag-s", className: "text-tag-s" },
  { name: "text-eyebrow", className: "text-eyebrow" },
  { name: "text-nav-m", className: "text-nav-m" },
  { name: "text-link-m", className: "text-link-m" },
  { name: "text-price-l", className: "text-price-l" },
  { name: "text-meta-date", className: "text-meta-date" },
] as const

const sampleEventDate = new Date(2026, 10, 12, 20, 0)

function SwatchRow({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <section className="flex flex-col gap-xs">
      <h2 className="text-title-m text-ink-primary">{title}</h2>
      <div className="grid grid-cols-2 gap-xs md:grid-cols-5">
        {swatches.map((swatch) => (
          <div key={swatch.name} className="flex flex-col gap-3xs">
            <div
              className={`h-16 border border-border-default ${swatch.className}`}
            />
            <p className="text-body-2xs text-ink-muted">{swatch.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TokenGallery() {
  return (
    <main className="mx-auto flex max-w-[1192px] flex-col gap-lg px-gutter py-xl">
      <header className="flex flex-col gap-2xs">
        <p className="text-eyebrow text-brand-link">Dev only</p>
        <h1 className="text-display-s text-ink-primary">Token gallery</h1>
        <p className="text-body-s text-ink-muted">
          Visual check for Phase 2 tokens. Not a product screen.
        </p>
      </header>

      <SwatchRow title="Surface" swatches={surfaceSwatches} />
      <SwatchRow title="Ink" swatches={inkSwatches} />
      <SwatchRow title="Brand" swatches={brandSwatches} />

      <section className="flex flex-col gap-xs">
        <h2 className="text-title-m text-ink-primary">Brand gradient</h2>
        <div className="h-16 bg-brand-gradient" />
      </section>

      <section className="flex flex-col gap-xs">
        <h2 className="text-title-m text-ink-primary">Radius</h2>
        <div className="flex flex-wrap gap-xs">
          {radii.map((radius) => (
            <div
              key={radius.name}
              className={`flex size-20 items-center justify-center border border-border-default bg-surface-card ${radius.className}`}
            >
              <span className="text-body-2xs text-ink-muted">{radius.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-xs">
        <h2 className="text-title-m text-ink-primary">Shadow</h2>
        <div className="grid grid-cols-2 gap-lg md:grid-cols-4">
          {shadows.map((shadow) => (
            <div
              key={shadow.name}
              className={`flex h-24 items-center justify-center bg-surface-card ${shadow.className}`}
            >
              <span className="text-body-2xs text-ink-muted">{shadow.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-xs">
        <h2 className="text-title-m text-ink-primary">Typography</h2>
        <div className="flex flex-col gap-sm rounded-lg border border-border-default bg-surface-card p-lg">
          {typeSamples.map((sample) => (
            <div key={sample.name} className="flex flex-col gap-3xs">
              <p className="text-body-2xs text-ink-faint">{sample.name}</p>
              <p className={`text-ink-primary ${sample.className}`}>
                MyTicket Business
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-xs">
        <h2 className="text-title-m text-ink-primary">Formatters</h2>
        <div className="flex flex-col gap-2xs rounded-lg border border-border-default bg-surface-card p-lg">
          <p className="text-price-l text-ink-primary">{formatSar(1240)}</p>
          <p className="text-meta-date text-ink-muted">
            {formatEventDateTime(sampleEventDate)}
          </p>
        </div>
      </section>
    </main>
  )
}
