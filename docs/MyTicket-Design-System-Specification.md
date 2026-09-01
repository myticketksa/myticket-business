# MyTicket Business — Design System Specification

> **Canonical spec** for implementation. Supersedes the truncated v1 file and the `design-system-specification-v2-*.md` fragments (those remain source notes).
>
> **File:** Myticket Design (Copy) · `01NeAlswemvtbpPM3pCed7`  
> **In scope:** MyTicket business page `177:2037` (67 frames), Design System page, Scanner App frames  
> **Out of scope:** MyTicket Guests, MyTicket Mobile App  
> **Stack:** React · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui · Redux Toolkit · **Yup** (confirmed — do not use Zod)  
> **Updated:** 2026-08-31 · remaining Figma extract merged (`remaining-design-data.md`)

### How to read this document

| Marker | Meaning |
|--------|---------|
| **Existing** | Found in Figma variables, styles, or components |
| **Recommended** | Justified by heavy raw usage; add as a token before or during foundation |
| **Inferred** | Pattern observed across frames; confirm on the Figma node before coding |
| **Assumption** | Not designed in Figma; do not treat as fact |

Do not invent colors, spacing, or type. Prefer **Existing** tokens. Use **Recommended** only when the same raw value is already widespread. Flag **Assumptions** in the frame plan.

---

# 01. Design System Overview

## Design philosophy

Warm, editorial, Saudi-market event platform. Terracotta-to-orange brand gradient, warm stone neutrals, information-dense business layouts. Avoid cold SaaS blues and greys.

- **Role-based architecture** — Organizer, Talent, Vendor share one library with role-specific nav and content
- **Data-first** — KPI cards, filtered tables, status badges
- **Warm neutrals** — `#191008` ink, `#FFF7F3` canvas, `#F3DED2` borders
- **Gradient as identity** — 120° `#FF9147` → `#E0451A` on CTAs, active pills, toggles (sparingly)
- **Typefaces** — Manrope (UI), Cairo (Arabic segments only: `العربية` pill, legal names, some categories)

## Visual identity (existing)

| Attribute | Value |
|-----------|-------|
| Brand gradient | 120° linear `#FF9147` → `#E0451A` |
| Fonts | Manrope (UI) · Cairo (Arabic bits) |
| Canvas | `#FFF7F3` (`surface/canvas`) |
| Card | `#FFFFFF` (`surface/card`) |
| Primary ink | `#191008` (`ink/primary`) |
| Border default | `#F3DED2` (`border/default`) |
| Corner strategy | Rounded; 12px inputs; pill actions |
| Shadow | Existing: `Elevation/Card` only |
| Icons | Custom set; 19px nav / 22px actions (inferred from component specs) |

## Layout patterns (existing)

| Pattern | Specification |
|---------|---------------|
| Business shell | 248px sidebar + 1192px content (1440 − 248) |
| Topbar | 64px, backdrop-blur 14px, 92% `#FFF7F3` |
| Page gutter | 40px (`space/gutter`) |
| Section spacing | 88px (`space/section`) |
| Desktop reference | 1440px |
| Scanner | 390×844 (iPhone 14) |

## Main UI patterns

1. Sidebar + topbar shell
2. KPI card grids (typically 4-across)
3. Filter pills → table → pagination
4. Form sections (label + TextInput / Select / Textarea / Toggle)
5. Status badge taxonomy (9 tones)
6. Empty states (FirstUse / Filters / Gated)
7. Thread views (hire + support)

## Maturity (from audit)

| Metric | Score | Detail |
|--------|-------|--------|
| Colour tokens | 8/10 | Strong collection; ~10 heavy raw colours |
| Spacing tokens | 6/10 | 7 tokens; 4 / 6 / 10 / 16 / 24 still raw |
| Radius tokens | 6/10 | 6 tokens; 6px is the most-used raw radius |
| Text style binding | 3/10 | ~7% of text nodes bound |
| Auto Layout | 7/10 | ~67% of frames |
| Components | 8/10 | 68 sets, 360+ variants |
| **Overall** | **6/10** | Strong vocabulary, weak binding |

---

# 02. Design Tokens

## 02.1 Colors

All from Figma collection **MyTicket** (single mode) unless marked Recommended.

### Surface (existing)

| Token | HEX | Usage |
|-------|-----|-------|
| `color.surface.canvas` | `#FFF7F3` | Page canvas |
| `color.surface.card` | `#FFFFFF` | Cards, panels, modals |
| `color.surface.tint` | `#FFF8F4` | Subtle wash |
| `color.surface.footer` | `#FFF1E9` | Footer / chip (same as chip) |
| `color.surface.chip` | `#FFF1E9` | Chips |
| `color.surface.brandWash` | `#FFF0E9` | Brand-tinted regions |
| `color.surface.inverse` | `#191008` | Inverse / scanner dark |
| `color.surface.skeleton` | `#FFE2D0` | Skeleton base |
| `color.surface.skeletonAlt` | `#FFC0A0` | Skeleton shimmer |
| `color.surface.sold` | `#F7E9E1` | Sold / disabled surface |
| `color.surface.featured.from` | `#FFF2EA` | Featured gradient start |
| `color.surface.featured.mid` | `#FFE6D8` | Featured mid |
| `color.surface.featured.to` | `#F4E9FF` | Featured end |

### Text / ink (existing)

| Token | HEX | Usage |
|-------|-----|-------|
| `color.text.primary` | `#191008` | Headings (2,610 fills) |
| `color.text.body` | `#3A2418` | Body |
| `color.text.secondary` | `#6B5F58` | Muted (`ink/muted`, 702) |
| `color.text.tertiary` | `#8E8078` | Faint (`ink/faint`, 996) |
| `color.text.disabled` | `#C0AEA4` | Disabled |
| `color.text.inverse` | `#FFF7F3` | On inverse surfaces |

### Border (existing)

| Token | HEX | Usage |
|-------|-----|-------|
| `color.border.default` | `#F3DED2` | Default (821 strokes) |
| `color.border.strong` | `#F5C9B4` | Emphasis |
| `color.border.subtle` | `#F7E9E1` | Dividers (475) |
| `color.border.brand` | `#FFC8AE` | Brand accent |
| `color.border.featured` | `#F7DFD3` | Featured |

### Brand (existing)

| Token | HEX | Usage |
|-------|-----|-------|
| `color.brand.primary` | `#F25F2C` | Primary (372) |
| `color.brand.strong` | `#E0451A` | Strong / gradient end |
| `color.brand.deep` | `#B8320F` | Deep / hover (same HEX as hover) |
| `color.brand.light` | `#FF9147` | Light / gradient start |
| `color.brand.link` | `#D8431A` | Links, eyebrows |
| `color.brand.hover` | `#B8320F` | Hover |
| `color.brand.gradient.from` | `#FF9147` | Gradient start |
| `color.brand.gradient.to` | `#E0451A` | Gradient end |
| `color.brand.gradient.deep` | `#C4330B` | Deep stop |

### Accent, tier, zone, badge, tag, bar (existing)

| Token | HEX |
|-------|-----|
| `color.accent.amber` | `#C4330B` |
| `color.accent.amberLight` | `#FFC0A0` |
| `color.tier.vip` | `#5A18C4` |
| `color.tier.vipLight` | `#EEDCFF` |
| `color.tier.gold` | `#C4330B` |
| `color.tier.goldLight` | `#FFE2D0` |
| `color.tier.goldInk` | `#8A2A08` |
| `color.tier.silverLight` | `#FFF1E9` |
| `color.tier.bronze` | `#4E6C8B` |
| `color.tier.bronzeLight` | `#E5F0FC` |
| `color.zone.amberWash` | `#FFF4EE` |
| `color.zone.brandWash` | `#FFF0E9` |
| `color.badge.roseWash` | `#FDECEB` |
| `color.badge.roseInk` | `#C4261B` |
| `color.tag.amberWash` | `#FFE2D0` |
| `color.tag.roseWash` | `#FDECEB` |
| `color.tag.roseInk` | `#B8231A` |
| `color.tag.brandInk` | `#C4330B` |
| `color.bar.brandWash` | `#FFF0E9` |
| `color.bar.brandLine` | `#FFC8AE` |

> Audit listed `badge/rose-wash` as `#FDECEA`. Implementation uses `#FDECEB` from the later variable dump unless Figma MCP shows otherwise.

### Third-party (existing)

| Token | HEX |
|-------|-----|
| `color.brand.visa` | `#1A2B7B` |
| `color.brand.tabby` | `#70F6B5` |
| `color.brand.tabbyInk` | `#0A2A20` |
| `color.brand.tamara` | `#FFC7C5` |
| `color.brand.tamaraInk` | `#3A0E14` |

### Status and other gaps (recommended — not Figma variables yet)

| Token | HEX | Evidence |
|-------|-----|----------|
| `color.status.success` | `#1B8A5A` | 190 fills |
| `color.status.success.tint` | `#EAF6EF` | 107 fills |
| `color.status.danger` | `#DC3A2A` | AlertBanner, StatusBadge |
| `color.status.danger.strong` | `#A31C13` | Audit recommendation |
| `color.status.danger.tint` | `#FFF8F6` | 83 fills |
| `color.status.danger.border` | `#F5CBC5` | 45 strokes |
| `color.status.info` | `#3A6EA5` | Audit recommendation |
| `color.status.info.tint` | `#EEF4FB` | Audit recommendation |
| `color.status.warning` | `#F2A93B` | 68 strokes |
| `color.text.placeholder` | `#B9ACA4` | 379 fills (`ink/secondary` in v2) |
| `color.surface.muted` | `#F1E8E1` | 140 fills |
| `color.surface.dark` | `#12100D` | 76 fills — prefer merge into `ink/primary` when contrast allows |
| `color.border.muted` | `#E8D8CC` | 140 strokes; Toggle OFF track |
| `color.border.disabled` | `#C9BBB0` | 48 strokes |

**Toggle OFF track (existing raw):** `#E8D8CC` → use `color.border.muted` once added.

---

## 02.2 Typography (existing — 36 Manrope styles)

Weights: 500 Medium · 600 SemiBold · 700 Bold · 800 ExtraBold.

### Display

| Token | Weight | Size | Line | Tracking | Use |
|-------|--------|------|------|----------|-----|
| `typography.display.slide` | 800 | 88 | 92 | −2.64 | Slides (out of business UI) |
| `typography.display.xl` | 800 | 56 | 64 | −1.68 | Hero |
| `typography.display.xlItalic` | 800 | 56 | 64 | −1.68 | Italic hero |
| `typography.display.page` | 800 | 54 | 55 | −1.89 | Page titles (guest-scale) |
| `typography.display.l` | 800 | 46 | 48 | −1.61 | Large sections |
| `typography.display.m` | 800 | 42 | 44 | −1.47 | Medium sections |
| `typography.display.s` | 800 | 34 | 36 | −1.02 | Small sections |
| `typography.display.xs` | 800 | 30 | 33 | −0.90 | Subsections |
| `typography.display.2xs` | 700 | 26 | 28 | −0.52 | Card headings |
| `typography.display.card` | 700 | 25 | 28 | −0.50 | Card title alt |

### Title / body / action / nav

| Token | Weight | Size | Line | Tracking | Use |
|-------|--------|------|------|----------|-----|
| `typography.heading.xl` | 600 | 19 | 23 | 0 | Title/XL |
| `typography.heading.l` | 600 | 17 | 21 | 0 | Title/L |
| `typography.heading.m` | 600 | 16 | 22 | 0 | Title/M |
| `typography.body.l` | 500 | 18 | 28 | 0 | Body/L |
| `typography.body.m` | 500 | 16 | 24 | 0 | Body/M |
| `typography.body.s` | 500 | 14 | 21 | 0 | Body/S |
| `typography.body.xs` | 500 | 13 | 19 | 0 | Body/XS |
| `typography.body.2xs` | 500 | 12 | 17 | 0 | Body/2XS |
| `typography.action.m` | 700 | 15 | 20 | 0 | Primary buttons |
| `typography.action.s` | 600 | 14 | 20 | 0 | Secondary buttons |
| `typography.action.xs` | 600 | 13 | 18 | 0 | Small buttons |
| `typography.link.m` | 700 | 14 | 20 | 0 | Link/M |
| `typography.link.s` | 700 | 13 | 18 | 0 | Link/S |
| `typography.nav.m` | 600 | 15 | 22 | 0 | Sidebar items |

### Utility

| Token | Weight | Size | Line | Tracking | Case | Use |
|-------|--------|------|------|----------|------|-----|
| `typography.medium.14` | 500 | 14 | 20 | 0 | — | Medium/14 |
| `typography.medium.13` | 500 | 13 | 19 | 0 | — | Medium/13 |
| `typography.tag.m` | 700 | 12 | 16 | 0 | — | Tags |
| `typography.tag.s` | 700 | 11 | 14 | 0 | — | Small tags |
| `typography.price.xl` | 800 | 26 | 30 | 0 | — | Hero price |
| `typography.price.l` | 700 | 20 | 24 | 0 | — | Large price |
| `typography.price.m` | 700 | 18 | 22 | 0 | — | Medium price |
| `typography.eyebrow` | 800 | 12 | 16 | +1.20 | UPPER | Eyebrow |
| `typography.eyebrow.wide` | 800 | 13 | 16 | +3.64 | — | Eyebrow/Wide |
| `typography.meta.date` | 700 | 12 | 16 | +0.48 | UPPER | Dates |
| `typography.logo.l` | 800 | 27 | 32 | −0.54 | — | Logo/L |
| `typography.logo.s` | 800 | 25 | 30 | −0.50 | — | Logo/S |

**Business page head (component spec, confirm on node):** PageHead title 28px bold — not a named text style. Implement as a PageHead-only class; do not invent a global H1 token until Figma binds one.

---

## 02.3 Spacing

### Existing

| Token | Value | Use |
|-------|-------|-----|
| `spacing.2xs` | 8px | Dense padding / small gaps |
| `spacing.xs` | 12px | Card inner, list gaps |
| `spacing.sm` | 14px | Field padding, input gaps |
| `spacing.md` | 18px | Medium component padding |
| `spacing.lg` | 20px | Section inner (1,029 uses) |
| `spacing.gutter` | 40px | Page gutter |
| `spacing.section` | 88px | Between page sections |

### Recommended (raw values already in the file)

| Token | Value | Evidence |
|-------|-------|----------|
| `spacing.3xs` | 4px | 241 padding |
| `spacing.gapSm` | 6px | 339 gaps |
| `spacing.gapMd` | 10px | 377 gaps |
| `spacing.base` | 16px | 478 padding |
| `spacing.xl` | 24px | 161 padding |

Do not invent a 0–24 even scale. Only these values are justified.

---

## 02.4 Radius

### Existing

| Token | Value | Use |
|-------|-------|-----|
| `radius.sm` | 12px | Inputs, small cards (124) |
| `radius.md` | 14px | Medium |
| `radius.lg` | 18px | Cards, dialogs (228) |
| `radius.xl` | 20px | Large cards |
| `radius.2xl` | 22px | Hero / search field |
| `radius.pill` | 999px | Buttons, pills, badges |

### Recommended

| Token | Value | Evidence |
|-------|-------|----------|
| `radius.2xs` | 3px | 130 uses |
| `radius.xs` | 6px | **388 uses — most common radius** |
| `radius.badge` | 10px | 44 uses; OverlayBadge |

---

## 02.5 Borders (existing usage)

| Width | Count | Context |
|-------|-------|---------|
| 1px | 659 | Default card / table |
| 1.5px | 388 | Focus / error / selected |
| 2px | 6 | Active underline tab |

Semantic:

| Token | Width | Color |
|-------|-------|-------|
| `border.default` | 1px | `color.border.default` |
| `border.subtle` | 1px | `color.border.subtle` |
| `border.strong` | 1px | `color.border.strong` |
| `border.focus` | 1.5px | `color.brand.primary` |
| `border.error` | 1.5px | `color.status.danger` |
| `border.tabActive` | 2px | `color.brand.primary` |

---

## 02.6 Shadows

### Existing

| Token | Spec |
|-------|------|
| `shadow.card` (`Elevation/Card`) | `0 1px 2px rgba(20,18,14,0.04), 0 12px 32px -18px rgba(20,18,14,0.25)` |

### Recommended (not in Figma variables)

| Token | Spec | Use |
|-------|------|-----|
| `shadow.dropdown` | `0 4px 16px -4px rgba(20,18,14,0.15)` | Menus |
| `shadow.toast` | `0 8px 24px -8px rgba(20,18,14,0.18)` | Toasts |
| `shadow.modal` | `0 24px 48px -12px rgba(20,18,14,0.20)` | Dialogs |

Confirm overlay elevation on the first Dialog/Toast implementation via MCP. Until then, use `shadow.card` if the node has no explicit shadow.

---

## 02.7 Sizing (recommended — from component specs)

| Token | Value | Context |
|-------|-------|---------|
| `size.sidebar` | 248px | Sidebar width |
| `size.topbar` | 64px | Topbar height |
| `size.input.web` | 48px | TextInput height |
| `size.input.mobile` | 52px | Mobile/FormField height |
| `size.icon.sm` | 16px | Small icons / checkbox |
| `size.icon.md` | 19px | Nav icons |
| `size.icon.lg` | 22px | Action icons |
| `size.avatar.sm` | 28px | Avatar 28 |
| `size.avatar.md` | 38px | Biz avatar mid |
| `size.avatar.lg` | 52px | Avatar 52 |

---

# 03. Component System

**Existing:** 68 component sets, 360+ variants, 0 loose components. Naming: `PascalCase` shared, `Biz/` business, `Mobile/` scanner.

## 03.1 Foundation / primitives

### Button

- Variants: Style × Size × State (18)
- Style: `Primary` | `Secondary` | `Ghost` | `Destructive` | `Icon`
- Size: `L` | `M` | `S`
- State: `Default` | `Hover` | `Disabled` | `Loading`
- Props: label, show icon, icon swap
- Radius: pill (height/2)
- Primary: brand gradient, inverse text

**Missing states (audit):** Focus visible ring not listed as a Figma variant — implement accessible focus without inventing a new look (1.5px brand ring).

### TextInput

- States: Default | Focused | Error | Disabled
- h48, r12, pad 0 14, 15px
- Default 1px `border/default`; Focused 1.5px `brand/primary`; Error 1.5px danger

### Checkbox / Radio

- Unchecked | Checked
- 16×16, gap 10, 14px label
- Checkbox: optional count

### Toggle

- On | Off — track 44×26 r13, knob 20×20
- ON: brand gradient · OFF: `#E8D8CC`

### SearchField

- Field h44 r22 | Pill h38 r19 | Icon-only

### OTPBox

- Filled | Empty — 48×56 r12

### FilterChip

- Default | Hover | Selected | Removable — h38 r19

### Avatar

- Sizes 28 | 52 · Circle | Squircle · gradient + initials

### StatusBadge — 9 tones (existing) · `207:1750` · 202 business instances

`BrandTint` | `UrgentSolid` | `Terminal` | `NeutralOutline` | `LiveSolid` | `SuccessTint` | `Inactive` | `InfoTint` | `DangerTint`

Do not add a 10th tone. `UrgentSolid` and `Terminal` have **no** business-page instances — still ship the variants.

Full label → tone map: §12. `Refunded` is **DangerTint** on some nodes and **InfoTint** on others — use the instance tone.

### CountBadge / OverlayBadge / Divider / Skeleton / Toast / EmptyState / SectionHeader / Tabs / StarRating / PriceDisplay / Countdown / ImagePlaceholder

See source inventory in `design-system-specification-v2.md` §3.2. Specs there are **existing** component documentation.

Guest cards (`EventCard`, `ExperienceCard`, `SiteHeader`, `SiteFooter`) are **out of portal scope** unless Marketplace reuses `TalentCard` / `VendorCard`.

## 03.2 Business (`Biz/*`)

| Component | Variants / notes |
|-----------|------------------|
| `Biz/Sidebar` | `298:21438` · Organizer `298:21439` / Talent `298:21466` / Vendor `298:21486` · exact nav §09 |
| `Biz/Topbar` | `298:21507` · Base / MainWebsite / EditorMeta / HireRequests · props Crumb, Current, BellCount, Initials · width 1192 FILL |
| `Biz/NavItem` | Default \| Active · h40 r12 · icon 19 |
| `Biz/NavCount` | Hot \| Neutral |
| `Biz/PageHead` | Sub Yes \| No · eyebrow brand link · title 28 bold |
| `Biz/EventTabBar` | `298:21621` · Active Edit/Orders/Tickets/Refunds/Notify/LiveDoor · Counts boolean |
| `Biz/FilterPill` | Active (gradient) \| Idle · heights 32/36/38 |
| `Biz/UnderlineTab` | Active 2px `#F25F2C` underline |
| `Biz/KpiCard` | Standard \| NoIcon \| Coloured · r18 · pad 20 22 · ~320w · gap 16 |
| `Biz/Avatar` | 34/38/42/44 · Brand \| Grey |
| `Biz/NoteCard` | Warm \| Neutral |
| `Biz/AlertBanner` | Danger \| Info · optional CTA |
| `Biz/AlertStrip` | Info \| Lock |
| `Biz/BarListRow` | Stacked \| Inline |
| `Biz/DocRow` | Verified \| Pending \| Missing |
| `Biz/FeedRow` | Valid \| Rejected |
| `Biz/NotificationRow` | ActionNeeded \| Read |
| `Biz/ThreadMessage` | Incoming \| Outgoing · max 62% |
| `Biz/ProgressBar` | heights 5–10 · Light \| Dark |
| `Biz/SeatCell` | 9 seat states |
| `Biz/LiveDot` | pulse 1.4–1.6s |
| `Biz/HatchPlaceholder` | Thumb \| Band \| Wide |

## 03.3 Scanner (`Mobile/*`)

Use only for Scanner App (9 frames). Do not mix `Mobile/Button` into the desktop portal.

Includes: Button, FormField, TabItem, IconButton, FilterChip, CategoryChip, Segment, SegPill, Toggle, OTPBox, PayRow, StateBadge, StarRating, Skeleton, NotificationItem, TabBar `263:9918`, SegmentedTabs `263:9981`, BottomSheet `263:10030`, SheetHeader `263:10154`, SheetSuccess `263:10163`.

## 03.4 Interactive states to preserve

| Component | Designed | Implement anyway (a11y) |
|-----------|----------|-------------------------|
| Button | default, hover, disabled, loading | focus-visible |
| TextInput | default, focused, error, disabled | — |
| FilterChip | default, hover, selected, removable | focus-visible |
| Toggle / Switch | on, off | focus-visible |
| NavItem | default, active | hover (infer from Active wash if present) |

Do not invent hover palettes. If Figma has no hover, use a slight opacity or existing `brand/hover` only when the node uses it.

---

# 04. React Mapping

**Validation library: Yup.** Schemas live in `src/schemas/`, not inside components.

### Use shadcn as-is (restyle tokens)

| Figma | shadcn |
|-------|--------|
| Checkbox | `Checkbox` |
| Radio | `RadioGroup` |
| Toggle | `Switch` |
| Divider | `Separator` |
| Select (`207:1698`) | `Select` |
| Textarea (`207:1700`) | `Textarea` |
| Modal + ModalScrim (`207:3040`, `207:3048`) | `Dialog` |

### Extend shadcn

| Figma | shadcn | Work |
|-------|--------|------|
| Button | `Button` | Gradient primary, L/M/S, loading |
| TextInput | `Input` + `Label` + `Form` | Error, 48px, r12 |
| SearchField | `Input` | Leading icon, pill |
| Toast | `Sonner` | Success / Error / Neutral |
| Tabs / UnderlineTab | `Tabs` | Brand underline |
| FilterChip | `Toggle` or `Badge` | Selected + count |
| StatusBadge | `Badge` | 9 tones |
| OTPBox | `InputOTP` | Brand focus |
| Skeleton | `Skeleton` | `surface/skeleton` |
| Pagination (`207:2852`) | custom or `Button` | Load-more: “Show 24 more” + “Showing 24 of 168” — not page numbers |
| Filter dropdown triggers | `Select` or `Popover` | **Closed state only** in Figma. Do not invent option lists. Opened menu is **NOT FOUND**. |

### Custom (no shadcn equivalent)

`Avatar`, `CountBadge`, `OverlayBadge`, `PriceDisplay`, `Countdown`, `StarRating`, `SectionHeader`, `ImagePlaceholder`, `Biz/Sidebar`, `Biz/Topbar`, `Biz/KpiCard`, `Biz/EventTabBar`, `Biz/FilterPill`, `Biz/NoteCard`, `Biz/AlertBanner`, `Biz/ThreadMessage`, `Biz/ProgressBar`, `Biz/SeatCell`, `Biz/LiveDot`, `Biz/FeedRow`, Marketplace cards, Scanner result states.

### Redux Toolkit (global only)

Use feature slices. Do **not** put form field state in Redux.

| Slice (recommended) | Why global |
|---------------------|------------|
| `auth` | Session, role (organizer / talent / vendor) |
| `ui` | Sidebar collapse if designed; toast queue only if not Sonner |
| `notifications` | Unread counts in nav / topbar |
| `roleContext` | Active portal role |

Local: filters, table sort, modal open, draft form fields, seating selection.

### Yup (forms — fields from Figma, rules only where shown)

| Schema | Screen | Fields drawn |
|--------|--------|----------------|
| `signInSchema` | Sign In `298:6502`, Scanner `298:7163` | Email or phone / Email, Password |
| `eventEditorSchema` | `298:4960` | Title, Short summary, Full description, Category, Promo video (optional helper), Starts, Ends, Repetition radios, Scanning radios, Entry instructions, Gates, refund radios, platform-fee checkbox. Toggle labels are **placeholder** in file — confirm on MCP before schema |
| `notifyHoldersSchema` | `298:7102` | Message body, Push / Email / SMS checkboxes |
| `organizerProfileSchema` | `298:11752` | Display name, Type radio, Biography (128/600 shown), Contact email, Phone, Region, City. Company/legal fields are **read-only** |
| `talentProfileSchema` | `298:9746` | Stage name, Willing to travel, Biography 186/600, Region, City, Show city toggle, social ×2 |
| `vendorProfileSchema` | `298:8432` | Business name, Contact email, Biography 182/600, Region, City, Coverage area |
| `settingsAccountSchema` | `298:10962` | Full name, Display name, Email/Phone disabled + Change, Interface language, Appearance. 12 notification checkboxes have **empty labels** in the set — confirm on MCP |
| `supportCaseSchema` | Raise a case | No field inventory yet |
| `venueSchema` | Add venue | No field inventory yet |
| `hireRequestSchema` | New request | **No frame** — do not invent a form |

Each schema: reusable, messages from helper/error text when present, separate from UI.

---

# 05. Tailwind CSS v4 Mapping

Implement in `src/styles/theme.css` (or `app.css`). No arbitrary values unless a single node requires exact fidelity and no token exists.

```css
@import "tailwindcss";

@theme {
  --color-surface-canvas: #FFF7F3;
  --color-surface-card: #FFFFFF;
  --color-surface-tint: #FFF8F4;
  --color-surface-footer: #FFF1E9;
  --color-surface-chip: #FFF1E9;
  --color-surface-skeleton: #FFE2D0;
  --color-surface-skeleton-alt: #FFC0A0;
  --color-surface-inverse: #191008;
  --color-surface-sold: #F7E9E1;
  --color-surface-brand-wash: #FFF0E9;
  --color-surface-featured-from: #FFF2EA;
  --color-surface-featured-mid: #FFE6D8;
  --color-surface-featured-to: #F4E9FF;
  --color-surface-muted: #F1E8E1;

  --color-ink-primary: #191008;
  --color-ink-body: #3A2418;
  --color-ink-muted: #6B5F58;
  --color-ink-faint: #8E8078;
  --color-ink-disabled: #C0AEA4;
  --color-ink-inverse: #FFF7F3;
  --color-ink-placeholder: #B9ACA4;

  --color-border-default: #F3DED2;
  --color-border-strong: #F5C9B4;
  --color-border-subtle: #F7E9E1;
  --color-border-brand: #FFC8AE;
  --color-border-featured: #F7DFD3;
  --color-border-muted: #E8D8CC;
  --color-border-disabled: #C9BBB0;

  --color-brand-primary: #F25F2C;
  --color-brand-strong: #E0451A;
  --color-brand-deep: #B8320F;
  --color-brand-light: #FF9147;
  --color-brand-link: #D8431A;
  --color-brand-hover: #B8320F;

  --color-status-success: #1B8A5A;
  --color-status-success-light: #EAF6EF;
  --color-status-danger: #DC3A2A;
  --color-status-danger-strong: #A31C13;
  --color-status-danger-light: #FFF8F6;
  --color-status-danger-border: #F5CBC5;
  --color-status-info: #3A6EA5;
  --color-status-info-light: #EEF4FB;
  --color-status-warning: #F2A93B;

  --color-tier-vip: #5A18C4;
  --color-tier-vip-light: #EEDCFF;
  --color-tier-gold: #C4330B;
  --color-tier-gold-light: #FFE2D0;
  --color-tier-gold-ink: #8A2A08;
  --color-tier-silver-light: #FFF1E9;
  --color-tier-bronze: #4E6C8B;
  --color-tier-bronze-light: #E5F0FC;

  --color-accent-amber: #C4330B;
  --color-accent-amber-light: #FFC0A0;

  --spacing-3xs: 4px;
  --spacing-2xs: 8px;
  --spacing-gap-sm: 6px;
  --spacing-gap-md: 10px;
  --spacing-xs: 12px;
  --spacing-sm: 14px;
  --spacing-base: 16px;
  --spacing-md: 18px;
  --spacing-lg: 20px;
  --spacing-xl: 24px;
  --spacing-gutter: 40px;
  --spacing-section: 88px;

  --radius-2xs: 3px;
  --radius-xs: 6px;
  --radius-badge: 10px;
  --radius-sm: 12px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-xl: 20px;
  --radius-2xl: 22px;
  --radius-pill: 999px;

  --shadow-card: 0 1px 2px rgba(20, 18, 14, 0.04), 0 12px 32px -18px rgba(20, 18, 14, 0.25);
  --shadow-dropdown: 0 4px 16px -4px rgba(20, 18, 14, 0.15);
  --shadow-toast: 0 8px 24px -8px rgba(20, 18, 14, 0.18);
  --shadow-modal: 0 24px 48px -12px rgba(20, 18, 14, 0.20);

  --font-sans: "Manrope", "Cairo", system-ui, sans-serif;
  --font-arabic: "Cairo", "Manrope", system-ui, sans-serif;

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1440px;
}

@utility bg-brand-gradient {
  background: linear-gradient(120deg, #ff9147 0%, #e0451a 100%);
}

@utility text-brand-gradient {
  background: linear-gradient(120deg, #ff9147 0%, #e0451a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Typography utilities (implement all used on business frames)

At minimum: `text-display-xl`, `text-display-l`, `text-display-s`, `text-display-2xs`, `text-title-xl`, `text-title-l`, `text-title-m`, `text-body-l`, `text-body-m`, `text-body-s`, `text-body-xs`, `text-body-2xs`, `text-action-m`, `text-action-s`, `text-action-xs`, `text-tag-m`, `text-tag-s`, `text-eyebrow`, `text-nav-m`, `text-link-m`, `text-price-l`, `text-meta-date`.

Values must match §02.2 exactly. Source class list: `design-system-specification-v2-typography-utility-classes.md`.

### Breakpoints (assumption)

Figma business frames are **desktop 1440 only**. Tablet/mobile portal layouts are **not designed** except Scanner 390.

| Breakpoint | Behavior |
|------------|----------|
| `2xl` 1440+ | Designed shell |
| `lg`–`xl` | Inferred: keep sidebar if width allows; do not invent a new nav |
| `< lg` | **Assumption:** collapse sidebar — not in Figma. Do not build until a mobile business frame exists or product asks |
| Scanner | Fixed 390 canvas; not the portal |

---

# 06. Component Priority

### P0 — Core primitives (before any page)

Button, TextInput, Textarea, Select, Checkbox, Radio, Toggle, SearchField, Avatar, StatusBadge, CountBadge, FilterChip, Divider, Skeleton, Toast, Pagination, Modal.

### P1 — Shared business chrome

Biz/Sidebar, Biz/Topbar, Biz/NavItem, Biz/NavCount, Biz/PageHead, Biz/FilterPill, Biz/KpiCard, Biz/EventTabBar, Biz/UnderlineTab, Biz/NoteCard, Biz/AlertBanner, Biz/NotificationRow, Biz/ProgressBar, Tabs, SectionHeader, EmptyState.

### P2 — Feature

Biz/SeatCell, Biz/FeedRow, Biz/LiveDot, Biz/ThreadMessage, Biz/AlertStrip, Biz/DocRow, Biz/BarListRow, Biz/HatchPlaceholder.

### P3 — Page / cards

Biz/Avatar, PriceDisplay, StarRating, Countdown, TalentCard / VendorCard.

### P4 — Scanner only

Mobile/Button, Mobile/FormField, scan result states.

---

# 07. Implementation Blueprint

Do **not** implement page `177:2037` as one task. That node is the full 67-frame inventory (`MyTicket-Business-Frames.md`).

### Phase 1 — Foundation

- Vite + React + TypeScript
- Tailwind v4 `@theme` from §05
- shadcn/ui + warm token overrides
- Manrope + Cairo (Arabic segments)
- Redux store skeleton
- `src/schemas` (Yup)
- React Router

### Phase 2 — Token layer

CSS properties + typography utilities + gradient utilities. Optional token gallery page.

### Phase 3 — P0 primitives

13 components. Match Figma variants. No pages yet.

### Phase 4 — App shell

Role-aware Sidebar + Topbar + `AppShell` (248 + fluid). Role routing.

### Phase 5 — P1 shared

Then pages.

### Phase 6–10 — Screens (one frame at a time)

1. Organizer (Home first after Sign In / Welcome)
2. Talent (reuse shell + shared templates)
3. Vendor (same)
4. Shared templates (Reviews, Notifications, Settings, Support)
5. Scanner

**First frame recommendation:** `298:6502` Biz — Business Sign In (no shell). Then `298:6452` Welcome. Then shell + `298:4694` Organizer Home.

### Per-frame Cursor process (already a project rule)

Inspect MCP → variables → Figma components → reuse code → plan → implement only that frame.

---

# 08. Suggested code architecture (for scaffold — not created yet)

```text
src/
  app/                 # providers, router, store
  styles/              # theme.css (tokens), globals
  components/
    ui/                # shadcn primitives
    primitive/         # P0 wrappers (Button, TextInput, …)
    biz/               # P1–P2 Biz/*
    scanner/           # P4 Mobile/*
  layouts/
    AppShell.tsx
    AuthLayout.tsx
    ScannerShell.tsx
  features/            # page compositions per route
    auth/
    organizer/
    talent/
    vendor/
    scanner/
  store/               # RTK slices (auth, notifications, …)
  schemas/             # Yup
  types/
  lib/                 # cn(), formatSar(), …
```

---

# 09. Navigation (existing — `Biz/Sidebar` `298:21438`)

Notifications are **not** in the sidebar. Open via topbar bell. Event ops (Orders, Tickets, Refunds, Notify, Live door) are **EventTabBar**, not sidebar items.

### Organizer (`298:21439`) — 15 items · 5 groups

| Group | Icon | Label | Count |
|-------|------|-------|-------|
| Operate | house-fill | Home | — |
| Operate | calendar-blank | Events | 2 |
| Operate | storefront | Venues | — |
| Operate | archive | Attendance | — |
| Hire | users-three | Marketplace | — |
| Hire | circle-dashed | Hire requests | 3 |
| Door | qr-code | Scanners | 1 |
| Door | door-open | Live door | — |
| Door | chart-line-up | Attendance | — |
| Grow | receipt | Sales | — |
| Grow | bank | Finance & payouts | 1 |
| Grow | star | Ratings & reviews | — |
| Account | user-circle | Profile | — |
| Account | — | Settings | — |
| Account | — | Support | — |

Footer: `RE` · Riyadh Events Co. · `Organizer · ORG-2481`.

**Confirm on MCP:** Operate `archive` + label “Attendance” vs frame **Archive** `298:5826`. Door also has “Attendance”.

### Talent (`298:21466`) — 9 · 4 groups

Work: Home, Hire requests (count), Availability.  
Presence: Profile, Portfolio (1), Ratings & reviews.  
Money: Payments.  
Account: Settings, Support.  
Footer: `LH` · Lina Hakim · `Talent · TAL-0917`.

### Vendor (`298:21486`) — 9 · 4 groups

Same as Talent except Portfolio → **Gallery**, no Portfolio count.  
Footer: `LC` · Layla Catering · `Vendor · VEN-1204`.

### Topbar (`298:21507`)

Kinds: Base, MainWebsite (“Main website” + arrow-square-out), EditorMeta (“Draft saved just now”), HireRequests (hides العربية, “New request” CTA).  
Bell counts existing: Organizer 7, Talent 4, Vendor 2. Bell hidden on notification pages.  
العربية pill: Cairo Bold 12.5 on Base / MainWebsite / EditorMeta.

---

# 10. Implementation readiness

| Score | 8/10 spec completeness · 5/10 page fidelity (no app yet) |
|-------|-----------------------------------------------|
| Ready | Tokens, nav labels, badge map, form fields, table columns, icons, overlays inventory |
| Weak | Figma text mostly unbound; status colors not variables; no tablet portal; no React app yet; some dropdowns/toggles unlabeled |
| Critical | Bind Recommended tokens in Tailwind even if Figma variables are not updated |
| Code Connect | After P0/P1 exist — map Figma Button → `src/components/ui/button.tsx` |

### Figma cleanup (Phase 3 of the ChatGPT guide — optional, incremental)

1. Add status color variables  
2. Add `radius/xs` 6px and spacing 4/6/10/16/24  
3. Bind text styles on new edits only  
Do not rebuild the Figma file in one prompt.

---

# 11. Locked decisions

| Decision | Value |
|----------|-------|
| Validation | **Yup** |
| State | Redux Toolkit for session/role/unread only |
| UI kit | shadcn/ui + custom Biz/* |
| Token source | This file + live Figma MCP on the selected frame |
| Scope of `177:2037` | Inventory page, not a single screen to code |
| Locale | English LTR UI. Cairo for Arabic strings only. **No RTL layouts** |
| Appearance | Light only. Settings Select “Appearance: Light” — do not build dark mode |
| Filter menus | Closed triggers only. Use shadcn Select/Popover; do not invent option lists |
| Date/time | Event Editor uses formatted text fields, not a DatePicker component |
| Business empty/toast | Components exist (guest copy). **0** business instances. Do not use waitlist/favourites copy on portal lists |
| New hire request | Topbar CTA only. **No frame** — do not invent the flow |

**Next project step:** scaffold the React foundation (Phase 1), then P0 tokens/primitives — not a 67-frame build.

---

# 12. StatusBadge label → tone (existing)

Source: 202 instances on the business page. Implement as a lookup. Do not invent labels.

| Tone | Labels |
|------|--------|
| SuccessTint | Valid, Accepted, Paid, Verified, Valid · queued, Approved, Completed, Active, On, Received, Deposit received, Accepted · reserves you, Completed · review them |
| BrandTint | Open, On sale, Under review, In progress, Confirm receipt, Announcement, Pending, Resold, Schedule change, Never signed in, With MyTicket, Report under assessment, Expiring, Expiring 11 Sep |
| DangerTint | Wrong event, Action needed, Declined, Declined by you, Fix: Commercial Registration, Fix: Responsible person, Cancelled, Rejected, Already scanned, Refunded, Missing, Can't scan, Held, Expiring |
| NeutralOutline | Awaiting you, Draft, Awaiting your response · {time}, Awaiting payment, No amount recorded, Complimentary, This device, Scheduled, Agreed · due Nov, Awaiting response · {time}, Awaiting their response · {time} |
| LiveSolid | Live now, Active now |
| Inactive | Closed |
| InfoTint | Refunded |
| UrgentSolid | No business instances |
| Terminal | No business instances |

---

# 13. Icons (existing)

- Component size **24×24** (earlier 19/22 was inferred from layout, not the icon frame).
- Canonical: `Icon / kebab-name`. Legacy: `Icon/PascalName`.
- **Inferred:** Phosphor Icons. Prefer Phosphor matching kebab names.
- Sidebar extras not all in the 63-name dump (`house-fill`, `calendar-blank`, `storefront`, `archive`, `users-three`, `circle-dashed`, `qr-code`, `door-open`, `chart-line-up`, `bank`, `caret-up-down`, `images`, `armchair`, `chats-circle`, `gear`, `lifebuoy`). Export those from Figma when building the shell.
- Topbar: `arrow-square-out`, `bell`, `check-circle`, `plus`.
- Full 63-row node table: Figma extract in chat / `remaining-design-data.md`.

---

# 14. Listing chrome (existing)

### EventTabBar labels (inferred from variants)

Edit event (implicit) · Orders · Tickets issued · Refund requests · Notify holders · Live door.

### Filter / search by page

| Page | Node | Search | Pills | Dropdowns (closed only) |
|------|------|--------|-------|-------------------------|
| Events | `298:4839` | Search your events… | All 12, On sale 3, Drafts 2, In review 1, Declined 1 | Venue, Sort: date — **card grid, not table** |
| Archive | `298:5826` | Search your events… | — | 2026 |
| Orders | `298:6805` | Search by reference or buyer… | All statuses | Ticket type, All dates · Export |
| Tickets | `298:6925` | Search by code or holder… | All, Scanned, Not scanned | Ticket type · Export |
| Refunds | `298:7021` | — | All 5, With MyTicket 2, Refunded 2, Declined 1 | — · **inline cards, not table** |
| Scan History | `298:7620` | Search ticket or holder… | All 1,270, Valid 1,246, Failed 24 | Gate, Scanner, 19:00–23:00 |
| Sales | `298:10480` | — | — | All events, Last 30 days |
| Finance | `298:10618` | — | — | Last 90 days |
| Reviews (shared) | `298:10750` | — | — | All time, Event |
| Hire (org) | `298:11625` | — | All 9, Awaiting 3, Accepted 3, Completed 2 | **thread cards** |
| Hire (vendor) | `298:8033` | — | Awaiting 2, Accepted 3, Completed 38, All | thread cards |

Hire card: initials · name · role · timestamp · last message · StatusBadge.

---

# 15. Table card pattern (local — not a component)

Typical width 1120. Stack: search · pills · closed dropdowns · head 11.5px · rows · optional Export.

| Table | Node | Columns |
|-------|------|---------|
| Orders | `298:6805` | Order, Buyer, Qty, Amount, Fee, Net, Payment, Status, Placed |
| Tickets issued | `298:6925` | Code, Holder, Type, Seat, Status, Scanned |
| Scan History | `298:7620` | Time, Ticket, Holder, Gate, Scanner, Result |
| Archive | `298:5826` | Event, Tickets sold, Net revenue, Attended, Rating |

Pagination component `207:2852` is load-more; **0** instances on drawn business tables. Implement the component; do not add it to a screen until that frame shows it. **Assumption:** do not invent a 24-row threshold.

Multi-select: **not confirmed**. Do not add bulk checkboxes unless MCP shows them.

---

# 16. Locale (existing)

- UI is English LTR. **NOT FOUND:** RTL pages, mirrored chrome, `direction: rtl`.
- `العربية` on ~50 topbars — Cairo Bold 12.5 — language switch **affordance only**.
- Arabic strings that appear: `شركة فعاليات الرياض` (legal name), `محطات طهي حية` (category), mixed bilingual category on Vendor Home `298:8032`.
- Settings: Interface language = English. Appearance = Light.

Load **Cairo** for those strings. Do not build an Arabic RTL portal from this file.

---

# 17. Empty / alert / toast instances

| Set | Node | Business instances |
|-----|------|--------------------|
| EmptyState FirstUse / Filters / Gated | `207:2901` | **0** (guest copy) |
| Toast Success / Error / Neutral | `207:2875` | **0** (guest copy) |
| Mobile/EmptyState | `263:10227` | Scanner if needed |

**AlertBanner** `298:21760` (7): Finance held payout; Scanners missing staff; Notify cancellation warning; Refunds info; Talent portfolio review; Organizer profile bio review.

**AlertStrip** `298:21786` (1): Seating Builder lock — 7,240 sold.

**NoteCard** `298:21742` (15): Home refunds, Tickets complimentary, Attendance history, Finance payouts, Reviews cannot remove, Profile save, Welcome lists (×3 roles), Declined fixable, Vendor/Talent finance money split, Vendor/Talent profile review, Talent portfolio review.

When implementing a screen, reuse the instance copy from this extract — do not rewrite.

---

# 18. Still confirm on MCP (do not invent)

1. Operate sidebar: “Attendance” + `archive` vs Archive frame.
2. Event Editor toggle labels (file shows guest placeholder).
3. Settings 12 notification checkbox labels.
4. Opened filter option lists.
5. “New request” destination.
6. Icon assets not in the 63-row table.

Form field lists for Sign In, Event Editor, Notify, profiles, Settings, Scanner Sign In are in `remaining-design-data.md` and the Figma extract — use those labels when building Yup schemas.
